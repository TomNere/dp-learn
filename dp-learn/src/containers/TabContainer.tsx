import * as React from 'react';

import { Typography } from '@material-ui/core';

interface IStateProps {
    children: React.ReactNode
}

class TabContainer extends React.Component<IStateProps> {

    public render() {
        return (
            <Typography component="div" style={{ padding: 8 * 3 }}>
                {this.props.children}
            </Typography>
        );
    }
};

export default TabContainer;
