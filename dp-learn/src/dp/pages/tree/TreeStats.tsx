import * as React from 'react';

import { GetNumbers, StrToNumArray } from 'src/helpers/Helpers';
import { dpTree, dpTreeSpace, dpTreeTime, recTreeSpace, recTreeTime, recursiveTree, treeExamples } from 'src/dp/helpers/tree/TreeStatsHelper';

import BottomedDiv from 'src/hoc/BottomedDiv';
import ChartsAndTable from 'src/components/dpComponents/ChartsAndTable';
import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import CustomTitle from 'src/hoc/CustomTitle';
import { ISimpleObjectParameter } from 'src/helpers/TypesDefinitions';
import { ISpaceChartData } from 'src/components/dpComponents/SpaceChart';
import { IStatsTableData } from 'src/components/dpComponents/StatsTable';
import { ITimeChartData } from 'src/components/dpComponents/TimeChart';
import { strings } from 'src/strings/languages';

interface ITreeStatsState {
    givenFreqs: string
    statsVisible: boolean
}

class TreeStats extends React.Component<any, ITreeStatsState> {
    private spaceStats: ISpaceChartData[];
    private timeStats: ITimeChartData[];
    private tableStats: IStatsTableData[];

    // private keys: number[];
    private freqs: number[];

    public constructor(props: any) {
        super(props)
        this.state = {
            givenFreqs: '2,4,6,8',
            statsVisible: false
        }
    }

    public render() {
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.rod.stats.title}
                </CustomTitle>
                <BottomedDiv>
                    {strings.rod.stats.brief}
                </BottomedDiv>
                <CustomTextField label={`${strings.tree.arrayOfF} (max. 30)`} value={this.state.givenFreqs} onChange={this.handleFreqs} />
                <CustomButton onClick={this.drawStats} label={strings.global.drawCharts}>
                    {strings.global.drawCharts}
                </CustomButton>
                <ChartsAndTable visible={this.state.statsVisible} timeStats={this.timeStats} spaceStats={this.spaceStats} tableStats={this.tableStats} />
            </div>
        );
    }

    private handleFreqs = (e: any) => {
        const freqs = GetNumbers(e.target.value);
        if (freqs.length <= 30) {
            this.setState({ givenFreqs: e.target.value });
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

        name = `${this.state.givenFreqs}`;
        data = {
            name,
            recTheorTime: recTreeTime(this.freqs.length),
            recTime: recCalls,
            dpTime: dpCalls,
            dpTheorTime: dpTreeTime(this.freqs.length),
            dpSpace: dpTreeSpace(this.freqs.length),
            recSpace: recTreeSpace(this.freqs.length)
        }

        this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
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

            name = `${example.freqs}`;
            data = {
                name,
                recTheorTime: recTreeTime(example.freqs.length),
                recTime: recCalls,
                dpTime: dpCalls,
                dpTheorTime: dpTreeTime(example.freqs.length),
                dpSpace: dpTreeSpace(example.freqs.length),
                recSpace: recTreeSpace(example.freqs.length)
            }

            this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawStats = () => {
        this.freqs = StrToNumArray(this.state.givenFreqs);
        this.spaceStats = [];
        this.timeStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ statsVisible: true });
    }
}

export default TreeStats;
