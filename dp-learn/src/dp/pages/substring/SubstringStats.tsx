import * as React from 'react';

import { dpSubstring, dpSubstringSpace, dpSubstringTime, recSubstringSpace, recSubstringTime, recursiveSubstring, substringExamples } from 'src/dp/helpers/substring/SubstringStatsHelper';

import BottomedDiv from 'src/hoc/BottomedDiv';
import ChartsAndTable from 'src/components/dpComponents/ChartsAndTable';
import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import CustomTitle from 'src/hoc/CustomTitle';
import FlexOne from 'src/hoc/FlexOne';
import { Grid } from '@material-ui/core';
import { ISimpleObjectParameter } from 'src/helpers/TypesDefinitions';
import { ISpaceChartData } from 'src/components/dpComponents/SpaceChart';
import { IStatsTableData } from 'src/components/dpComponents/StatsTable';
import { ITimeChartData } from 'src/components/dpComponents/TimeChart';
import { strings } from 'src/strings/languages';

interface ISubstringStatsState {
    stringX: string
    stringY: string
    statsVisible: boolean
}

class SubstringStats extends React.Component<any, ISubstringStatsState> {
    private timeStats: ITimeChartData[];
    private spaceStats: ISpaceChartData[];
    private tableStats: IStatsTableData[];

    public constructor(props: any) {
        super(props)
        this.state = {
            stringX: "String",
            stringY: "Testing",
            statsVisible: false
        }
    }
    public render() {
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.substring.demo.title}
                </CustomTitle>
                <BottomedDiv>
                    {strings.substring.demo.brief}
                </BottomedDiv>
                <Grid container={true} direction='row'>
                    <FlexOne>
                        <Grid container={true} direction='column'>
                            <CustomTextField label={`${strings.components.string} X (max. 20)`} value={this.state.stringX} onChange={this.handlestrXChange} />
                            <CustomTextField label={`${strings.components.string} Y (max. 20)`} value={this.state.stringY} onChange={this.handlestrYChange} />
                        </Grid>
                    </FlexOne>
                </Grid>
                <CustomButton onClick={this.drawStats} label={strings.global.drawCharts} />
                <ChartsAndTable timeStats={this.timeStats} spaceStats={this.spaceStats} tableStats={this.tableStats} visible={this.state.statsVisible} />
            </div>
        );
    }

    private handlestrXChange = (e: any) => {
        if (e.target.value.length <= 20) {
            this.setState({ stringX: e.target.value });
        }
    };

    private handlestrYChange = (e: any) => {
        if (e.target.value.length <= 20) {
            this.setState({ stringY: e.target.value });
        }
    };

    private getStats = () => {
        let recCalls: number;
        let dpCalls: number;
        let name: string;
        let data: IStatsTableData;

        let calls: ISimpleObjectParameter = { value: 0 };

        calls = { value: 0 };
        let strX = this.state.stringX;
        let length1 = strX.length;
        let strY = this.state.stringY;
        let length2 = strY.length;

        recursiveSubstring(strX, strY, length1, length2, 0, calls);

        recCalls = calls.value;

        calls = { value: 0 };
        dpSubstring(strX, strY, length1, length2, calls);
        dpCalls = calls.value;

        name = `'${strX}', '${strY}'`;
        data = {
            name,
            dpTime: dpCalls,
            dpTheorTime: dpSubstringTime(length1, length2),
            recTime: recCalls,
            recTheorTime: recSubstringTime(length1, length2),
            dpSpace: dpSubstringSpace(length1, length2),
            recSpace: recSubstringSpace(length1, length2)
        }

        this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
        this.tableStats.push(data);

        for (const example of substringExamples) {
            strX = example.strX;
            length1 = strX.length;
            strY = example.strY;
            length2 = strY.length;

            calls = { value: 0 };
            recursiveSubstring(strX, strY, length1, length2, 0, calls);

            recCalls = calls.value;

            calls = { value: 0 };
            dpSubstring(strX, strY, length1, length2, calls);

            dpCalls = calls.value;

            name = `'${strX}', '${strY}'`;
            data = {
                name,
                dpTime: dpCalls,
                dpTheorTime: dpSubstringTime(length1, length2),
                recTime: recCalls,
                recTheorTime: recSubstringTime(length1, length2),
                dpSpace: dpSubstringSpace(length1, length2),
                recSpace: recSubstringSpace(length1, length2)
            }

            this.spaceStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawStats = () => {
        this.timeStats = [];
        this.spaceStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ statsVisible: true });
    }
}

export default SubstringStats;
