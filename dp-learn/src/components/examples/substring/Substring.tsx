import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import CoinsCharts from '../coins/CoinsCharts';
import SubstringDemo from './SubstringDemo';
import SubstringTheory from './SubstringTheory';
import TabMenu from 'src/components/hoc/presentational/fields/TabMenu';

type AllProps =
    WithStyles<typeof styles>;

interface ISubstringState {
    selected: number
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Substring extends React.Component<AllProps, ISubstringState> {
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
                <TabMenu theory={<SubstringTheory />} demo={<SubstringDemo />} charts={<CoinsCharts />} />
            </div>
        );
    }
}

export default withStyles(styles)(Substring);
