import * as Markdown from 'react-markdown';
import * as React from 'react';

import { dpSubstring, dpSubstringSpace, dpSubstringTime, recSubstringSpace, recSubstringTime, recursiveSubstring, substringExamples } from 'src/statsHelpers/SubstringStatsHelper';
import { substringDpSpaceComplex, substringDpTimeComplex, substringRecSpaceComplex, substringRecTimeComplex } from 'src/strings/dpProblemsStrings/SubstringStrings';

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

interface ISubstringStatsState {
    stringX: string
    stringY: string
    statsVisible: boolean
}

class SubstringStats extends React.Component<any, ISubstringStatsState> {
    private timeChartStats: ITimeChartData[];
    private spaceChartStats: ISpaceChartData[];
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
                    {strings.substring.stats.title}
                </CustomTitle>
                <BottomMarginDiv>
                    <Markdown source={strings.substring.stats.brief} />
                </BottomMarginDiv>
                <Grid container={true} direction='row'>
                    <FlexOne>
                        <Grid container={true} direction='column'>
                            <CustomTextField label={`${strings.global.string} X (max. 15)`} value={this.state.stringX} onChange={this.handlestrXChange} />
                            <CustomTextField label={`${strings.global.string} Y (max. 15)`} value={this.state.stringY} onChange={this.handlestrYChange} />
                        </Grid>
                        <CustomButton onClick={this.drawStats} label={strings.global.evaluateStats} />
                    </FlexOne>
                    <FlexTwo>
                        <Grid container={true} direction='row'>
                            <Complexity time={substringRecTimeComplex} space={substringRecSpaceComplex} recOrDp='rec' />
                            <Complexity time={substringDpTimeComplex}  space={substringDpSpaceComplex} recOrDp='dp' />
                        </Grid>
                    </FlexTwo>
                </Grid>
                <br />
                <ChartsAndTable visible={this.state.statsVisible} timeStats={this.timeChartStats} spaceStats={this.spaceChartStats} tableStats={this.tableStats} />
                {this.state.statsVisible &&
                    <div>
                        <CustomTitle variant='h5'>
                            {strings.global.conclusion}
                        </CustomTitle>
                        <Markdown source={strings.substring.stats.conclusion} />
                    </div>
                }
            </div>
        );
    }

    private handlestrXChange = (e: any) => {
        if (e.target.value.length <= 15) {
            this.setState({ stringX: e.target.value });
        }
    };

    private handlestrYChange = (e: any) => {
        if (e.target.value.length <= 15) {
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

        this.spaceChartStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
        this.timeChartStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
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

            this.spaceChartStats.push({ name, rec: data.recSpace, dp: data.dpSpace });
            this.timeChartStats.push({ name, recTheor: data.recTheorTime, rec: recCalls, dpTheor: data.dpTheorTime, dp: dpCalls });
            this.tableStats.push(data);
        }
    }

    private drawStats = () => {
        this.timeChartStats = [];
        this.spaceChartStats = [];
        this.tableStats = [];

        this.getStats();
        this.setState({ statsVisible: true });
    }
}

export default SubstringStats;
