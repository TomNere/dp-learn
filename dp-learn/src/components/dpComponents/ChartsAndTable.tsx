import * as React from 'react';

import SpaceChart, { ISpaceChartData } from './SpaceChart';
import StatsTable, { IStatsTableData } from './StatsTable';
import TimeChart, { ITimeChartData } from './TimeChart';

import CenteredContainer from 'src/hoc/CenteredContainer';

interface IStateProps {
    visible: boolean,
    timeStats: ITimeChartData[];
    spaceStats: ISpaceChartData[];
    tableStats: IStatsTableData[];
}

// Component contains time and space chart, table and some text
// Props are visibility, data and text
class ChartsAndTable extends React.Component<IStateProps> {
    public constructor(props: IStateProps) {
        super(props)
    }

    public render() {
        return (
            <div>
                {this.props.visible &&
                    <div>
                        <TimeChart data={this.props.timeStats} />
                        <SpaceChart data={this.props.spaceStats} />
                        <CenteredContainer>
                            <StatsTable data={this.props.tableStats} />
                        </CenteredContainer>
                        {/* TODO zhrnutie */}
                    </div>
                }
            </div>

        );
    }
}

export default ChartsAndTable;
