import * as Prism from 'prismjs';
import * as React from 'react';

import { Button, Grid, TextField, Theme, createStyles } from '@material-ui/core';
import { IChartData, ISimpleObjectParameter, IStatsTableData } from 'src/types';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { dpTree, dpTreeSpace, recTreeSpace, recursiveTree, treeExamples } from 'src/dpProblemsStuff/tree/TreeStatsHelper';

import DoubleChart from 'src/components/fields/DoubleChart';
import { GetNumbers } from 'src/helpers/Helpers';
import StatsTable from 'src/components/fields/StatsTable';
import myTheme from '../../../styles/index';
import { strings } from 'src/strings/languages';

type AllProps =
    WithStyles<typeof styles>;

interface ITreeChartsState {
    givenKeys: string
    givenFreqs: string
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

class TreeCharts extends React.Component<AllProps, ITreeChartsState> {
    private spaceStats: IChartData[];
    private callsStats: IChartData[];
    private tableStats: IStatsTableData[];

    // private keys: number[];
    private freqs: number[];

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenKeys: '1,2,3,4',
            givenFreqs: '2,4,6,8',
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
                            id="keysArrayTF"
                            label={strings.tree.arrayOfK}
                            className={classes.textField}
                            value={this.state.givenKeys}
                            onChange={this.handleKeys}
                            margin="normal"
                        />
                    </form>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="freqsArrayTF"
                            label={strings.tree.arrayOfF}
                            className={classes.textField}
                            value={this.state.givenFreqs}
                            onChange={this.handleFreqs}
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

    private handleKeys = (e: any) => {
        for (const key of e.target.value.split(",")) {
            if (Number.isNaN(+key)) {
                return;
            }
        }
        
        this.setState({ givenKeys: e.target.value });
    }

    private handleFreqs = (e: any) => {
        for (const freq of e.target.value.split(",")) {
            if (Number.isNaN(+freq)) {
                return;
            }
        }

        this.setState({ givenFreqs: e.target.value });
    }

    private getStats = () => {
        let recCalls: number;
        let dpCalls: number;
        let name: string;
        let data: IStatsTableData;

        let calls: ISimpleObjectParameter = { value: 0 };

        calls = { value: 0 };
        recursiveTree(this.freqs, 0, this.freqs.length - 1, calls);

        recCalls = calls.value;

        calls = { value: 0 };
        dpTree(this.freqs, calls);
        dpCalls = calls.value;

        name = `Freqs: ${this.state.givenFreqs}`;
        data = {
            name,
            dpTime: dpCalls,
            recTime: recCalls,
            dpSpace: dpTreeSpace(this.freqs.length),
            recSpace: recTreeSpace(this.freqs.length)
        }

        this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.callsStats.push({ name, rec: recCalls, dp: dpCalls });
        this.tableStats.push(data);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < treeExamples.length; i++) {
            calls = { value: 0 };
            recursiveTree(treeExamples[i].freqs,
                0,
                treeExamples[i].freqs.length - 1,
                calls);

            recCalls = calls.value;

            calls = { value: 0 };
            dpTree(treeExamples[i].freqs, calls);

            dpCalls = calls.value;

            name = `Freqs: ${treeExamples[i].freqs}`;
            data = {
                name,
                dpTime: dpCalls,
                recTime: recCalls,
                dpSpace: dpTreeSpace(treeExamples[i].freqs.length),
                recSpace: recTreeSpace(treeExamples[i].freqs.length)
            }

            this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.callsStats.push({ name, rec: recCalls, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawCharts = () => {
        // this.keys = GetNumbers(this.state.givenKeys);
        this.freqs = GetNumbers(this.state.givenFreqs)

        this.spaceStats = [];
        this.callsStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(TreeCharts);
