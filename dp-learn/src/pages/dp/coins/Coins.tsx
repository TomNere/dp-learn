import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import CoinsCharts from 'src/pages/dp/coins/CoinsCharts';
import CoinsDemo from 'src/pages/dp/coins/CoinsDemo';
import CoinsTheory from 'src/pages/dp/coins/CoinsTheory';
import TabMenu from 'src/containers/TabMenu';

type AllProps =
    WithStyles<typeof styles>;

interface ICoinsState {
    selected: number
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Coins extends React.Component<AllProps, ICoinsState> {
    public constructor(props: AllProps) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <TabMenu theory={<CoinsTheory />} demo={<CoinsDemo />} charts={<CoinsCharts />} />
            </div>
        );
    }
}

export default withStyles(styles)(Coins);
