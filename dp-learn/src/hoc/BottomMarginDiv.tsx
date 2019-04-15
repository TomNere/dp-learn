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

// Container with flex row displayed content and bottom margin
// Takes multiple children
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
