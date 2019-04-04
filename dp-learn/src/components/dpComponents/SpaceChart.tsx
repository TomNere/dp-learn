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
import { dpColor, recColor } from 'src/styles/colors';

import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { strings } from 'src/strings/languages';

type AllProps =
    ISpaceChartProps &
    WithStyles<typeof styles>;

interface ISpaceChartProps {
    data: ISpaceChartData[],
}

export interface ISpaceChartData {
    name: string,
    rec: number,
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

// Chart showing space complexity stats
class SpaceChart extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { data, classes } = this.props;
        const { global, components } = strings;
        return (
            <Paper className={classes.bottomMargin}>
                <Typography align={'center'} className={classes.title} variant={'h6'}>
                    {components.spaceComplex}
                </Typography>
                <Chart data={data}>
                    <ValueScale name='rec' />
                    <ArgumentScale />
                    <ArgumentAxis />

                    <ValueAxis scaleName='rec' showGrid={false} showLine={true} showTicks={true} />

                    <LineSeries
                        name={`${global.recursiveSolution}`}
                        valueField='rec'
                        argumentField='name'
                        scaleName='rec'
                        color={recColor}
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
}

export default withStyles(styles)(SpaceChart);
