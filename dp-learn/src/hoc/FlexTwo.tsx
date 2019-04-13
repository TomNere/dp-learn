import * as React from 'react';

import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type AllProps =
    IFlexZeroProps &
    WithStyles<typeof styles>;

interface IFlexZeroProps {
    children: ReactNode
}

const styles = () => createStyles({
    flexChild: {
        flex: 2
    },
});

// Container with flex row displayed content and bottom margin
// Takes multiple children
class FlexTwo extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.flexChild}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(FlexTwo);
