import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import EditDistanceDemo from './EditDistanceDemo';
import EditDistanceStats from './EditDistanceStats';
import EditDistanceTheory from './EditDistanceTheory';
import TabMenu from 'src/hoc/TabMenu';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class EditDistance extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <TabMenu theory={<EditDistanceTheory />} demo={<EditDistanceDemo />} charts={<EditDistanceStats />} />
            </div>
        );
    }
}

export default withStyles(styles)(EditDistance);
