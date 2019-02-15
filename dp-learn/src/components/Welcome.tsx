import * as React from 'react';

import { Button, Grid, Grow, createStyles } from '@material-ui/core';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import logo from '../resources/dp_transparent.png';
import myTheme from '../styles/index';
import slovak from '../resources/slovakFlag.png';
import { strings } from 'src/translations/languages';
import uk from '../resources/ukFlag.png';

type AllProps =
    IHistoryProps &
    WithStyles<typeof styles>;

export interface IHistoryProps {
    history: any,
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundColor: myTheme.palette.primary.main,
        display: 'flex',
    },
    grid: {
        margin: 100,
    },
    brief: {
        fontSize: 24,
        color: 'white'
    },
    button: {
        fontSize: 28,
        marginTop: 100,
        color: 'white',
        borderColor: 'white',
        borderWidth: 2
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        margin: 'auto'
    },
    langButton: {
        height: 80
    }
});

class Welcome extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
        this.onStartClicked = this.onStartClicked.bind(this);
    }

    public render() {

        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <Grid container={true} direction='column' alignItems='center' className={classes.grid}>
                        <Grow in={true} timeout={1500}>
                            <Grid >
                                <img src={logo} height='350' width='350' />
                            </Grid>
                        </Grow>
                        <div className={classes.flex}>
                            <Button onClick={this.onStartClicked('sk')} className={classes.langButton}>
                                <img src={slovak} height='80' width='80' />
                            </Button>
                            <Button onClick={this.onStartClicked('en')} className={classes.langButton}>
                                <img src={uk} height='80' width='80' />
                            </Button>
                        </div>
                    </Grid>
                </div>
            </div>
        );
    }

    private onStartClicked = (language: string) => (e: any) => {
        strings.setLanguage(language);
        this.props.history.push("/mainpage/coins");
    }
}

export default withStyles(styles)(Welcome);
