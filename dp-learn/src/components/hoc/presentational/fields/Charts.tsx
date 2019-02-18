import * as React from 'react';

import {
    ArgumentAxis,
    BarSeries,
    Chart,
    Legend,
    ScatterSeries,
    Title,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';

import Paper from '@material-ui/core/Paper';
import { ValueScale } from '@devexpress/dx-react-chart';

export interface IChartData {
    colName: string,
    time: number,
    space: number,
    // calls: number
}

interface IStateProps {
    title: string,
    data: IChartData[],
    timeUnit: string
}

class Charts extends React.Component<IStateProps> {
    public constructor(props: IStateProps) {
        super(props)
    }

    public render() {
        return (
            <Paper>
                <Chart data={this.props.data}>
                    <Title text={this.props.title} />
                    <Legend />
                    <ValueScale name="time" />
                    <ValueScale name="space" />

                    <ArgumentAxis />

                    <ValueAxis scaleName="time" showGrid={false} showLine={true} showTicks={true} showLabels={true} />
                    <ValueAxis scaleName="space" position="right" showGrid={false} showLine={true} showTicks={true} />

                    <BarSeries
                        name={`Time complexity(${this.props.timeUnit})`}
                        valueField="time"
                        argumentField="colName"
                        scaleName="time"
                    />

                    <ScatterSeries
                        name="Space complexity"
                        valueField="space"
                        argumentField="colName"
                        scaleName="space"
                        point={{
                            size: 10
                        }}
                    />
                </Chart>
            </Paper>
        );
    }
}

export default Charts;
