import * as React from 'react';

import { Drawer, List, Theme, WithStyles, createStyles, withStyles } from '@material-ui/core';
import { ListItem, ListItemText } from '@material-ui/core';

import { IProps } from './Welcome';

type AllProps =
    IProps &
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
    public static defaultProps: IProps = {
        history: {}
    }

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
                    <ListItem button={true} onClick={this.showCoins}>
                        <ListItemText primary="Minimum coins" />
                    </ListItem>
                    <ListItem button={true} onClick={this.showSubstring}>
                        <ListItemText primary="Common substring" />
                    </ListItem>
                </div>
            </List>
        </Drawer>
        );
    }

    private showCoins = () => {
        this.props.history.push("/mainpage/coins");
    }

    private showSubstring = () => {
        this.props.history.push("/mainpage/substring");
    }
}

export default withStyles(styles)(Menu);
