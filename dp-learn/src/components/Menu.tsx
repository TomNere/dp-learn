import * as Icons from '@material-ui/icons';
import * as React from 'react';

import { Drawer, List, Theme, WithStyles, createStyles, withStyles } from '@material-ui/core';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import myTheme from '../styles/index';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: 440,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: myTheme.palette.primary.main
    },
    drawerPaper: {
        position: 'relative',
        width: 240,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});

class Menu extends React.Component<AllProps> {

    public render() {
        const { classes } = this.props;

        return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                <div>
                    <ListItem button={true}>
                        <ListItemIcon>
                            <Icons.Inbox />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                    <ListItem button={true}>
                        <ListItemIcon>
                            <Icons.Satellite />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItem>
                </div>
            </List>
        </Drawer>
        );
    }
}

export default withStyles(styles)(Menu);
