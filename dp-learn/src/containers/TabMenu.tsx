import * as React from 'react';

import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import TabContainer from 'src/containers/TabContainer';
import { strings } from 'src/strings/languages';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface ITabMenuState {
    selected: number
}

interface IStateProps {
    theory: React.ReactNode,
    demo: React.ReactNode,
    charts: React.ReactNode,
}


const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    padding: {
        padding: theme.spacing.unit * 3
    },
    appBar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: "#105c9b"
    },
});

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
                    <Tabs value={this.state.selected} variant={'fullWidth'} onChange={this.handleChange}>
                        <Tab label={strings.components.theory} />
                        <Tab label={strings.components.demo} />
                        <Tab label={strings.components.charts} />
                    </Tabs>
                </AppBar>
                <div className={classes.padding}>
                    {this.state.selected === 0 && <TabContainer> {this.props.theory} </TabContainer>}
                    {this.state.selected === 1 && <TabContainer> {this.props.demo}   </TabContainer>}
                    {this.state.selected === 2 && <TabContainer> {this.props.charts} </TabContainer>}
                </div>
            </div>
        );
    }

    private handleChange = (e: any, selected: number) => {
        this.setState({ selected })
    };
}

export default withStyles(styles)(TabMenu);
