import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { ReactNode } from 'react';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    children: ReactNode[]
}

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    bottomMargin: {
        marginBottom: theme.spacing.unit * 2,
    },
});


class FlexRow extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props;

        return (
            <Grid className={[classes.container, classes.bottomMargin].join(' ')}>
                {this.props.children}
            </Grid>
        );
    }
}

export default withStyles(styles)(FlexRow);
