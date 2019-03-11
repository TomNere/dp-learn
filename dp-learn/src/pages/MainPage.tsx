import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { IHistoryProps } from './Welcome';
import MainWindow from '../containers/MainWindow';
import Menu from '../containers/Menu';

// import Substring from './examples/Substring';

type AllProps =
    IHistoryProps &
    WithStyles<typeof styles>;

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
    minHeight: {
        minHeight: 72
    }
});


class MainPage extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {/* Left menu */}
                <Menu history={this.props.history} />
                {/* Right window */}
                <main className={classes.content}>
                    <div className={[classes.minHeight].join(' ')} />
                    <MainWindow />
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);
