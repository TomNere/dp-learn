import * as React from 'react';

import SubstringCharts from './SubstringStats';
import SubstringDemo from './SubstringDemo';
import SubstringTheory from './SubstringTheory';
import TabMenu from 'src/components/hoc/TabMenu';

// Main component for Longest common substring problem
class Substring extends React.Component {
    public render() {
        return (
            <TabMenu theory={<SubstringTheory />} demo={<SubstringDemo />} charts={<SubstringCharts />} pageName='substring' />
        );
    }
}

export default Substring;
