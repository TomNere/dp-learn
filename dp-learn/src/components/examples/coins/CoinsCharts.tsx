import * as React from 'react';

import { Button, Grid, TextField, Theme, createStyles } from '@material-ui/core';
import Charts, { IChartData } from 'src/components/hoc/presentational/fields/Charts';
import { ICoinsSpace, ISolutionCoins, dpCoins, dpSpace, recSpace, recursiveCoins } from './CoinsSolutions';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { coinsExamples, getCoins } from './CoinsConsts';

import { ICallsParameter } from './typesDefinitions';
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
            givenValue: 10,
            givenCoins: "1,2,5",
            chartsVisible: false
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
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
                    <div className={classes.container}>
                        <div className={classes.flexChild}>
                            <Charts recOrDp='rec' data={this.recStats} timeUnit='ms' />
                        </div>
                        <div className={classes.flexChild}>
                            <Charts recOrDp='dp' data={this.dpStats} timeUnit='ns' />
                        </div>
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

    private getStats = (solution: ISolutionCoins, spaceFunc: ICoinsSpace, repeat: number) => {
        const data: IChartData[] = [];

        let t0: number;
        let t1: number;
        let calls: ICallsParameter = { value: 0 };

        t0 = performance.now();
        for (let j = 0; j < repeat; j++) {
            calls = { value: 0 };
            solution(this.coins, this.coins.length, this.state.givenValue, calls);
        }
        t1 = performance.now();

        data.push({ colName: `Coins: ${this.coins}, value: ${this.state.givenValue}`, time: t1 - t0, space: spaceFunc(this.coins.length, this.state.givenValue), calls: calls.value });

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < coinsExamples.length; i++) {
            calls = { value: 0 };
            t0 = performance.now();
            for (let j = 0; j < repeat; j++) {
                calls = { value: 0 };
                solution(coinsExamples[i].coins, coinsExamples[i].coins.length, coinsExamples[i].value, calls);
            }
            t1 = performance.now();
            data.push({ colName: `Coins: ${coinsExamples[i].coins}, value: ${coinsExamples[i].value}`, time: t1 - t0, space: spaceFunc(coinsExamples[i].coins.length, coinsExamples[i].value), calls: calls.value });
        }
        return data;
    }

    private drawCharts = () => {
        this.coins = getCoins(this.state.givenCoins);
        this.recStats = this.getStats(recursiveCoins, recSpace, 1000);
        this.dpStats = this.getStats(dpCoins, dpSpace, 1000000);
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(CoinsCharts);
