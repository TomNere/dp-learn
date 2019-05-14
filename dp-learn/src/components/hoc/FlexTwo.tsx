import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type AllProps =
    IFlexZeroProps &
    WithStyles<typeof styles>;

interface IFlexZeroProps {
    children: ReactNode
}

const styles = (theme: Theme) => createStyles({
    flexChild: {
        flex: 2,
        marginLeft: theme.spacing.unit * 2
    },
});

// Container with flex value 2 and left margin
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
