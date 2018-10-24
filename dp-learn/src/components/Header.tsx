import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../resources/dp_transparent.png';
import myTheme from '../styles/index';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: 1,
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: myTheme.palette.primary.main
    },
    logo: {
        marginRight: '20px'
    }
});


class Header extends React.Component<AllProps> {
    public static defaultProps: any = {
        location: {}
    }

    public render() {
        const { classes } = this.props;
        const welcomePage = (location.pathname === "/");
        return (
            <AppBar position="absolute" className={classes.appBar}>
                <div>
                    {!welcomePage &&
                        <Toolbar>
                            <span className={classes.logo}>
                            <img src={logo} height='50' width='50'/>
                            </span>
                            <Typography variant="h6" color="inherit" noWrap={true}>
                                Dynamic programming
                            </Typography>
                        </Toolbar>
                    }
                </div>

            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);