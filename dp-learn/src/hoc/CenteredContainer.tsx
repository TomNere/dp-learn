import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { ReactNode } from 'react';

type AllProps =
    ICenteredContainerProps &
    WithStyles<typeof styles>;

interface ICenteredContainerProps {
    children: ReactNode
}

const styles = (theme: Theme) => createStyles({
    centeredContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
});

// Container with centered content
// Takes 1 child
class CenteredContainer extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.centeredContainer}>
                {this.props.children}
            </Grid>
        );
    }
}

export default withStyles(styles)(CenteredContainer);
