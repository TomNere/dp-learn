import * as React from 'react';

import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import Header, { IOnLanguageChangeProps } from './Header';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Coins from './pages/dp/coins/Coins';
import EditDistance from './pages/dp/editDistance/EditDistance';
import Rod from './pages/dp/rod/Rod';
import Substring from './pages/dp/substring/Substring';
import Tree from './pages/dp/tree/Tree';
import myTheme from './styles/index';
import { strings } from './strings/languages';

// import Substring from './examples/Substring';

type AllProps =
    IOnLanguageChangeProps &
    WithStyles<typeof styles>;

type selectedPage = 'home' | 'coins' | 'rod' | 'substring' | 'editDistance' | 'tree';

interface IPageState {
    selected: selectedPage
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        minHeight: '100vh'
    },
    content: {
        flexGrow: 1,
        // minWidth: 0, // So the Typography noWrap works
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
    drawerPaper: {
        position: 'relative',
        width: 240,
    },
});


class MainPage extends React.Component<AllProps, IPageState> {
    public constructor(props: AllProps) {
        super(props);
        this.state = {
            selected: 'home'
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {/* Left menu */}
                <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
                    <div className={classes.toolbar} />
                    <Header onLanguageChange={this.props.onLanguageChange} />
                    <List>
                        {/* Home */}
                        <ListItem className={this.isSelected('home', true)} button={true} onClick={this.selectHome}>
                            <ListItemText classes={{ primary: this.isSelected('home', false) }} primary={strings.menu.coins} />
                        </ListItem>
                        {/* Coins */}
                        <ListItem className={this.isSelected('coins', true)} button={true} onClick={this.selectCoins}>
                            <ListItemText classes={{ primary: this.isSelected('coins', false) }} primary={strings.menu.coins} />
                        </ListItem>
                        {/* Substring */}
                        <ListItem className={this.isSelected('substring', true)} button={true} onClick={this.selectSubstring}>
                            <ListItemText classes={{ primary: this.isSelected('substring', false) }} primary={strings.menu.substring} />
                        </ListItem>
                        {/* Rod */}
                        <ListItem className={this.isSelected('rod', true)} button={true} onClick={this.selectRod}>
                            <ListItemText classes={{ primary: this.isSelected('rod', false) }} primary={strings.menu.rod} />
                        </ListItem>
                        {/* Edit distance */}
                        <ListItem className={this.isSelected('editDistance', true)} button={true} onClick={this.selectEditDistance}>
                            <ListItemText classes={{ primary: this.isSelected('editDistance', false) }} primary={strings.menu.editDistance} />
                        </ListItem>
                        {/* Optimalized search binary tree */}
                        <ListItem className={this.isSelected('tree', true)} button={true} onClick={this.selectTree}>
                            <ListItemText classes={{ primary: this.isSelected('tree', false) }} primary={strings.menu.tree} />
                        </ListItem>
                    </List>
                </Drawer>
                {/* Right window */}
                <main className={classes.content}>
                    {this.state.selected === 'home' && <Coins />}
                    {this.state.selected === 'coins' && <Coins />}
                    {this.state.selected === 'rod' && <Rod />}
                    {this.state.selected === 'substring' && <Substring />}
                    {this.state.selected === 'editDistance' && <EditDistance />}
                    {this.state.selected === 'tree' && <Tree />}
                </main>
            </div>
        );
    }

    private isSelected = (which: selectedPage, isItem: boolean) => {
        const { classes } = this.props;

        if (this.state.selected === which) {
            return isItem ? classes.selectedItem : classes.selectedText
        }
        return '';
    }

    private selectHome = () => {
        this.setState({ selected: 'home' });
    }

    private selectCoins = () => {
        this.setState({ selected: 'coins' });
    }

    private selectRod = () => {
        this.setState({ selected: 'rod' });
    }

    private selectSubstring = () => {
        this.setState({ selected: 'substring' });
    }

    private selectEditDistance = () => {
        this.setState({ selected: 'editDistance' });
    }

    private selectTree = () => {
        this.setState({ selected: 'tree' });
    }
}

export default withStyles(styles)(MainPage);
