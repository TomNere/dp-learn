import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { ReactNode } from 'react';

type AllProps =
    IFlexRowContainerProps &
    WithStyles<typeof styles>;

interface IFlexRowContainerProps {
    children: ReactNode[]
}

const styles = (theme: Theme) => createStyles({
    flexRowContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    bottomMargin: {
        marginBottom: theme.spacing.unit * 2,
    },
});

// Container with flex row displayed content and bottom margin
// Takes multiple children
class FlexRowContainer extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props;
        return (
            <Grid className={[classes.flexRowContainer, classes.bottomMargin].join(' ')}>
                {this.props.children}
            </Grid>
        );
    }
}

export default withStyles(styles)(FlexRowContainer);
