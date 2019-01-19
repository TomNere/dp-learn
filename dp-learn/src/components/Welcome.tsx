import * as React from 'react';

import { Button, Grid, Grow } from '@material-ui/core';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import logo from '../resources/dp_transparent.png';
import myTheme from '../styles/index';

declare module '*.png';

export interface IProps {
    history: any
}

type AllProps =
    IProps &
    WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundColor: myTheme.palette.primary.main,
        display: 'flex',
    },
    grid: {
        marginTop: 100,
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
});

class Welcome extends React.Component<AllProps> {
    public static defaultProps: IProps = {
        history: {}
    }

    public render() {

        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <Grid container={true} direction='column' alignItems='center'>
                        <Grow in={true} timeout={1500}>
                            <Grid className={classes.grid}>
                                <img src={logo} height='350' width='350' />
                            </Grid>
                        </Grow>
                        <Grid className={classes.brief}>
                            {name}
                        </Grid>
                        <Grid className={classes.brief}>
                            {name}
                        </Grid>
                        <Grid>
                            <Button variant='outlined' className={classes.button} onClick={this.redirectMe}>
                                Let's start
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    private redirectMe = () => {
        this.props.history.push("/mainpage/coins");
    }
}

export default withStyles(styles)(Welcome);
