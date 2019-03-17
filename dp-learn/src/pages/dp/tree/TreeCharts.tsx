import * as Prism from 'prismjs';
import * as React from 'react';

import { Grid, Theme, createStyles } from '@material-ui/core';
import { ISimpleObjectParameter, ISpaceChartData, IStatsTableData, ITimeChartData } from 'src/types';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { dpTree, dpTreeSpace, recTreeSpace, recTreeTime, recursiveTree, treeExamples } from 'src/dpProblemsStuff/tree/TreeStatsHelper';

import ChartsAndTable from 'src/components/fields/ChartsAndTable';
import MyButton from 'src/components/buttons/MyButton';
import NumbersField from 'src/components/fields/NumbersField';
import { StrToNumArray } from 'src/helpers/Helpers';
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
    bottomMargin: {
        marginBottom: 15,
    },
});

class TreeCharts extends React.Component<AllProps, ITreeChartsState> {
    private spaceStats: ISpaceChartData[];
    private timeStats: ITimeChartData[];
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
                    <NumbersField label={strings.tree.arrayOfK} numbers={this.state.givenKeys} onChange={this.handleKeys} />
                    <NumbersField label={strings.tree.arrayOfF} numbers={this.state.givenFreqs} onChange={this.handleFreqs} />
                </Grid>
                <MyButton label={strings.global.drawCharts} color='dark' onClick={this.drawCharts} visible={true} />
                <ChartsAndTable timeStats={this.timeStats} spaceStats={this.spaceStats} tableStats={this.tableStats} visible={this.state.chartsVisible} />
            </div>
        );
    }

    private handleKeys = (e: any) => {
        const numbers = StrToNumArray(e.target.value);
        if (numbers.length > 0) {
            this.setState({ givenKeys: e.target.value });
        }
    }

    private handleFreqs = (e: any) => {
        const numbers = StrToNumArray(e.target.value);
        if (numbers.length > 0) {
            this.setState({ givenFreqs: e.target.value });
            this.freqs = numbers;
        }
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
            recTheorTime: recTreeTime(this.freqs.length),
            recTime: recCalls,
            dpTime: dpCalls,
            dpSpace: dpTreeSpace(this.freqs.length),
            recSpace: recTreeSpace(this.freqs.length)
        }

        this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeStats.push({ name, recTheoretical: data.recTheorTime, rec: recCalls, dp: dpCalls });
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
                recTheorTime: recTreeTime(treeExamples[i].freqs.length),
                recTime: recCalls,
                dpTime: dpCalls,
                dpSpace: dpTreeSpace(treeExamples[i].freqs.length),
                recSpace: recTreeSpace(treeExamples[i].freqs.length)
            }

            this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeStats.push({ name, recTheoretical: data.recTheorTime, rec: recCalls, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawCharts = () => {
        this.freqs = StrToNumArray(this.state.givenFreqs);
        this.spaceStats = [];
        this.timeStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ chartsVisible: true });
    }
}

export default withStyles(styles)(TreeCharts);
