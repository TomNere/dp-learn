import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { ReactNode } from 'react';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    children: ReactNode
}

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    child: {
        alignSelf: 'center'
    },
});


class Centered extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props;

        return (
            <Grid className={classes.container}>
                {this.props.children}
            </Grid>
        );
    }
}

export default withStyles(styles)(Centered);
