import * as React from 'react';

import  SpaceChart, { ISpaceChartData } from './SpaceChart';
import StatsTable, { IStatsTableData } from './StatsTable';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core';
import TimeChart, { ITimeChartData } from './TimeChart';

import { blueColor } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/strings';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    visible: boolean,
    timeStats: ITimeChartData[];
    spaceStats: ISpaceChartData[];
    tableStats: IStatsTableData[];
    error: boolean;
}

const styles = (theme: Theme) => createStyles({
    result: {
        marginBottom: theme.spacing.unit * 2,
        "& span": {
            fontSize: theme.typography.pxToRem(24),
            color: 'white',
            backgroundColor: blueColor,
            padding: theme.spacing.unit,
        }
    },
})

// Component contains time,space charts and table
class ChartsAndTable extends React.Component<AllProps> {
    public render() {
        return (
            <div>
                {this.props.error &&
                    <div className={this.props.classes.result}>
                        <span>
                            {strings.global.invalidArg}
                        </span>
                    </div>
                }
                {this.props.visible &&
                    <div>
                        <TimeChart data={this.props.timeStats} />
                        <SpaceChart data={this.props.spaceStats} />
                        <StatsTable data={this.props.tableStats} />
                    </div>
                }
            </div>
        );
    }
}

export default withStyles(styles)(ChartsAndTable);
