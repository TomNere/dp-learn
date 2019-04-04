import * as React from 'react';

import { Theme, Typography, WithStyles, createStyles, withStyles } from '@material-ui/core';

type AllProps =
    IContainerWithPaddingProps &
    WithStyles<typeof styles>;

interface IContainerWithPaddingProps {
    children: React.ReactNode
}

const styles = (theme: Theme) => createStyles({
    containerWithPadding: {
        padding: 8 * 3
    },
});

// Simple container with padding
class ContainerWithPadding extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
    }
    
    public render() {
        const { classes } = this.props;
        return (
            <Typography component="div" className={classes.containerWithPadding}>
                {this.props.children}
            </Typography>
        );
    }
};

export default withStyles(styles)(ContainerWithPadding);
