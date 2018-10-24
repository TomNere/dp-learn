import * as React from 'react';

import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import myTheme from '../../styles/index';

interface ICoinsState {
    givenValue: number
    givenCoins: string
    result: number
}

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: myTheme.palette.primary.main
    },
});



class Coins extends React.Component<AllProps, ICoinsState> {

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenValue: 100,
            givenCoins: "1,2,5,10",
            result: 0
        }
        this.handleValue = this.handleValue.bind(this);
        this.handleCoins = this.handleCoins.bind(this);
    }

    public render() {
        const { classes } = this.props;

        return (
            <Grid container={true} direction='column'>
                <h1>
                    Find minimum number of coins that make a given value
                </h1>
                <Grid>
                    <Typography noWrap={true}>{'Given a value V, if we want to make change for V cents, and we have infinite supply of each of C = { C1, C2, .. , Cm} valued coins, what is the minimum number of coins to make the change? '}</Typography>
                </Grid>
                <Grid>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="givenValueTF"
                            label="Value"
                            className={classes.textField}
                            value={this.state.givenValue}
                            onChange={this.handleValue}
                            margin="normal"
                        />
                    </form>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="givenCoinsTF"
                            label="Coins"
                            className={classes.textField}
                            value={this.state.givenCoins}
                            onChange={this.handleCoins}
                            margin="normal"
                        />
                    </form>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.evaluate}>
                        Start
                    </Button>
                    {(this.state.result !== 0) &&
                        <div>
                            {this.state.result}
                        </div>
                    }
                </Grid>
            </Grid >

        );
    }

    private handleValue(e: React.ChangeEvent<HTMLInputElement>) {
        if (!Number.isNaN(+e.target.value)) {
            this.setState({ givenValue: +e.target.value });
        }
    }

    private handleCoins(e: React.ChangeEvent<HTMLInputElement>) {
        const coins = e.target.value.split(",");

        for (const coin of coins) {
            if (Number.isNaN(+coin)) {
                return;
            }
        }

        this.setState({ givenCoins: e.target.value });
    }

    private evaluate = () => {
        // // table[i] will be storing  
        // // the minimum number of coins 
        // // required for i value. So  
        // // table[V] will have result 
        // var int[]table = new int[V + 1];

        // // Base case (If given 
        // // value V is 0) 
        // table[0] = 0;

        // // Initialize all table 
        // // values as Infinite 
        // for (int i = 1; i <= V; i++)
        // table[i] = int.MaxValue;

        // // Compute minimum coins  
        // // required for all 
        // // values from 1 to V 
        // for (int i = 1; i <= V; i++)
        // {
        //     // Go through all coins 
        //     // smaller than i 
        //     for (int j = 0; j < m; j++)
        //     if (coins[j] <= i) {
        //         int sub_res = table[i - coins[j]];
        //         if (sub_res != int.MaxValue &&
        //             sub_res + 1 < table[i])
        //             table[i] = sub_res + 1;
        //     }
        // }
        // return table[V];



        this.setState({ result: 42 });
    }
}

export default withStyles(styles)(Coins);