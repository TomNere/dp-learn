import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import Cookies from 'universal-cookie';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import myTheme from 'src/styles/index';
import slovak from 'src/resources/flags/slovakFlag.png';
import { strings } from 'src/strings/translations/languages';
import uk from 'src/resources/flags/ukFlag.png';

type AllProps =
    IMenuHeaderProps &
    WithStyles<typeof styles>;

export interface IMenuHeaderProps {
    title: string
    onLanguageChange: any
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: 1,
        height: 64,
        width: '100vh',
        // overflow: 'hidden',
        // position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: myTheme.palette.primary.main
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

// Header of the app menu with language selection
class MenuHeader extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
        
        // Set language
        const cookies = new Cookies();
        const language = cookies.get('language');
        if (language !== undefined && language !== strings.getLanguage()) {
            this.props.onLanguageChange();
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <AppBar position="absolute" className={classes.appBar}>
                <div>
                    <Toolbar className={classes.flex}>
                        <Typography variant="h6" color="inherit" noWrap={true}>
                            {this.props.title}
                        </Typography>

                        <Button className={classes.right} onClick={this.props.onLanguageChange}>
                            {strings.getLanguage() === 'en' &&
                                <img src={slovak} height='48' width='48' />
                            }
                            {strings.getLanguage() === 'sk' &&
                                <img src={uk} height='48' width='48' />
                            }
                        </Button>
                    </Toolbar>
                </div>
            </AppBar>
        );
    }
}

export default withStyles(styles)(MenuHeader);
