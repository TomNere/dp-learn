import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type AllProps =
    ITitleProps &
    WithStyles<typeof styles>;

interface ITitleProps {
    children: ReactNode
}

const styles = (theme: Theme) => createStyles({
    margin: {
        marginLeft: theme.spacing.unit * 2,
    }
});

// Custom title
// Takes 1 child
class LeftMarginDiv extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.margin}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(LeftMarginDiv);
