import * as React from 'react';

import { Animation, ArgumentScale, EventTracker, Stack, ValueScale } from '@devexpress/dx-react-chart';
import {
    ArgumentAxis,
    BarSeries,
    Chart,
    Legend,
    Tooltip,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { strings } from 'src/translations/languages';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

export interface IChartData {
    colName: string,
    time: number,
    space: number,
    calls: number
}

interface IStateProps {
    data: IChartData[],
    timeUnit: 'ms' | 'ns',
    recOrDp: 'rec' | 'dp',
    showLegend: boolean
}

const styles = (theme: Theme) => createStyles({
    title: {
        padding: theme.spacing.unit
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    flexChild: {
        flex: 1,
        padding: theme.spacing.unit * 2
    },
});

const Label = (symbol: any) => (props: any) => {
    const { text } = props;
    return (
        <ValueAxis.Label
            {...props}
            text={text + symbol}
        />
    );
};

const nsLabel = Label(' ns');
const msLabel = Label(' ms');

class Charts extends React.Component<AllProps> {
    public static defaultProps: IStateProps = {
        data: [],
        timeUnit: 'ms',
        recOrDp: 'rec',
        showLegend: true
    }
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { data, timeUnit, recOrDp, showLegend, classes } = this.props;
        const { global, components } = strings;
        return (
            <Paper>
                <Typography align={'center'} className={classes.title} variant={'h6'}>
                    {recOrDp === 'rec' ? global.recursiveSolution : global.dynProgSolution}
                </Typography>
                <Chart data={data}>
                    <ValueScale name="time" />
                    <ValueScale name="space" />
                    <ValueScale name="calls" />
                    <ArgumentScale />
                    <ArgumentAxis />

                    <ValueAxis scaleName="time" showGrid={false} showLine={true} showTicks={true} labelComponent={timeUnit === 'ms' ? msLabel : nsLabel} />

                    <BarSeries
                        name={`${components.timeComplex}(${timeUnit})`}
                        valueField="time"
                        argumentField="colName"
                        scaleName="time"
                    >

                        s
                        </BarSeries>

                    <BarSeries
                        name={strings.components.spaceComplex}
                        valueField="space"
                        argumentField="colName"
                        scaleName="space"
                    />

                    <BarSeries
                        name={recOrDp === 'rec' ? global.numberOfRecCalls : global.numberOfCycles}
                        valueField="calls"
                        argumentField="colName"
                        scaleName="calls"
                    />

                    {showLegend && <Legend position='bottom' />}
                    <Animation />
                    <Stack />
                    <EventTracker />
                    <Tooltip/>
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(styles)(Charts);
