import * as Prism from 'prismjs';
import * as React from 'react';

import { Button, Grid, TextField, Theme, createStyles } from '@material-ui/core';
import { IChartData, ISimpleObjectParameter, IStatsTableData } from 'src/types';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { dpEditDistance, dpEditDistanceSpace, editDistanceExamples, recEditDistanceSpace, recursiveEditDistance } from 'src/dpProblemsStuff/editDistance/EditDistanceStatsHelper';

import DoubleChart from 'src/components/fields/DoubleChart';
import StatsTable from 'src/components/fields/StatsTable';
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
    private tableStats: IStatsTableData[];

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
                        <StatsTable data={this.tableStats} />
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

    private getStats = () => {
        let recCalls: number;
        let dpCalls: number;
        let name: string;
        let data: IStatsTableData;

        let calls: ISimpleObjectParameter = { value: 0 };

        calls = { value: 0 };
        recursiveEditDistance(this.state.stringX, this.state.stringY, this.state.stringX.length, this.state.stringY.length, calls);

        recCalls = calls.value;

        calls = { value: 0 };
        dpEditDistance(this.state.stringX, this.state.stringY, this.state.stringX.length, this.state.stringY.length, calls);
        dpCalls = calls.value;

        name = `StrX: ${this.state.stringX}, StrY: ${this.state.stringY}`;
        data = {
            name,
            dpTime: dpCalls,
            recTime: recCalls,
            dpSpace: dpEditDistanceSpace(this.state.stringX, this.state.stringY),
            recSpace: recEditDistanceSpace(this.state.stringX, this.state.stringY)
        }

        this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.callsStats.push({ name, rec: recCalls, dp: dpCalls });
        this.tableStats.push(data);

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

            name = `StrX: ${editDistanceExamples[i].stringX}, StrY: ${editDistanceExamples[i].stringY}`;
            data = {
                name,
                dpTime: dpCalls,
                recTime: recCalls,
                dpSpace: dpEditDistanceSpace(editDistanceExamples[i].stringX, editDistanceExamples[i].stringY),
                recSpace: recEditDistanceSpace(editDistanceExamples[i].stringX, editDistanceExamples[i].stringY)
            }

            this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.callsStats.push({ name, rec: recCalls, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawCharts = () => {
        this.spaceStats = [];
        this.callsStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(EditDistanceCharts);
