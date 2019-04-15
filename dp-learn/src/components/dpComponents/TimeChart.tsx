import * as React from 'react';

import { Animation, ArgumentScale, Stack, ValueScale } from '@devexpress/dx-react-chart';
import {
    ArgumentAxis,
    Chart,
    Legend,
    LineSeries,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { dpColor, dpTheorColor, recColor, recTheorColor } from 'src/styles/colors';

import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { strings } from 'src/strings/languages';

type AllProps =
    ITimeChartProps &
    WithStyles<typeof styles>;

interface ITimeChartProps {
    data: ITimeChartData[],
}

export interface ITimeChartData {
    name: string,
    recTheor: number,
    rec: number,
    dpTheor: number,
    dp: number,
}

const styles = (theme: Theme) => createStyles({
    title: {
        padding: theme.spacing.unit
    },
    bottomMargin: {
        marginBottom: theme.spacing.unit * 2
    },
});

// Chart showing time complexity stats
class TimeChart extends React.Component<AllProps> {
    public render() {
        const { data, classes } = this.props;
        const { global } = strings;
        return (
            <Paper className={classes.bottomMargin}>
                <Typography align={'center'} className={classes.title} variant={'h6'}>
                    {strings.global.timeComplex}
                </Typography>
                <Chart data={data}>
                    <ValueScale name='rec' />
                    <ArgumentScale />
                    <ArgumentAxis />

                    <ValueAxis scaleName='rec' showGrid={false} showLine={true} showTicks={true} labelComponent={this.getLabel(` ${strings.global.calls}`)} />

                    <LineSeries
                        name={`${global.recursiveSolution} (${global.theoreticValue})`}
                        valueField='recTheor'
                        argumentField='name'
                        scaleName='rec'
                        color={recTheorColor}
                    />

                    <LineSeries
                        name={`${global.recursiveSolution}`}
                        valueField='rec'
                        argumentField='name'
                        scaleName='rec'
                        color={recColor}
                    />

                    <LineSeries
                        name={`${global.dynProgSolution} (${global.theoreticValue})`}
                        valueField='dpTheor'
                        argumentField='name'
                        scaleName='rec'
                        color={dpTheorColor}
                    />

                    <LineSeries
                        name={`${global.dynProgSolution}`}
                        valueField='dp'
                        argumentField='name'
                        scaleName='rec'
                        color={dpColor}
                    />

                    <Legend position='bottom' />
                    <Animation />
                    <Stack />
                </Chart>
            </Paper>
        );
    }

    // Get value axis label
    private getLabel = (symbol: any) => (props: any) => {
        const { text } = props;
        return (
            <ValueAxis.Label
                {...props}
                text={text + symbol}
            />
        );
    };
}

export default withStyles(styles)(TimeChart);
