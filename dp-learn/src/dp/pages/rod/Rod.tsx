import * as React from 'react';

import RodDemo from './RodDemo';
import RodStats from './RodStats';
import RodTheory from './RodTheory';
import TabMenu from 'src/hoc/TabMenu';

class Rod extends React.Component {
    public render() {
        return (
            <TabMenu theory={<RodTheory />} demo={<RodDemo />} charts={<RodStats />} pageName='rod' />
        );
    }
}

export default Rod;
