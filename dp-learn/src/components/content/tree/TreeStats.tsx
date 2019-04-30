import * as Markdown from 'react-markdown';
import * as React from 'react';

import { CheckForZero, GetNumbers } from 'src/helpers';
import { dpTree, dpTreeSpace, dpTreeTime, recTreeSpace, recTreeTime, recursiveTree, treeExamples } from 'src/statsHelpers/TreeStatsHelper';
import { treeDpSpaceComplex, treeDpTimeComplex, treeRecSpaceComplex, treeRecTimeComplex } from 'src/strings/dpProblemsStrings/TreeStrings';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import ChartsAndTable from 'src/components/specialized/ChartsAndTable';
import Complexity from 'src/components/specialized/Complexity';
import CustomButton from 'src/components/customStyled/CustomButton';
import CustomTextField from 'src/components/customStyled/CustomTextField';
import CustomTitle from 'src/components/customStyled/CustomTitle';
import FlexOne from 'src/components/hoc/FlexOne';
import FlexTwo from 'src/components/hoc/FlexTwo';
import { Grid } from '@material-ui/core';
import { ISimpleObjectParameter } from 'src/statsHelpers/CoinsStatsHelper';
import { ISpaceChartData } from 'src/components/specialized/SpaceChart';
import { IStatsTableData } from 'src/components/specialized/StatsTable';
import { ITimeChartData } from 'src/components/specialized/TimeChart';
import { strings } from 'src/strings/translations/strings';

interface ITreeStatsState {
    givenFreqs: string
    statsVisible: boolean
    error: boolean
}

class TreeStats extends React.Component<any, ITreeStatsState> {
    private spaceChartStats: ISpaceChartData[];
    private timeChartStats: ITimeChartData[];
    private tableStats: IStatsTableData[];

    // private keys: number[];
    private freqs: number[];

    public constructor(props: any) {
        super(props)
        this.state = {
            givenFreqs: strings.tree.demo.freqsExample,
            statsVisible: false,
            error: false
        }
    }

    public render() {
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.tree.stats.title}
                </CustomTitle>
                <BottomMarginDiv>
                    {strings.tree.stats.brief}
                </BottomMarginDiv>
                <Grid container={true} direction='row'>
                    <FlexOne>
                        <BottomMarginDiv>
                        <CustomTextField label={`${strings.tree.arrayOfF} (max. 15)`} value={this.state.givenFreqs} onChange={this.handleFreqs} />
                        </BottomMarginDiv>
                        <CustomButton onClick={this.drawStats} label={strings.global.evaluateStats} />
                    </FlexOne>

                    <FlexTwo>
                        <Grid container={true} direction='row'>
                            <Complexity time={treeRecTimeComplex} space={treeRecSpaceComplex} recOrDp='rec' />
                            <Complexity time={treeDpTimeComplex}  space={treeDpSpaceComplex} recOrDp='dp' />
                        </Grid>
                    </FlexTwo>
                </Grid>
                <br />
                <ChartsAndTable visible={this.state.statsVisible} timeStats={this.timeChartStats} spaceStats={this.spaceChartStats} tableStats={this.tableStats} error={this.state.error} />
                {this.state.statsVisible &&
                    <div>
                        <CustomTitle variant='h5'>
                            {strings.global.conclusion}
                        </CustomTitle>
                        <Markdown source={strings.rod.stats.conclusion} />
                    </div>
                }
            </div>
        );
    }

    private handleFreqs = (e: any) => {
        const freqs = GetNumbers(e.target.value, false);
        if (freqs.length <= 15) {
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

        this.spaceChartStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeChartStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
        this.tableStats.push(data);

        for (const example of treeExamples) {
            calls = { value: 0 };
            console.log('res:',recursiveTree(example.freqs,
                0,
                example.freqs.length - 1,
                calls));

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

            this.spaceChartStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeChartStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawStats = () => {
        this.freqs = GetNumbers(this.state.givenFreqs, false);
        if (CheckForZero(this.freqs)) {
            this.setState({ 
                error: true,
                statsVisible: false
            });
            return;
        }
        else {
            this.setState({ error: false });
        }
        
        this.spaceChartStats = [];
        this.timeChartStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ statsVisible: true });
    }
}

export default TreeStats;
