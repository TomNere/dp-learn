import * as React from 'react';

import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import myTheme from '../../styles/index';

interface ICoinsState {
    givenValue: number
    givenCoins: string
    result: string
    eval: boolean
    cols: number
    rows: number[][]
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
    table: {
        minWidth: 700,
    },
    row1: {
        backgroundColor: 'blue',
        borderColor: 'green',
        borderWidth: 5
    },
    row2: {
        backgroundColor: 'red'
    }
});

class Coins extends React.Component<AllProps, ICoinsState> {

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenValue: 4,
            givenCoins: "1,2,5",
            result: "",
            eval: false,
            cols: 0,
            rows: [],
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
                    {(this.state.eval === true) &&
                        <div>
                            <Paper>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            {this.tableHead(this.state.givenValue)}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.tableBody()}
                                    </TableBody>
                                </Table>
                            </Paper>
                            <Paper>
                                {this.state.result}
                            </Paper>
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
        for (const coin of e.target.value.split(",")) {
            if (Number.isNaN(+coin)) {
                return;
            }
        }

        this.setState({ givenCoins: e.target.value });
    }

    private evaluate = () => {
        // Get coins
        //  log: string = "Coins: ";
        this.setState({rows: []});

        const givenCoins: number[] = [];
        for (const coin of this.state.givenCoins.split(",")) {
            if (!Number.isNaN(+coin)) {
                givenCoins.push(+coin);
            }
            else {
                this.setState({ result: "Error" });
                return;
            }
        }

        // Store our key values to constants to have clear code
        const GIVEN_VALUE = this.state.givenValue;
        const COINS_NUMBER = givenCoins.length;
        // log += "coins length = " += this

        // table[i] will be storing  
        // the minimum number of coins 
        // required for i value. So  
        // table[] will have result 
        const table:number[] = new Array(GIVEN_VALUE + 1); 

        // Base case (If given 
        // value is 0) 
        table[0] = 0;

        // Initialize all table 
        // values as Infinite 
        for (let i = 1; i <= GIVEN_VALUE; i++) {
            table[i] = Number.MAX_VALUE;
        }

        // Compute minimum coins  
        // required for all 
        // values from 1 to given value
        for (let i = 1; i <= GIVEN_VALUE; i++) {
            // Go through all coins 
            // smaller than i 
            // log += "_outer for_";
            for (let j = 0; j < COINS_NUMBER; j++) {
                // log += "_inner for_";
                if (givenCoins[j] <= i) {

                    const subRes: number = table[i - givenCoins[j]];
                    
                    if ((subRes !== Number.MAX_VALUE) && (subRes + 1 < table[i])) {
                        table[i] = subRes + 1;
                    }
                }
                
            }
            const tmp = [0];

            for (let k = 1; k <= GIVEN_VALUE ; k++) {
                tmp.push(table[k]);
            }

            this.setState(prevState => ({
                rows: [...prevState.rows, tmp]
            }));
            
        }
        // this.setState({ result: log });

        this.setState({ result: "Result: " + table[GIVEN_VALUE].toString() });
        this.setState({ eval: true });
    }

    private tableHead = (cols: number) => {
        const table = [];

        for (let i = 1; i <= cols; i++) {
            table.push(<TableCell>{i}</TableCell>);
        }

        // for (let i = 1; i <= cols; i++) {
        //     table.push(<tr>
        //         {
        //             //inner loop to create columns
        //         }
        //     </tr>)
        // }
        return table;

        // return TableHead(
        //     for () {
        //     <TableCell>Dessert (100g serving)</TableCell>
        //         <TableCell numeric={true}>Calories</TableCell>
        //         <TableCell numeric={true}>Fat (g)</TableCell>
        //         <TableCell numeric={true}>Carbs (g)</TableCell>
        //         <TableCell numeric={true}>Protein (g)</TableCell>
        //     </TableRow >
        // }
        // )
    }

    private tableBody = () => {

        const body = [];

        for (let i = 0; i < this.state.rows.length; i++) {
            const key: string = "cycle: " + { i };
            const row = [];

            for (let j = 1; j <= this.state.givenValue; j++) {
                let cell = "IntMax";

                if (this.state.rows[i][j] !== Number.MAX_VALUE) {
                    cell = this.state.rows[i][j].toString();
                }

                row.push(
                    <TableCell>{cell}</TableCell>
                );
            }

            body.push(
                <TableRow key={key}>
                    {row}
                </TableRow>
            );
        }

        return body;

        // <TableRow key={row.id}>
        //     <TableCell component="th" scope="row">
        //         {row.name}
        //     </TableCell>
        //     <TableCell numeric>{row.calories}</TableCell>
        //     <TableCell numeric>{row.fat}</TableCell>
        //     <TableCell numeric>{row.carbs}</TableCell>
        //     <TableCell numeric>{row.protein}</TableCell>
        // </TableRow>
    }
}

export default withStyles(styles)(Coins);