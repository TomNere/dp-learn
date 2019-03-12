import * as Prism from 'prismjs';
import * as React from 'react';

import { Button, Grid, TextField, Theme, createStyles } from '@material-ui/core';
import { CheckNumbers, GetNumbers } from 'src/helpers/Helpers';
import { IChartData, ISimpleObjectParameter, IStatsTableData } from 'src/types';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { dpRod, dpRodSpace, recRodSpace, recursiveRod, rodExamples } from 'src/dpProblemsStuff/rod/RodStatsHelper';

import DoubleChart from 'src/components/fields/DoubleChart';
import StatsTable from 'src/components/fields/StatsTable';
import myTheme from '../../../styles/index';
import { strings } from 'src/strings/languages';

type AllProps =
    WithStyles<typeof styles>;

interface IRodChartsState {
    givenPrices: string,
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

class RodCharts extends React.Component<AllProps, IRodChartsState> {
    private prices: number[];
    private spaceStats: IChartData[];
    private callsStats: IChartData[];
    private tableStats: IStatsTableData[];

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenPrices: '1,5,6,6,9',
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
                            id="givenPricesTF"
                            label={strings.coins.coins}
                            className={classes.textField}
                            value={this.state.givenPrices}
                            onChange={this.handlePrices}
                            margin="normal"
                        />
                    </form>
                </Grid>
                <Button variant="contained" color="primary" className={classes.buttonDark} onClick={this.drawCharts}>
                    {strings.global.drawCharts}
                </Button>
                {this.state.chartsVisible &&
                    <div>
                        <DoubleChart data={this.callsStats} unit={strings.components.calls} brief={strings.components.timeComplex} />
                        <DoubleChart data={this.spaceStats} brief={strings.components.spaceComplex} />
                        <StatsTable data={this.tableStats} />
                    </div>
                }
            </div>
        );
    }

    private handlePrices = (e: any) => {
        if (CheckNumbers(e.target.value)) {
            this.setState({ givenPrices: e.target.value, chartsVisible: false });
        }
    }

    private getStats = () => {
        let recCalls: number;
        let dpCalls: number;
        let name: string;
        let data: IStatsTableData;

        let calls: ISimpleObjectParameter = { value: 0 };

        calls = { value: 0 };
        recursiveRod(this.prices, this.prices.length, calls);

        recCalls = calls.value;

        calls = { value: 0 };
        dpRod(this.prices, this.prices.length, calls);

        dpCalls = calls.value;

        name = `${strings.rod.prices}: ${this.prices}`;
        data = {
            name,
            dpTime: dpCalls,
            recTime: recCalls,
            dpSpace: dpRodSpace(this.prices.length),
            recSpace: recRodSpace(this.prices.length)
        }

        this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace});
        this.callsStats.push({ name, rec: recCalls, dp: dpCalls });
        this.tableStats.push(data);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < rodExamples.length; i++) {
            calls = { value: 0 };
            recursiveRod(rodExamples[i].prices, rodExamples[i].prices.length, calls);

            recCalls = calls.value;

            calls = { value: 0 };
            dpRod(rodExamples[i].prices, rodExamples[i].prices.length, calls);

            dpCalls = calls.value;

            name = `${strings.rod.prices}: ${rodExamples[i].prices}`;
            data = {
                name,
                dpTime: dpCalls,
                recTime: recCalls,
                dpSpace: dpRodSpace(rodExamples[i].prices.length),
                recSpace: recRodSpace(rodExamples[i].prices.length)
            }

            this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace});
            this.callsStats.push({ name, rec: recCalls, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawCharts = () => {
        this.prices = GetNumbers(this.state.givenPrices);
        this.spaceStats = [];
        this.callsStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(RodCharts);
