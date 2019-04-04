import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import SubstringCharts from './SubstringCharts';
import SubstringDemo from './SubstringDemo';
import SubstringTheory from './SubstringTheory';
import TabMenu from 'src/hoc/TabMenu';

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
                <TabMenu theory={<SubstringTheory />} demo={<SubstringDemo />} charts={<SubstringCharts />} />
            </div>
        );
    }
}

export default withStyles(styles)(Substring);
