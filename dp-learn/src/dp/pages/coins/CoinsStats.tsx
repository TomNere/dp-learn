import * as React from 'react';

import { coinsExamples, dpCoins, dpCoinsSpace, dpCoinsTime, recCoinsSpace, recCoinsTime, recursiveCoins } from 'src/dp/helpers/coins/CoinsStatsHelper';

import ChartsAndTable from 'src/components/dpComponents/ChartsAndTable';
import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
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
                <Grid container={true} direction='row'>
                    <CustomTextField label={`${strings.coins.value} (0-15)`} value={this.state.givenValue.toString()} onChange={this.handleValue} />
                    <CustomTextField label={`${strings.coins.coins} (max. 10)`} value={this.state.givenCoins} onChange={this.handleCoins} />
                </Grid>
                <CustomButton onClick={this.drawStats} label={strings.global.drawCharts} />
                <ChartsAndTable timeStats={this.timeStats} spaceStats={this.spaceStats} tableStats={this.tableStats} visible={this.state.statsVisible} />
            </div>
        );
    }

    private handleValue = (e: any) => {
        if (!Number.isNaN(+e.target.value) && +e.target.value >= 0 && +e.target.value <= 15) {
            this.setState({ givenValue: +e.target.value });
        }
    }

    private handleCoins = (e: any) => {
        const coins = GetNumbers(e.target.value);
        if (coins.length <= 10) {
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

        name = `${strings.coins.coins}: ${this.coins}`;
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

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < coinsExamples.length; i++) {
            calls = { value: 0 };
            recursiveCoins(coinsExamples[i].coins, coinsExamples[i].coins.length, coinsExamples[i].value, calls);
            recCalls = calls.value;

            calls = { value: 0 };
            dpCoins(coinsExamples[i].coins, coinsExamples[i].coins.length, coinsExamples[i].value, calls);

            dpCalls = calls.value;

            name = `${strings.coins.coins}: ${coinsExamples[i].coins}`;
            data = {
                name,
                dpTime: dpCalls,
                dpTheorTime: dpCoinsTime(coinsExamples[i].coins.length, coinsExamples[i].value),
                recTime: recCalls,
                recTheorTime: recCoinsTime(coinsExamples[i].coins.length, coinsExamples[i].value),
                dpSpace: dpCoinsSpace(coinsExamples[i].coins.length, coinsExamples[i].value),
                recSpace: recCoinsSpace(coinsExamples[i].coins.length)
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
