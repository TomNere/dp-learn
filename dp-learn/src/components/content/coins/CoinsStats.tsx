// author: Tomáš Nereča, 2019

import * as Markdown from 'react-markdown';
import * as React from 'react';

import { checkForZero, getNumbers } from 'src/helpers';
import { coinsDpSpaceComplex, coinsDpTimeComplex, coinsRecSpaceComplex, coinsRecTimeComplex } from 'src/strings/dpProblemsStrings/CoinsStrings';
import { coinsExamples, dpCoins, dpCoinsSpace, dpCoinsTime, recCoinsSpace, recCoinsTime, recursiveCoins } from 'src/statsHelpers/CoinsStatsHelper';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import ChartsAndTable from 'src/components/specialized/ChartsAndTable';
import Complexity from 'src/components/specialized/Complexity';
import CustomButton from 'src/components/customStyled/CustomButton';
import CustomTextField from 'src/components/customStyled/CustomTextField';
import CustomTitle from 'src/components/hoc/CustomTitle';
import FlexOne from 'src/components/hoc/FlexOne';
import FlexTwo from 'src/components/hoc/FlexTwo';
import { Grid } from '@material-ui/core';
import { ISimpleObjectParameter } from 'src/statsHelpers/CoinsStatsHelper';
import { ISpaceChartData } from 'src/components/specialized/SpaceChart';
import { IStatsTableData } from 'src/components/specialized/StatsTable';
import { ITimeChartData } from 'src/components/specialized/TimeChart';
import { strings } from 'src/strings/translations/strings';

interface ICoinsStatsState {
    givenValue: number
    givenCoins: string
    statsVisible: boolean
    error: boolean
}

// Minimum number of coins problem stats
class CoinsStats extends React.Component<any, ICoinsStatsState> {
    private coins: number[];
    private timeChartStats: ITimeChartData[];
    private spaceChartStats: ISpaceChartData[];
    private tableStats: IStatsTableData[];

    public constructor(props: any) {
        super(props)
        this.state = {
            givenValue: 4,
            givenCoins: '1,2,5',
            statsVisible: false,
            error: false
        }
    }
    public render() {
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.coins.stats.title}
                </CustomTitle>
                <BottomMarginDiv>
                    {strings.coins.stats.brief}
                </BottomMarginDiv>
                <Grid container={true} direction='row'>
                    <FlexOne>
                        <Grid container={true} direction='column'>
                        <CustomTextField label={`${strings.coins.value} (0-20)`} value={this.state.givenValue.toString()} onChange={this.handleValue} />
                            <CustomTextField label={`${strings.coins.coins} (max. 15)`} value={this.state.givenCoins} onChange={this.handleCoins} />
                        </Grid>
                        <CustomButton onClick={this.drawStats} label={strings.statsGlobal.evaluateStats} />
                    </FlexOne>
                    <FlexTwo>
                        <Grid container={true} direction='row'>
                            <Complexity time={coinsRecTimeComplex} space={coinsRecSpaceComplex} recOrDp='rec' />
                            <Complexity time={coinsDpTimeComplex}  space={coinsDpSpaceComplex} recOrDp='dp' />
                        </Grid>
                    </FlexTwo>
                </Grid>
                <br />
                <ChartsAndTable visible={this.state.statsVisible} timeStats={this.timeChartStats} spaceStats={this.spaceChartStats} tableStats={this.tableStats} error={this.state.error} />
                {this.state.statsVisible &&
                    <div>
                        <CustomTitle variant='h5'>
                            {strings.statsGlobal.conclusion}
                        </CustomTitle>
                        <Markdown source={strings.coins.stats.conclusion} />
                    </div>
                }
            </div>
        );
    }

    private handleValue = (e: any) => {
        if (!Number.isNaN(+e.target.value) && +e.target.value >= 0 && +e.target.value <= 20) {
            this.setState({ givenValue: +e.target.value });
        }
    }

    private handleCoins = (e: any) => {
        const coins = getNumbers(e.target.value, false);
        if (coins.length <= 15) {
            this.setState({ givenCoins: e.target.value });
        }
    }

    private getStats = () => {
        let recCalls: number;
        let dpCalls: number;
        let name: string;
        let data: IStatsTableData;

        let calls: ISimpleObjectParameter = { value: 0 };

        calls = { value: 0 };
        recursiveCoins(this.coins, this.coins.length, this.state.givenValue, calls);

        recCalls = calls.value;

        calls = { value: 0 };
        dpCoins(this.coins, this.coins.length, this.state.givenValue, calls);
        dpCalls = calls.value;

        name = `${strings.coins.stats.c}: ${this.coins}, ${strings.coins.stats.v}: ${this.state.givenValue}`;
        data = {
            name,
            dpTime: dpCalls,
            dpTheorTime: dpCoinsTime(this.coins.length, this.state.givenValue),
            recTime: recCalls,
            recTheorTime: recCoinsTime(this.state.givenValue),
            dpSpace: dpCoinsSpace(this.coins.length),
            recSpace: recCoinsSpace(this.coins.length)
        }

        this.spaceChartStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeChartStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
        this.tableStats.push(data);

        for (const example of coinsExamples) {
            name = `${strings.coins.stats.c}: ${example.coins}, ${strings.coins.stats.v}: ${example.value}`;
            data = {
                name,
                dpTime: example.dpTime,
                dpTheorTime: dpCoinsTime(example.coins.length, example.value),
                recTime: example.recTime,
                recTheorTime: recCoinsTime(example.value),
                dpSpace: dpCoinsSpace(example.coins.length),
                recSpace: recCoinsSpace(example.coins.length)
            }

            this.spaceChartStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeChartStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawStats = () => {
        this.coins = getNumbers(this.state.givenCoins, false);
        if (checkForZero(this.coins)) {
            this.setState({ 
                error: true,
                statsVisible: false
            });
            return;
        }
        else {
            this.setState({ error: false });
        }

        this.timeChartStats = [];
        this.spaceChartStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ statsVisible: true });
    }
}

export default CoinsStats;
