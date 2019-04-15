import * as React from 'react';

import EditDistanceDemo from './EditDistanceDemo';
import EditDistanceStats from './EditDistanceStats';
import EditDistanceTheory from './EditDistanceTheory';
import TabMenu from 'src/hoc/TabMenu';

class EditDistance extends React.Component {
    public render() {
        return (
            <TabMenu theory={<EditDistanceTheory />} demo={<EditDistanceDemo />} charts={<EditDistanceStats />} pageName='editDistance' />
        );
    }
}

export default EditDistance;
