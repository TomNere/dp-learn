import * as React from 'react';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
declare module '*.png';
import logo from '../resources/dp_transparent.png';

export interface IProps {
    name: string
}

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

type AllProps =
    IProps &
    WithStyles<typeof styles>;

class Hello extends React.Component<AllProps> {
    public static defaultProps: IProps = {
        name: "Welcome to Dynamic Programming"
    }

    public render() {

        const { name, classes } = this.props;

        return (
                <div className={classes.root}>
                    <Grid container direction='column' alignItems='center'>
                        <Grid className={classes.grid}>
                            <img src={logo} height='350' width='350' />
                        </Grid>
                        <Grid className={classes.brief}>
                            {name}
                        </Grid>
                        <Grid>
                            <Button variant="outlined" className={classes.button} >
                                Let's start
                            </Button>
                        </Grid>
                    </Grid>
                </div>
        );
    }

}

// helpers

export default withStyles(styles)(Hello);
