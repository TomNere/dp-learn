import * as React from 'react';

import TabMenu from 'src/components/hoc/TabMenu';
import TreeDemo from './TreeDemo';
import TreeStats from './TreeStats';
import TreeTheory from './TreeTheory';

// Main component for Optimal binary search tree problem
class Tree extends React.Component {
    public render() {
        return (
            <TabMenu theory={<TreeTheory />} demo={<TreeDemo />} charts={<TreeStats />} pageName='tree' />
        );
    }
}

export default Tree;
