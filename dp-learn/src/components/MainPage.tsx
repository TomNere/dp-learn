import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Coins from './examples/Coins';
import Menu from './Menu';
import myTheme from '../styles/index';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: myTheme.palette.primary.main
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});


class MainPage extends React.Component<AllProps> {

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Menu />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Coins/>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);