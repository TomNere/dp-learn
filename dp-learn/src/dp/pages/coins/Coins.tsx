import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import CoinsDemo from './CoinsDemo';
import CoinsStats from './CoinsStats';
import CoinsTheory from './CoinsTheory';
import TabMenu from 'src/hoc/TabMenu';

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

// Main component for Minimum number of coins problem
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
                <TabMenu theory={<CoinsTheory />} demo={<CoinsDemo />} charts={<CoinsStats />} />
            </div>
        );
    }
}

export default withStyles(styles)(Coins);
