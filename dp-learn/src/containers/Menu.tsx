import * as React from 'react';

import { Drawer, List, Theme, WithStyles, createStyles, withStyles } from '@material-ui/core';
import { ListItem, ListItemText } from '@material-ui/core';

import myTheme from '../styles/index';
import { strings } from 'src/strings/languages';

type AllProps =
    IMenuProps &
    WithStyles<typeof styles>;

interface IMenuProps {
    history: any
}

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
    selectedItem: {
        backgroundColor: myTheme.palette.primary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.primary.dark,
        }
    },
    selectedText: {
        color: 'white',
    },
});

class Menu extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
    }
    
    public render() {
        const { classes } = this.props;
        return (
            <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
                <div className={classes.toolbar} />
                <List>
                    <div>
                        {/* Coins */}
                        <ListItem className={this.isSelected('/mainpage/coins', true)} button={true} onClick={this.showCoins}>
                            <ListItemText classes={{ primary: this.isSelected('/mainpage/coins', false) }} primary={strings.menu.coins} />
                        </ListItem>
                        {/* Substring */}
                        <ListItem className={this.isSelected('/mainpage/substring', true)} button={true} onClick={this.showSubstring}>
                            <ListItemText classes={{ primary: this.isSelected('/mainpage/substring', false) }} primary={strings.menu.substring} />
                        </ListItem>
                    </div>
                </List>
            </Drawer>
        );
    }

    private isSelected = (which: string, isItem: boolean) => {
        const { pathname } = this.props.history.location;
        const { classes } = this.props;

        if (pathname === which) {
            return isItem ? classes.selectedItem : classes.selectedText
        }
        return '';
    }

    private showCoins = () => {
        this.props.history.push("/mainpage/coins");
    }

    private showSubstring = () => {
        this.props.history.push("/mainpage/substring");
    }
}

export default withStyles(styles)(Menu);
