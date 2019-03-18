import * as React from 'react';

import { ISimpleObjectParameter, ISpaceChartData, IStatsTableData, ITimeChartData } from 'src/types';
import { dpTree, dpTreeSpace, recTreeSpace, recTreeTime, recursiveTree, treeExamples } from 'src/dpProblemsStuff/tree/TreeStatsHelper';

import ChartsAndTable from 'src/components/fields/ChartsAndTable';
import FlexRow from 'src/containers/FlexRow';
import MyButton from 'src/components/buttons/MyButton';
import MyTextField from 'src/components/fields/MyTextField';
import { StrToNumArray } from 'src/helpers/Helpers';
import { strings } from 'src/strings/languages';

interface ITreeChartsState {
    givenKeys: string
    givenFreqs: string
    chartsVisible: boolean
}

class TreeCharts extends React.Component<any, ITreeChartsState> {
    private spaceStats: ISpaceChartData[];
    private timeStats: ITimeChartData[];
    private tableStats: IStatsTableData[];

    // private keys: number[];
    private freqs: number[];

    public constructor(props: any) {
        super(props)
        this.state = {
            givenKeys: '1,2,3,4',
            givenFreqs: '2,4,6,8',
            chartsVisible: false
        }
    }

    public render() {
        return (
            <div>
                <FlexRow>
                    <MyTextField label={strings.tree.arrayOfK} value={this.state.givenKeys} onChange={this.handleKeys} />
                    <MyTextField label={strings.tree.arrayOfF} value={this.state.givenFreqs} onChange={this.handleFreqs} />
                </FlexRow>

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

        for (const example of treeExamples) {
            calls = { value: 0 };
            recursiveTree(example.freqs,
                0,
                example.freqs.length - 1,
                calls);

            recCalls = calls.value;

            calls = { value: 0 };
            dpTree(example.freqs, calls);

            dpCalls = calls.value;

            name = `Freqs: ${example.freqs}`;
            data = {
                name,
                recTheorTime: recTreeTime(example.freqs.length),
                recTime: recCalls,
                dpTime: dpCalls,
                dpSpace: dpTreeSpace(example.freqs.length),
                recSpace: recTreeSpace(example.freqs.length)
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

export default TreeCharts;
