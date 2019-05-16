// author: Tomáš Nereča, 2019

import * as React from 'react';

import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type AllProps =
    IFlexChildProps &
    WithStyles<typeof styles>;

interface IFlexChildProps {
    children: ReactNode
}

const styles = () => createStyles({
    flexChild: {
        flex: 1,
        width: '50%'
    },
});

// Container with flex row displayed content and width: '50%'
class FlexOne extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.flexChild}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(FlexOne);
