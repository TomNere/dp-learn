import * as Markdown from 'react-markdown';
import * as React from 'react';

import { CheckForZero, GetNumbers } from 'src/helpers';
import { dpRod, dpRodSpace, dpRodTime, recRodSpace, recRodTime, recursiveRod, rodExamples } from 'src/statsHelpers/RodStatsHelper';
import { rodDpSpaceComplex, rodDpTimeComplex, rodRecSpaceComplex, rodRecTimeComplex } from 'src/strings/dpProblemsStrings/RodStrings';

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

interface IRodStatsState {
    givenPrices: string,
    statsVisible: boolean,
    error: boolean
}

class RodStats extends React.Component<any, IRodStatsState> {
    private prices: number[];
    private spaceChartStats: ISpaceChartData[];
    private timeChartStats: ITimeChartData[];
    private tableStats: IStatsTableData[];

    public constructor(props: any) {
        super(props)
        this.state = {
            givenPrices: '1,5,6,6,9',
            statsVisible: false,
            error: false
        }
    }

    public render() {
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.rod.stats.title}
                </CustomTitle>
                <BottomMarginDiv>
                    {strings.rod.stats.brief}
                </BottomMarginDiv>
                <Grid container={true} direction='row'>
                    <FlexOne>
                        <BottomMarginDiv>
                            <CustomTextField label={`${strings.rod.prices} (max. 20)`} value={this.state.givenPrices} onChange={this.handlePrices} />
                        </BottomMarginDiv>
                        <CustomButton onClick={this.drawStats} label={strings.global.evaluateStats} />
                    </FlexOne>

                    <FlexTwo>
                        <Grid container={true} direction='row'>
                            <Complexity time={rodRecTimeComplex} space={rodRecSpaceComplex} recOrDp='rec' />
                            <Complexity time={rodDpTimeComplex} space={rodDpSpaceComplex} recOrDp='dp' />
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

    private handlePrices = (e: any) => {
        const prices = GetNumbers(e.target.value, false);
        if (prices.length <= 20) {
            this.setState({ givenPrices: e.target.value });
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
            dpTheorTime: dpRodTime(this.prices.length),
            recTime: recCalls,
            recTheorTime: recRodTime(this.prices.length),
            dpSpace: dpRodSpace(this.prices.length),
            recSpace: recRodSpace(this.prices.length)
        }

        this.spaceChartStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeChartStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
        this.tableStats.push(data);

        for (const example of rodExamples) {
            calls = { value: 0 };
            recursiveRod(example.prices, example.prices.length, calls);

            recCalls = calls.value;

            calls = { value: 0 };
            dpRod(example.prices, example.prices.length, calls);

            dpCalls = calls.value;

            name = `${strings.rod.prices}: ${example.prices}`;
            data = {
                name,
                recTheorTime: recRodTime(example.prices.length),
                recTime: recCalls,
                dpTime: dpCalls,
                dpTheorTime: dpRodTime(example.prices.length),
                dpSpace: dpRodSpace(example.prices.length),
                recSpace: recRodSpace(example.prices.length)
            }

            this.spaceChartStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeChartStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawStats = () => {
        this.prices = GetNumbers(this.state.givenPrices, false);
        if (CheckForZero(this.prices)) {
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

export default RodStats;
