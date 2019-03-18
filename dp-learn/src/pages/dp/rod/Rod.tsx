import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import RodCharts from './RodCharts';
import RodDemo from './RodDemo';
import RodTheory from './RodTheory';
import TabMenu from 'src/containers/TabMenu';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Rod extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <TabMenu theory={<RodTheory />} demo={<RodDemo />} charts={<RodCharts />} />
            </div>
        );
    }
}

export default withStyles(styles)(Rod);
