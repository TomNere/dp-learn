import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import EditDistanceCharts from './EditDistanceCharts';
import EditDistanceDemo from './EditDistanceDemo';
import EditDistanceTheory from './EditDistanceTheory';
import TabMenu from 'src/containers/TabMenu';

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
                <TabMenu theory={<EditDistanceTheory />} demo={<EditDistanceDemo />} charts={<EditDistanceCharts />} />
            </div>
        );
    }
}

export default withStyles(styles)(EditDistance);
