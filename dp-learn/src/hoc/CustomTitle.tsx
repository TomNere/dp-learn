import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';
import { Typography } from '@material-ui/core';

type AllProps =
    ITitleProps &
    WithStyles<typeof styles>;

interface ITitleProps {
    children: ReactNode,
    variant: 'h5' | 'h6'
}

const styles = (theme: Theme) => createStyles({
    margin: {
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
    },
});

// Custom title
// Takes 1 child
class CustomTitle extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.variant === 'h5' &&
                    <Typography variant={'h5'} className={classes.margin}>
                        {this.props.children}
                    </Typography>
                }
                {this.props.variant === 'h6' &&
                    <Typography variant={'h6'} className={classes.margin}>
                        {this.props.children}
                    </Typography>
                }
            </div>
        );
    }
}

export default withStyles(styles)(CustomTitle);
