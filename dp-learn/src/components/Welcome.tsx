import { Button, Grid, Grow } from '@material-ui/core';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
declare module '*.png';
import logo from '../resources/dp_transparent.png';
import MainPage from './MainPage';

export interface IProps {
    name: string
}

interface IState {
    mainPageOpened: boolean;
}

type AllProps =
    IProps &
    WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundColor: '#263238',
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
        margin: theme.spacing.unit,
        marginTop: 100,
        color: 'white',
        borderColor: 'white',
        borderWidth: 2
    },
});

class Welcome extends React.Component<AllProps, IState> {
    public static defaultProps: IProps = {
        name: "Welcome to Dynamic Programming"
    }

    constructor(props: AllProps) {
        super(props);
        this.state = { mainPageOpened: false };
    }

    public render() {

        const { name, classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <Grid>
                        <MainPage visible={this.state.mainPageOpened} />
                    </Grid>

                    <Grow in={!this.state.mainPageOpened} timeout={{enter:0, exit:1000}}>
                        <Grid container={true} direction='column' alignItems='center'>
                            <Grow in={true} timeout={1000}>
                                <Grid className={classes.grid}>
                                    <img src={logo} height='350' width='350' />
                                </Grid>
                            </Grow>
                            <Grid className={classes.brief}>
                                {name}
                            </Grid>
                            <Grid>
                                <Button variant="outlined" className={classes.button} onClick={this.startClick} >
                                    Let's start
                            </Button>
                            </Grid>
                        </Grid>
                    </Grow>

                </div>
            </div>
        );
    }

    private startClick = () => {
        this.setState({ mainPageOpened: true });
    };
}

export default withStyles(styles)(Welcome);
