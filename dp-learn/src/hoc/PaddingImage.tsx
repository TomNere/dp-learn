import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type AllProps =
    ITableImgProps &
    WithStyles<typeof styles>;

interface ITableImgProps {
    children: ReactNode
}

const styles = (theme: Theme) => createStyles({
    margin: {
        paddingLeft: 40,    // Same as ul list padding
        paddingRight: 40,    // Same as left
        marginBottom: theme.spacing.unit * 3,
    }
});

// Custom title
// Takes 1 child
class PaddingImage extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.margin}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(PaddingImage);
