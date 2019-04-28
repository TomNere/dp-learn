import * as React from 'react';

import { Divider, Drawer, List, ListItem, ListItemText, } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Coins from 'src/components/content/coins/Coins';
import Cookies from 'universal-cookie';
import EditDistance from 'src/components/content/editDistance/EditDistance';
import Intro from 'src/components/content/Intro';
import MenuHeader from './specialized/MenuHeader';
import Rod from 'src/components/content/rod/Rod';
import Substring from 'src/components/content/substring/Substring';
import Tree from 'src/components/content/tree/Tree';
import { darkColor } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/strings';

// import Substring from './examples/Substring';

type AllProps =
    WithStyles<typeof styles>;

type selectedItem = 'intro' | 'coins' | 'rod' | 'substring' | 'editDistance' | 'tree';

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
    },
    toolbar: theme.mixins.toolbar,
    selectedItem: {
        backgroundColor: darkColor,
        '& span': {
            color: theme.palette.common.white,
        },
        "&:focus": {
            backgroundColor: darkColor,
            '& span': {
                color: theme.palette.common.white,
            },
        },
        "&:hover": {
            backgroundColor: darkColor,
        },
    },
    nonSelectedItem: {
        "&:hover": {
            backgroundColor: darkColor,
            '& span': {
                color: theme.palette.common.white,
            },
        },
    },
    drawerPaper: {
        position: 'relative',
        width: 240,
    },
});

// The only one page of the app (this app is an single page app)
// Consist of left menu and right window with content
class Page extends React.Component<AllProps, IPageState> {
    private cookies = new Cookies();

    public constructor(props: AllProps) {
        super(props);
        const selected = this.cookies.get('selected');

        if (selected !== undefined) {
            this.state = {
                selected
            }
        }
        else {
            this.state = {
                selected: 'intro'
            }
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {/* Left menu */}
                <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
                    <div className={classes.toolbar} />
                    <MenuHeader title={strings.global.dpLearn} onLanguageChange={this.handleLanguageChange} />
                    <List className={classes.noPadding}>
                        {/* About DP */}
                        <ListItem className={this.isSelected('intro')} button={true} onClick={this.handleSelectIntro}>
                            <ListItemText primary={strings.global.intro} />
                        </ListItem>
                        <Divider />
                        {/* Coins */}
                        <ListItem className={this.isSelected('coins')} button={true} onClick={this.handleSelectCoins}>
                            <ListItemText primary={strings.menu.coins} />
                        </ListItem>
                        <Divider />
                        {/* Rod */}
                        <ListItem className={this.isSelected('rod')} button={true} onClick={this.handleSelectRod}>
                            <ListItemText primary={strings.menu.rod} />
                        </ListItem>
                        <Divider />
                        {/* Substring */}
                        <ListItem className={this.isSelected('substring')} button={true} onClick={this.handleSelectSubstring}>
                            <ListItemText primary={strings.menu.substring} />
                        </ListItem>
                        <Divider />
                        {/* Edit distance */}
                        <ListItem className={this.isSelected('editDistance')} button={true} onClick={this.handleSelectEditDistance}>
                            <ListItemText primary={strings.menu.editDistance} />
                        </ListItem>
                        <Divider />
                        {/* Optimal search binary tree */}
                        <ListItem className={this.isSelected('tree')} button={true} onClick={this.handleSelectTree}>
                            <ListItemText primary={strings.menu.tree} />
                        </ListItem>
                    </List>
                </Drawer>
                {/* Right window */}
                <main className={classes.content}>
                    {this.state.selected === 'intro' && <Intro />}
                    {this.state.selected === 'coins' && <Coins />}
                    {this.state.selected === 'rod' && <Rod />}
                    {this.state.selected === 'substring' && <Substring />}
                    {this.state.selected === 'editDistance' && <EditDistance />}
                    {this.state.selected === 'tree' && <Tree />}
                </main>
            </div>
        );
    }

    // Handle language change
    private handleLanguageChange = () => {
        strings.getLanguage() === 'en' ? strings.setLanguage('sk') : strings.setLanguage('en');
        this.cookies.set('language', strings.getLanguage());
        this.setState({});
    }

    // Check if item is selected
    private isSelected = (which: selectedItem) => {
        const { classes } = this.props;
        return this.state.selected === which ? classes.selectedItem : classes.nonSelectedItem;
    }

    // Handlers for item selection
    private handleSelectIntro = () => {
        const selected = 'intro';
        this.cookies.set('selected', selected);
        this.setState({ selected });
    }

    private handleSelectCoins = () => {
        const selected = 'coins';
        this.cookies.set('selected', selected);
        this.setState({ selected });
    }

    private handleSelectRod = () => {
        const selected = 'rod';
        this.cookies.set('selected', selected);
        this.setState({ selected });
    }

    private handleSelectSubstring = () => {
        const selected = 'substring';
        this.cookies.set('selected', selected);
        this.setState({ selected });
    }

    private handleSelectEditDistance = () => {
        const selected = 'editDistance';
        this.cookies.set('selected', selected);
        this.setState({ selected });
    }

    private handleSelectTree = () => {
        const selected = 'tree';
        this.cookies.set('selected', selected);
        this.setState({ selected });
    }
}

export default withStyles(styles)(Page);
