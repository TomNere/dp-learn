import * as React from 'react';

import CoinsDemo from './CoinsDemo';
import CoinsStats from './CoinsStats';
import CoinsTheory from './CoinsTheory';
import TabMenu from 'src/components/hoc/TabMenu';

// Main component for Minimum number of coins problem
class Coins extends React.Component {
    public render() {
        return (
            <TabMenu theory={<CoinsTheory />} demo={<CoinsDemo />} charts={<CoinsStats />} pageName='coins' />
        );
    }
}

export default Coins;
