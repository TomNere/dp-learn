import * as React from 'react';

import { ISpaceChartData, IStatsTableData, ITimeChartData } from 'src/types';

import SpaceChart from './SpaceChart';
import StatsTable from './StatsTable';
import TimeChart from './TimeChart';

interface IStateProps {
    visible: boolean,
    timeStats: ITimeChartData[];
    spaceStats: ISpaceChartData[];
    tableStats: IStatsTableData[];
}

class ChartsAndTable extends React.Component<IStateProps> {
    public constructor(props: IStateProps) {
        super(props)
    }

    public render() {
        return (
            <div>
            {
                this.props.visible &&
                    <div>
                        <div>
                            <TimeChart data={this.props.timeStats} />
                            <SpaceChart data={this.props.spaceStats} />
                            <StatsTable data={this.props.tableStats} />
                        </div>
                    </div>
            }
            </div>
        );
    }
}

export default ChartsAndTable;
