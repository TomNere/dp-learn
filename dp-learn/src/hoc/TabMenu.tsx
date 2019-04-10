import * as React from 'react';

import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import ContainerWithPadding from './ContainerWithPadding';
import { strings } from 'src/strings/languages';

type AllProps =
    ITabMenuProps &
    WithStyles<typeof styles>;

interface ITabMenuProps {
    theory: React.ReactNode,
    demo: React.ReactNode,
    charts: React.ReactNode,
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
    }
});

// Tab menu with 3 tabs: theory, demo and charts
// Takes 3 children
class TabMenu extends React.Component<AllProps, ITabMenuState> {
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
                <AppBar className={classes.appBar} position="static">
                    <Tabs value={this.state.selected} variant={'fullWidth'} onChange={this.handleTabChange} classes={{indicator: classes.whiteBackground}} >
                        <Tab label={strings.components.theory} />
                        <Tab label={strings.components.demo} />
                        <Tab label={strings.components.charts} />
                    </Tabs>
                </AppBar>
                <div className={classes.padding}>
                    {this.state.selected === 0 && <ContainerWithPadding> {this.props.theory} </ContainerWithPadding>}
                    {this.state.selected === 1 && <ContainerWithPadding> {this.props.demo}   </ContainerWithPadding>}
                    {this.state.selected === 2 && <ContainerWithPadding> {this.props.charts} </ContainerWithPadding>}
                </div>
            </div>
        );
    }

    private handleTabChange = (e: any, selected: number) => {
        this.setState({ selected })
    };
}

export default withStyles(styles)(TabMenu);
