import * as Prism from 'prismjs';
import * as React from 'react';

import { Button, Theme, createStyles } from '@material-ui/core';
import { CheckNumbers, GetNumbers } from 'src/helpers/Helpers';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { dpRod, dpRodSpace, recRodSpace, recRodTime, recursiveRod, rodExamples } from 'src/dp/helpers/rod/RodStatsHelper';

import ChartsAndTable from 'src/components/dpComponents/ChartsAndTable';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import { ISimpleObjectParameter } from 'src/helpers/TypesDefinitions';
import { ISpaceChartData } from 'src/components/dpComponents/SpaceChart';
import { IStatsTableData } from 'src/components/dpComponents/StatsTable';
import { ITimeChartData } from 'src/components/dpComponents/TimeChart';
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
    private spaceStats: ISpaceChartData[];
    private timeStats: ITimeChartData[];
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
                <CustomTextField label={strings.rod.prices} value={this.state.givenPrices} onChange={this.handlePrices} />
                <Button variant="contained" color="primary" className={classes.buttonDark} onClick={this.drawCharts}>
                    {strings.global.drawCharts}
                </Button>
                <ChartsAndTable visible={this.state.chartsVisible} timeStats={this.timeStats} spaceStats={this.spaceStats} tableStats={this.tableStats} />
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
            recTheorTime: recRodTime(this.prices.length),
            dpSpace: dpRodSpace(this.prices.length),
            recSpace: recRodSpace(this.prices.length)
        }

        this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeStats.push({ name, recTheoretical: data.recTheorTime, rec: recCalls, dp: dpCalls });
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
                recTheorTime: recRodTime(rodExamples[i].prices.length),
                recTime: recCalls,
                dpTime: dpCalls,
                dpSpace: dpRodSpace(rodExamples[i].prices.length),
                recSpace: recRodSpace(rodExamples[i].prices.length)
            }

            this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeStats.push({ name, recTheoretical: data.recTheorTime, rec: recCalls, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawCharts = () => {
        this.prices = GetNumbers(this.state.givenPrices);
        this.spaceStats = [];
        this.timeStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(RodCharts);
