import * as React from 'react';

import { Button, Grid, TextField, Theme, createStyles } from '@material-ui/core';
import Charts, { IChartData } from 'src/components/hoc/presentational/fields/Charts';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { coinsExamples, getCoins } from './CoinsConsts';
import { coinsSolCallback, dpCoins, dpSpace, recSpace, recursiveCoins } from './CoinsSolutions';
import { converterCallback, numberCallback } from './typesDefinitions';
import { milliToMicro, milliToMilli } from './Helpers';

import myTheme from './../../../styles/index';
import { strings } from 'src/translations/languages';

type AllProps =
    WithStyles<typeof styles>;

interface ICoinsChartsState {
    givenValue: number
    givenCoins: string
    chartsVisible: boolean
}

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    center: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    },
    leftMargin: {
        marginLeft: 20
    },
    bottomMargin: {
        marginBottom: 15,
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    flexChild: {
        flex: 1,
        padding: theme.spacing.unit * 2
    },
    buttonDark: {
        margin: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.primary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.secondary.main
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 200,
    },
});

class CoinsCharts extends React.Component<AllProps, ICoinsChartsState> {
    private coins: number[];
    private recStats: IChartData[];
    private dpStats: IChartData[];


    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenValue: 4,
            givenCoins: "1,2,5",
            chartsVisible: false
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.bottomMargin}>
                    neco TODO
                </div>
                <Grid className={[classes.container, classes.bottomMargin].join(' ')}>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="givenValueTF"
                            label={strings.coins.demo.value}
                            className={classes.textField}
                            value={this.state.givenValue}
                            onChange={this.handleValue}
                            margin="normal"
                        />
                    </form>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="givenCoinsTF"
                            label={strings.coins.demo.coins}
                            className={classes.textField}
                            value={this.state.givenCoins}
                            onChange={this.handleCoins}
                            margin="normal"
                        />
                    </form>
                </Grid>
                <Button variant="contained" color="primary" className={classes.buttonDark} onClick={this.drawCharts}>
                    {strings.global.drawCharts}
                </Button>
                {this.state.chartsVisible &&
                    <div>
                    <Charts title={'Using Resursion'} data={this.recStats} timeUnit='Milliseconds' />
                    <Charts title={'Dynamic programming'} data={this.dpStats} timeUnit='Microseconds' />
                    </div>
                }
                </div>
        );
    }

    private handleValue = (e: any) => {
        if (!Number.isNaN(+e.target.value)) {
            this.setState({ givenValue: +e.target.value });
        }
    }

    private handleCoins = (e: any) => {
        for (const coin of e.target.value.split(",")) {
            if (Number.isNaN(+coin)) {
                return;
            }
        }

        this.setState({ givenCoins: e.target.value });
    }

    private getStats = (solution: coinsSolCallback, spaceFunc: numberCallback, converter: converterCallback) => {
        const data: IChartData[] = [];

        let t0: number;
        let t1: number;

        t0 = performance.now();
            solution(this.coins, this.coins.length, this.state.givenValue);
        t1 = performance.now();

        data.push({ colName: `Coins: ${this.coins}, value: ${this.state.givenValue}`, time: converter(t1 - t0), space: spaceFunc(this.coins.length, this.state.givenValue) });

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < coinsExamples.length; i++) {
            t0 = performance.now();
            solution(coinsExamples[i].coins, coinsExamples[i].coins.length, coinsExamples[i].value);
            t1 = performance.now();
            data.push({ colName: `Coins: ${coinsExamples[i].coins}, value: ${coinsExamples[i].value}`, time: converter(t1 - t0), space: spaceFunc(coinsExamples[i].coins.length, this.state.givenValue) });
        }
        return data;
    }

    private drawCharts = () => {
        this.coins = getCoins(this.state.givenCoins);
        this.recStats = this.getStats(recursiveCoins, recSpace, milliToMilli);
        this.dpStats = this.getStats(dpCoins, dpSpace, milliToMicro);
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(CoinsCharts);
