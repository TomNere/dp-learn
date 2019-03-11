import * as Prism from 'prismjs';
import * as React from 'react';

import { Button, Grid, TextField, Theme, createStyles } from '@material-ui/core';
import { IChartData, ISimpleObjectParameter } from 'src/types';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { dpEditDistance, dpEditDistanceSpace, editDistanceExamples, recEditDistanceSpace, recursiveEditDistance } from 'src/dpProblemsStuff/editDistance/EditDistanceStatsHelper';

import DoubleChart from 'src/components/fields/DoubleChart';
import myTheme from '../../../styles/index';
import { strings } from 'src/strings/languages';

type AllProps =
    WithStyles<typeof styles>;

interface IEditDistanceChartsState {
    stringX: string,
    stringY: string,
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

class EditDistanceCharts extends React.Component<AllProps, IEditDistanceChartsState> {
    private spaceStats: IChartData[];
    private callsStats: IChartData[];

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            stringX: "AdRemovee",
            stringY: "AddRemove",
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
                            id="stringXTF"
                            label="String X"
                            className={classes.textField}
                            value={this.state.stringX}
                            onChange={this.strXChange}
                            margin="normal"
                        />
                    </form>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="stringYTF"
                            label="String Y"
                            className={classes.textField}
                            value={this.state.stringY}
                            onChange={this.strYChange}
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
                    </div>
                }
            </div>
        );
    }

    private strXChange = (e: any) => {
        this.setState({ stringX: e.target.value });
    };

    private strYChange = (e: any) => {
        this.setState({ stringY: e.target.value });
    };

    private getStats = (spaceChart: IChartData[], callsChart: IChartData[]) => {
        let recCalls: number;
        let dpCalls: number;

        let calls: ISimpleObjectParameter = { value: 0 };

        calls = { value: 0 };
        recursiveEditDistance(this.state.stringX, this.state.stringY, this.state.stringX.length, this.state.stringY.length, calls);

        recCalls = calls.value;

        calls = { value: 0 };
        dpEditDistance(this.state.stringX, this.state.stringY, this.state.stringX.length, this.state.stringY.length, calls);
        dpCalls = calls.value;

        spaceChart.push({ colName: `StrX: ${this.state.stringX}, StrY: ${this.state.stringY}`, rec: recEditDistanceSpace(this.state.stringX, this.state.stringY), dp: dpEditDistanceSpace(this.state.stringX, this.state.stringY) });
        callsChart.push({ colName: `StrX: ${this.state.stringX}, StrY: ${this.state.stringY}`, rec: recCalls, dp: dpCalls });

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < editDistanceExamples.length; i++) {
            calls = { value: 0 };
            recursiveEditDistance(editDistanceExamples[i].stringX,
                editDistanceExamples[i].stringY,
                editDistanceExamples[i].stringX.length,
                editDistanceExamples[i].stringY.length, calls);

            recCalls = calls.value;

            calls = { value: 0 };
            dpEditDistance(editDistanceExamples[i].stringX,
                editDistanceExamples[i].stringY,
                editDistanceExamples[i].stringX.length,
                editDistanceExamples[i].stringY.length, calls);

            dpCalls = calls.value;

            spaceChart.push({ colName: `StrX: ${editDistanceExamples[i].stringX}, StrY: ${editDistanceExamples[i].stringY}`, rec: recEditDistanceSpace(editDistanceExamples[i].stringX, editDistanceExamples[i].stringY), dp: dpEditDistanceSpace(editDistanceExamples[i].stringX, editDistanceExamples[i].stringY) });
            callsChart.push({ colName: `StrX: ${editDistanceExamples[i].stringX}, StrY: ${editDistanceExamples[i].stringY}`, rec: recCalls, dp: dpCalls });
        }
    }

    private drawCharts = () => {
        this.spaceStats = [];
        this.callsStats = [];

        this.getStats(this.spaceStats, this.callsStats);
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(EditDistanceCharts);
