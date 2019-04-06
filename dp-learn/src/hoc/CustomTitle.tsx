import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';
import { Typography } from '@material-ui/core';

type AllProps =
    ITitleProps &
    WithStyles<typeof styles>;

interface ITitleProps {
    children: ReactNode
}

const styles = (theme: Theme) => createStyles({
    bottomMargin: {
        marginBottom: theme.spacing.unit * 2,
    }
});

// Custom title
// Takes 1 child
class CustomTitle extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                {this.props.children}
            </Typography>
        );
    }
}

export default withStyles(styles)(CustomTitle);
