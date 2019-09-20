// author: Tomáš Nereča, 2019

import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';
import { Typography } from '@material-ui/core';

type AllProps =
    ITitleProps &
    WithStyles<typeof styles>;

interface ITitleProps {
    children: ReactNode,
    variant: 'h1' | 'h2' | 'h5' | 'h6'
}

const styles = (theme: Theme) => createStyles({
    h1size: {
        fontSize: 32,
        fontWeight: 400
    },
    h2size: {
        fontSize: 28,
        fontWeight: 400
    },
});

// Custom styled Typography
class CustomTitle extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div>
                {/* To boost search engines */}
                {this.props.variant === 'h1' &&
                    <h1 className={classes.h1size}>
                            {this.props.children}
                    </h1>
                }
                {/* To boost search engines */}
                {this.props.variant === 'h2' &&
                    <h2 className={classes.h2size}>
                            {this.props.children}
                    </h2>
                }
                {(this.props.variant === 'h5' || this.props.variant === 'h6') &&
                    <Typography variant={this.props.variant}>
                        {this.props.children}
                    </Typography>
                }
            </div>
        );
    }
}

export default withStyles(styles)(CustomTitle);
