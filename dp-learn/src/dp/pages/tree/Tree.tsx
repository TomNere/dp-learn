import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import TabMenu from 'src/hoc/TabMenu';
import TreeCharts from './TreeCharts';
import TreeDemo from './TreeDemo';
import TreeTheory from './TreeTheory';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Tree extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <TabMenu theory={<TreeTheory />} demo={<TreeDemo />} charts={<TreeCharts />} />
            </div>
        );
    }
}

export default withStyles(styles)(Tree);
