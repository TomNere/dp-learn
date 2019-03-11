import * as React from 'react';

import { Animation, ArgumentScale, EventTracker, Stack, ValueScale } from '@devexpress/dx-react-chart';
import {
    ArgumentAxis,
    Chart,
    Legend,
    LineSeries,
    Tooltip,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { IChartData } from 'src/types';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { strings } from 'src/strings/languages';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    data: IChartData[],
    unit: string,
    brief: string,
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

class DoubleChart extends React.Component<AllProps> {
    public static defaultProps: IStateProps = {
        data: [],
        unit: '',
        brief: '',
        showLegend: true
    }
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { data, unit, showLegend, classes, brief } = this.props;
        const { global } = strings;
        return (
            <Paper>
                <Typography align={'center'} className={classes.title} variant={'h6'}>
                    {brief}
                </Typography>
                <Chart data={data}>
                    <ValueScale name="rec" />
                    <ArgumentScale />
                    <ArgumentAxis />

                    {unit === '' &&
                        <ValueAxis scaleName="rec" showGrid={false} showLine={true} showTicks={true} />
                    }
                    {unit !== '' &&
                        <ValueAxis scaleName="rec" showGrid={false} showLine={true} showTicks={true} labelComponent={Label(` ${unit}`)} />
                    }

                    <LineSeries
                        name={`${brief} - ${global.dynProgSolution}`}
                        valueField="dp"
                        argumentField="colName"
                        scaleName="rec"
                    />

                    <LineSeries
                        name={`${brief} - ${global.recursiveSolution}`}
                        valueField="rec"
                        argumentField="colName"
                        scaleName="rec"
                    />

                    {showLegend && <Legend position='bottom' />}
                    <Animation />
                    <Stack />
                    <EventTracker />
                    <Tooltip />
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(styles)(DoubleChart);
