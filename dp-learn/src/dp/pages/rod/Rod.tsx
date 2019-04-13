import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import RodDemo from './RodDemo';
import RodStats from './RodStats';
import RodTheory from './RodTheory';
import TabMenu from 'src/hoc/TabMenu';

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
                <TabMenu theory={<RodTheory />} demo={<RodDemo />} charts={<RodStats />} />
            </div>
        );
    }
}

export default withStyles(styles)(Rod);
