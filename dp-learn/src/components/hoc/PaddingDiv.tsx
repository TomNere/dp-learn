import * as React from 'react';

import { WithStyles, createStyles, withStyles } from '@material-ui/core';

type AllProps =
    IPaddingDivProps &
    WithStyles<typeof styles>;

interface IPaddingDivProps {
    children: React.ReactNode
}

const styles = () => createStyles({
    padding: {
        padding: 8 * 3
    },
});

// Div with padding
class PaddingDiv extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.padding}>
                {this.props.children}
            </div>
        );
    }
};

export default withStyles(styles)(PaddingDiv);
