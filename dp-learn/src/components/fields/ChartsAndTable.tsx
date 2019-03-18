import * as React from 'react';

import { ISpaceChartData, IStatsTableData, ITimeChartData } from 'src/types';

import Centered from 'src/containers/Centered';
import SpaceChart from '../charts/SpaceChart';
import StatsTable from '../tables/StatsTable';
import TimeChart from '../charts/TimeChart';

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
            <React.Fragment>

                {
                    this.props.visible &&
                    <React.Fragment>
                        <TimeChart data={this.props.timeStats} />
                        <SpaceChart data={this.props.spaceStats} />
                        <Centered>
                            <StatsTable data={this.props.tableStats} />
                        </Centered>
                    </React.Fragment>
                }
            </React.Fragment>

        );
    }
}

export default ChartsAndTable;
