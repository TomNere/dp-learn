import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { IProps } from './Welcome';
import Menu from './Menu';
import WindowContainer from './WindowContainer';

// import Substring from './examples/Substring';

type AllProps =
    IProps &
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        minHeight: '100vh'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        // minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});


class MainPage extends React.Component<AllProps> {
    public static defaultProps: IProps = {
        history: {}
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Menu history={this.props.history}/>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <WindowContainer />
                    </main>
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);
