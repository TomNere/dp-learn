import * as React from 'react';

import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Cookies from 'universal-cookie';
import PaddingDiv from './PaddingDiv';
import myTheme from 'src/styles/index';
import { strings } from 'src/strings/languages';

type AllProps =
    ITabMenuProps &
    WithStyles<typeof styles>;

interface ITabMenuProps {
    theory: React.ReactNode,
    demo: React.ReactNode,
    charts: React.ReactNode,
    pageName: string
}

interface ITabMenuState {
    selected: number
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    padding: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
    },
    whiteBackground: {
        backgroundColor: 'white'
    },
    blueBackground: {
        backgroundColor: myTheme.palette.secondary.main
    }
});

// Tab menu with 3 tabs: theory, demo and charts
// Takes 3 children
class TabMenu extends React.Component<AllProps, ITabMenuState> {
    private cookies = new Cookies();
    public constructor(props: AllProps) {
        super(props);
        const selected = this.cookies.get(`${this.props.pageName}Selected`);
        if (selected !== undefined) {
            this.state = {
                selected: +selected     // Conversion to number
            }
        }
        else {
            this.state = {
                selected: 0
            }
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Tabs value={this.state.selected} variant={'fullWidth'} onChange={this.handleTabChange} classes={{indicator: classes.whiteBackground}} >
                        <Tab className={classes.blueBackground} label={strings.global.theory} />
                        <Tab className={classes.blueBackground} label={strings.global.demo} />
                        <Tab className={classes.blueBackground} label={strings.global.stats} />
                    </Tabs>
                </AppBar>
                <div className={classes.padding}>
                    {this.state.selected === 0 && <PaddingDiv> {this.props.theory} </PaddingDiv>}
                    {this.state.selected === 1 && <PaddingDiv> {this.props.demo}   </PaddingDiv>}
                    {this.state.selected === 2 && <PaddingDiv> {this.props.charts} </PaddingDiv>}
                </div>
            </div>
        );
    }

    private handleTabChange = (e: any, selected: number) => {
        this.cookies.set(`${this.props.pageName}Selected`, selected);
        this.setState({ selected })
    };
}

export default withStyles(styles)(TabMenu);
