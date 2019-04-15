import * as Markdown from 'react-markdown';
import * as React from 'react';

import { coinsDpSpaceComplex, coinsDpTimeComplex, coinsRecSpaceComplex, coinsRecTimeComplex } from 'src/dp/helpers/coins/CoinsStrings';
import { coinsExamples, dpCoins, dpCoinsSpace, dpCoinsTime, recCoinsSpace, recCoinsTime, recursiveCoins } from 'src/dp/helpers/coins/CoinsStatsHelper';

import BottomMarginDiv from 'src/hoc/BottomMarginDiv';
import ChartsAndTable from 'src/components/dpComponents/ChartsAndTable';
import Complexity from 'src/components/dpComponents/Complexity';
import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import CustomTitle from 'src/hoc/CustomTitle';
import FlexOne from 'src/hoc/FlexOne';
import FlexTwo from 'src/hoc/FlexTwo';
import { GetNumbers } from 'src/helpers/Helpers';
import { Grid } from '@material-ui/core';
import { ISimpleObjectParameter } from 'src/helpers/TypesDefinitions';
import { ISpaceChartData } from 'src/components/dpComponents/SpaceChart';
import { IStatsTableData } from 'src/components/dpComponents/StatsTable';
import { ITimeChartData } from 'src/components/dpComponents/TimeChart';
import { strings } from 'src/strings/languages';

interface ICoinsStatsState {
    givenValue: number
    givenCoins: string
    statsVisible: boolean
}

class CoinsStats extends React.Component<any, ICoinsStatsState> {
    private coins: number[];
    private timeStats: ITimeChartData[];
    private spaceStats: ISpaceChartData[];
    private tableStats: IStatsTableData[];

    public constructor(props: any) {
        super(props)
        this.state = {
            givenValue: 10,
            givenCoins: "1,2,5",
            statsVisible: false
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
                        <CustomButton onClick={this.drawStats} label={strings.global.evaluateStats} />
                    </FlexOne>
                    <FlexTwo>
                        <Grid container={true} direction='row'>
                            <Complexity time={coinsRecTimeComplex} space={coinsRecSpaceComplex} recOrDp='rec' />
                            <Complexity time={coinsDpTimeComplex}  space={coinsDpSpaceComplex} recOrDp='dp' />
                        </Grid>
                    </FlexTwo>
                </Grid>
                <br />
                <ChartsAndTable visible={this.state.statsVisible} timeStats={this.timeStats} spaceStats={this.spaceStats} tableStats={this.tableStats} />
                {this.state.statsVisible &&
                    <div>
                        <CustomTitle variant='h5'>
                            {strings.global.conclusion}
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
        const coins = GetNumbers(e.target.value);
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

        name = `${strings.coins.coins}: ${this.coins}, ${strings.coins.valueLower}: ${this.state.givenValue}`;
        data = {
            name,
            dpTime: dpCalls,
            dpTheorTime: dpCoinsTime(this.coins.length, this.state.givenValue),
            recTime: recCalls,
            recTheorTime: recCoinsTime(this.coins.length, this.state.givenValue),
            dpSpace: dpCoinsSpace(this.coins.length, this.state.givenValue),
            recSpace: recCoinsSpace(this.coins.length)
        }

        this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
        this.tableStats.push(data);

        for (const example of coinsExamples) {
            calls = { value: 0 };
            recursiveCoins(example.coins, example.coins.length, example.value, calls);
            recCalls = calls.value;

            calls = { value: 0 };
            dpCoins(example.coins, example.coins.length, example.value, calls);

            dpCalls = calls.value;

            name = `${strings.coins.coins}: ${example.coins}, ${strings.coins.valueLower}: ${example.value}`;
            data = {
                name,
                dpTime: dpCalls,
                dpTheorTime: dpCoinsTime(example.coins.length, example.value),
                recTime: recCalls,
                recTheorTime: recCoinsTime(example.coins.length, example.value),
                dpSpace: dpCoinsSpace(example.coins.length, example.value),
                recSpace: recCoinsSpace(example.coins.length)
            }

            this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawStats = () => {
        this.coins = GetNumbers(this.state.givenCoins);
        this.timeStats = [];
        this.spaceStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ statsVisible: true });
    }
}

export default CoinsStats;
