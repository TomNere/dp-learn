import * as React from 'react';

import TabMenu from 'src/hoc/TabMenu';
import TreeDemo from './TreeDemo';
import TreeStats from './TreeStats';
import TreeTheory from './TreeTheory';

class Tree extends React.Component {
    public render() {
        return (
            <TabMenu theory={<TreeTheory />} demo={<TreeDemo />} charts={<TreeStats />} pageName='tree' />
        );
    }
}

export default Tree;
