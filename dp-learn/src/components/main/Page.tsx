import * as React from 'react';

import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import MenuHeader, { IOnLanguageChangeProps } from './MenuHeader';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Coins from 'src/dp/pages/coins/Coins';
import EditDistance from 'src/dp/pages/editDistance/EditDistance';
import Rod from 'src/dp/pages/rod/Rod';
import Substring from 'src/dp/pages/substring/Substring';
import Tree from 'src/dp/pages/tree/Tree';
import myTheme from '../../styles/index';
import { strings } from 'src/strings/languages';

// import Substring from './examples/Substring';

type AllProps =
    IOnLanguageChangeProps &
    WithStyles<typeof styles>;

type selectedItem = 'aboutDP' | 'coins' | 'rod' | 'substring' | 'editDistance' | 'tree';

interface IPageState {
    selected: selectedItem
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        minHeight: '100vh'
    },
    noPadding: {
        padding: 0
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

// The only one page of the app (this app is an single page app)
// Consist of left menu and right window with content
class Page extends React.Component<AllProps, IPageState> {
    public constructor(props: AllProps) {
        super(props);
        this.state = {
            selected: 'aboutDP'
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {/* Left menu */}
                <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
                    <div className={classes.toolbar} />
                    <MenuHeader onLanguageChange={this.props.onLanguageChange} />
                    <List className={classes.noPadding}>
                        {/* About DP */}
                        <ListItem className={this.isSelected('aboutDP', true)} button={true} onClick={this.handleSelectHome}>
                            <ListItemText classes={{ primary: this.isSelected('aboutDP', false) }} primary={strings.menu.coins} />
                        </ListItem>
                        {/* Coins */}
                        <ListItem className={this.isSelected('coins', true)} button={true} onClick={this.handleSelectCoins}>
                            <ListItemText classes={{ primary: this.isSelected('coins', false) }} primary={strings.menu.coins} />
                        </ListItem>
                        {/* Substring */}
                        <ListItem className={this.isSelected('substring', true)} button={true} onClick={this.handleSelectSubstring}>
                            <ListItemText classes={{ primary: this.isSelected('substring', false) }} primary={strings.menu.substring} />
                        </ListItem>
                        {/* Rod */}
                        <ListItem className={this.isSelected('rod', true)} button={true} onClick={this.handleSelectRod}>
                            <ListItemText classes={{ primary: this.isSelected('rod', false) }} primary={strings.menu.rod} />
                        </ListItem>
                        {/* Edit distance */}
                        <ListItem className={this.isSelected('editDistance', true)} button={true} onClick={this.handleSelectEditDistance}>
                            <ListItemText classes={{ primary: this.isSelected('editDistance', false) }} primary={strings.menu.editDistance} />
                        </ListItem>
                        {/* Optimal search binary tree */}
                        <ListItem className={this.isSelected('tree', true)} button={true} onClick={this.handleSelectTree}>
                            <ListItemText classes={{ primary: this.isSelected('tree', false) }} primary={strings.menu.tree} />
                        </ListItem>
                    </List>
                </Drawer>
                {/* Right window */}
                <main className={classes.content}>
                    {this.state.selected === 'aboutDP' && <Coins />}
                    {this.state.selected === 'coins' && <Coins />}
                    {this.state.selected === 'rod' && <Rod />}
                    {this.state.selected === 'substring' && <Substring />}
                    {this.state.selected === 'editDistance' && <EditDistance />}
                    {this.state.selected === 'tree' && <Tree />}
                </main>
            </div>
        );
    }

    // Check if item is selected
    private isSelected = (which: selectedItem, isItem: boolean) => {
        const { classes } = this.props;

        if (this.state.selected === which) {
            return isItem ? classes.selectedItem : classes.selectedText
        }
        return '';
    }

    // Handlers for item selection

    private handleSelectHome = () => {
        this.setState({ selected: 'aboutDP' });
    }

    private handleSelectCoins = () => {
        this.setState({ selected: 'coins' });
    }

    private handleSelectRod = () => {
        this.setState({ selected: 'rod' });
    }

    private handleSelectSubstring = () => {
        this.setState({ selected: 'substring' });
    }

    private handleSelectEditDistance = () => {
        this.setState({ selected: 'editDistance' });
    }

    private handleSelectTree = () => {
        this.setState({ selected: 'tree' });
    }
}

export default withStyles(styles)(Page);
