import * as Prism from 'prismjs';
import * as React from 'react';

import { Button, Grid, TextField, Theme, createStyles } from '@material-ui/core';
import { IChartData, ISimpleObjectParameter } from 'src/types';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { dpCoins, dpCoinsSpace, recCoinsSpace, recursiveCoins } from 'src/dpProblemsStuff/coins/CoinsSolutions';

import DoubleChart from 'src/components/fields/DoubleChart';
import { GetNumbers } from 'src/helpers/Helpers';
import { coinsExamples } from 'src/dpProblemsStuff/coins/CoinsConsts';
import myTheme from './../../../styles/index';
import { strings } from 'src/strings/languages';

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
    private timeStats: IChartData[];
    private spaceStats: IChartData[];
    private callsStats: IChartData[];


    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenValue: 10,
            givenCoins: "1,2,5",
            chartsVisible: false
        }
    }

    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid className={[classes.container, classes.bottomMargin].join(' ')}>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="givenValueTF"
                            label={strings.coins.value}
                            className={classes.textField}
                            value={this.state.givenValue}
                            onChange={this.handleValue}
                            margin="normal"
                        />
                    </form>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="givenCoinsTF"
                            label={strings.coins.coins}
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
                        <div>
                            <DoubleChart data={this.timeStats} unit='ms' brief={strings.components.timeComplex} />
                            <DoubleChart data={this.spaceStats} unit='' brief={strings.components.spaceComplex} />
                            <DoubleChart data={this.callsStats} unit='' brief={strings.global.numberOfCalls} />
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

    private getStats = (timeChart: IChartData[], spaceChart: IChartData[], callsChart: IChartData[], repeat: number) => {
        let t0: number;
        let t1: number;
        let recTime: number;
        let dpTime: number;
        let recCalls: number;
        let dpCalls: number;

        let calls: ISimpleObjectParameter = { value: 0 };

        t0 = performance.now();
        for (let j = 0; j < repeat; j++) {
            calls = { value: 0 };
            recursiveCoins(this.coins, this.coins.length, this.state.givenValue, calls);
        }
        t1 = performance.now();

        recTime = t1 - t0;
        recCalls = calls.value;

        t0 = performance.now();
        for (let j = 0; j < repeat; j++) {
            calls = { value: 0 };
            dpCoins(this.coins, this.coins.length, this.state.givenValue, calls);
        }
        t1 = performance.now();
        dpTime = t1 - t0;
        dpCalls = calls.value;

        timeChart.push({  name: `${strings.coins.coins}: ${this.coins}`, rec: recTime, dp: dpTime });
        spaceChart.push({ name: `${strings.coins.coins}: ${this.coins}`, rec: recCoinsSpace(this.coins.length), dp: dpCoinsSpace(this.coins.length, this.state.givenValue) });
        callsChart.push({ name: `${strings.coins.coins}: ${this.coins}`, rec: recCalls, dp: dpCalls });

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < coinsExamples.length; i++) {
            t0 = performance.now();
            for (let j = 0; j < repeat; j++) {
                calls = { value: 0 };
                recursiveCoins(coinsExamples[i].coins, coinsExamples[i].coins.length, coinsExamples[i].value, calls);
            }
            t1 = performance.now();
            recTime = t1 - t0;
            recCalls = calls.value;

            t0 = performance.now();
            for (let j = 0; j < repeat; j++) {
                calls = { value: 0 };
                dpCoins(coinsExamples[i].coins, coinsExamples[i].coins.length, coinsExamples[i].value, calls);
            }
            t1 = performance.now();

            dpTime = t1 - t0;
            dpCalls = calls.value;

            timeChart.push({  name: `${strings.coins.coins}: ${coinsExamples[i].coins}, ${strings.coins.value}: ${coinsExamples[i].value}`, rec: recTime, dp: dpTime });
            spaceChart.push({ name: `${strings.coins.coins}: ${coinsExamples[i].coins}, ${strings.coins.value}: ${coinsExamples[i].value}`, rec: recCoinsSpace(coinsExamples[i].coins.length), dp: dpCoinsSpace(coinsExamples[i].coins.length, coinsExamples[i].value) });
            callsChart.push({ name: `${strings.coins.coins}: ${coinsExamples[i].coins}, ${strings.coins.value}: ${coinsExamples[i].value}`, rec: recCalls, dp: dpCalls });
        }
    }

    private drawCharts = () => {
        this.coins = GetNumbers(this.state.givenCoins);
        this.timeStats = [];
        this.spaceStats = [];
        this.callsStats = [];

        this.getStats(this.timeStats, this.spaceStats, this.callsStats, 1000);
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(CoinsCharts);
