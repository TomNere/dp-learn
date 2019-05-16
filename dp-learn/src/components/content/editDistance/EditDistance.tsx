// author: Tomáš Nereča, 2019

import * as React from 'react';

import EditDistanceDemo from './EditDistanceDemo';
import EditDistanceStats from './EditDistanceStats';
import EditDistanceTheory from './EditDistanceTheory';
import TabMenu from 'src/components/hoc/TabMenu';

// Main component for Edit Distance problem
class EditDistance extends React.Component {
    public render() {
        return (
            <TabMenu theory={<EditDistanceTheory />} demo={<EditDistanceDemo />} charts={<EditDistanceStats />} pageName='editDistance' />
        );
    }
}

export default EditDistance;
