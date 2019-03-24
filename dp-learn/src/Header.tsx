import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import myTheme from './styles/index';
import slovak from './resources/slovakFlag.png';
import { strings } from 'src/strings/languages';
import uk from './resources/ukFlag.png';

type AllProps =
    IOnLanguageChangeProps &
    WithStyles<typeof styles>;

export interface IOnLanguageChangeProps {
    onLanguageChange: any
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: 1,
        height: 72,
        width: '100vh',
        // overflow: 'hidden',
        // position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: myTheme.palette.primary.main
    },
    logo: {
        marginRight: '20px'
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    right: {
        marginLeft: 'auto'
    }
});


class Header extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props;

        return (
            <AppBar position="absolute" className={classes.appBar}>
                <div>
                    <Toolbar className={classes.flex}>
                        <Typography variant="h6" color="inherit" noWrap={true}>
                            {strings.global.dynamic} <br />
                            {strings.global.programming}
                        </Typography>

                        <Button className={classes.right} onClick={this.props.onLanguageChange}>
                            {strings.getLanguage() === 'en' &&
                                <img src={slovak} height='60' width='60' />
                            }
                            {strings.getLanguage() === 'sk' &&
                                <img src={uk} height='60' width='60' />
                            }
                        </Button>
                    </Toolbar>
                </div>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
