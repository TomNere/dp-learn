// author: Tomáš Nereča, 2019

import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type AllProps =
    IFooterItemProps &
    WithStyles<typeof styles>;

interface IFooterItemProps {
    children: ReactNode
}

const styles = (theme: Theme) => createStyles({
    color: {
        padding: theme.spacing.unit,
        marginRight: theme.spacing.unit * 4
    },
});

// Div with bottom margin
class FooterItem extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.color}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(FooterItem);
