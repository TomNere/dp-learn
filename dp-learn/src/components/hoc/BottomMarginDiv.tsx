// author: Tomáš Nereča, 2019

import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type AllProps =
    IBottomedDivProps &
    WithStyles<typeof styles>;

interface IBottomedDivProps {
    children: ReactNode
}

const styles = (theme: Theme) => createStyles({
    bottomMargin: {
        marginBottom: theme.spacing.unit * 2,
    },
});

// Div with bottom margin
class BottomMarginDiv extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.bottomMargin}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(BottomMarginDiv);
