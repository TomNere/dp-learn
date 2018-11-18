import * as React from 'react';

import { Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import myTheme from '../../styles/index';

interface ISubstringState {
    stringX: string
    stringY: string
    result: string
    eval: boolean
    doCycle: boolean
    table: number[][]
    cols: number
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
        width: 300,
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: myTheme.palette.primary.main
    },
    table: {
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    gap: {
        marginBottom: 15
    },
    tableHeading: {
        fontSize: theme.typography.pxToRem(30),
    },
    tableTopCaption: {
        fontSize: theme.typography.pxToRem(14),
        textAlign: 'center',
    },
    tableLeftCaption: {
        fontSize: theme.typography.pxToRem(14),
    },
    tableCell: {
        textAlign: 'center',
        "& th:last-child": {
            borderRight: 'solid 1px gray'
        },
    },
    caption: {
        color: 'white',
        borderRight: 'solid 1px gray',
        backgroundColor: myTheme.palette.primary.main
    },
    label: {
        fontSize: theme.typography.pxToRem(30),
        textAlign: 'center'
    }
});

class Substring extends React.Component<AllProps, ISubstringState> {

    /////////////////////// private variables /////////////////////////////////
    
    private cycleCounter: number
    // To store length of the longest common 
    // substring 
    private intResult: number
    // Create a table to store lengths of  
    // longest common suffixes of substrings. 
    // Note that table[i][j] contains length 
    // of longest common suffix of X[0..i-1]  
    // and Y[0..j-1]. The first row and first 
    // column entries have no logical meaning, 
    // they are used only for simplicity of  
    // program 
    private table:number[][]
    // Length of strings
    private LENGTH1:number
    private LENGTH2:number

    ////////////////////////////////////////////////////////////////////////////

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            stringX: "String",
            stringY: "Testing",
            result: "",
            eval: false,
            doCycle: false,
            table: [],
            cols: 0
        }
        this.strXChange = this.strXChange.bind(this);
        this.strYChange = this.strYChange.bind(this);
    }

    public render() {
        const { classes } = this.props;

        return (
            <Grid container={true} direction='column'>
                <h1>
                    Longest common substring
                </h1>
                <Grid className={classes.gap}>
                    <Typography noWrap={true}>{'Given two strings ‘X’ and ‘Y’, find the length of the longest common substring.'}</Typography>
                </Grid>
                <Grid>
                    <ExpansionPanel >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Examples</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Input : X = "GeeksforGeeks", y = "GeeksQuiz" <br/>
                                Output : 5 <br/>
                                The longest common substring is "Geeks" and is of <br/>
                                length 5. <br/><br/>
                                
                                Input : X = "abcdxyz", y = "xyzabcd" <br/>
                                Output : 4 <br/>
                                The longest common substring is "abcd" and is of <br/>
                                length 4. <br/><br/>
                                
                                Input : X = "zxabcdezy", y = "yzabcdezx" <br/>
                                Output : 6 <br/>
                                The longest common substring is "abcdez" and is of <br/>
                                length 6. <br/>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="stringXTF"
                            label="String X"
                            className={classes.textField}
                            value={this.state.stringX}
                            onChange={this.strXChange}
                            margin="normal"
                        />
                    </form>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="stringYTF"
                            label="String Y"
                            className={classes.textField}
                            value={this.state.stringY}
                            onChange={this.strYChange}
                            margin="normal"
                        />
                    </form>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.evaluate}>
                        Start
                    </Button>
                    {(this.state.doCycle === true) &&
                                <Button variant="contained" color="primary" className={classes.button} onClick={this.doCycle}>
                                    Next cycle
                                </Button>
                            }
                    {(this.state.eval === true) &&
                        <div>
                            <Paper className={classes.gap}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            {this.tableHead(this.state.cols)}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.tableBody()}
                                    </TableBody>
                                </Table>
                            </Paper>
                            <div className={classes.label}>
                                {this.state.result}
                            </div>
                        </div>
                    }
                    
                </Grid>
            </Grid >

        );
    }

    private strXChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ stringX: e.target.value });
    }

    private strYChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ stringY: e.target.value });
    }

    private evaluate = () => {
        this.table = [];
        this.cycleCounter = 0;
        this.intResult = 0;
        this.LENGTH1 = this.state.stringX.length;
        this.LENGTH2 = this.state.stringY.length;


        // Initialize all table 
        // values as Infinite 
        for (let i = 0; i <= this.LENGTH1; i++) {
            this.table[i] = [];
            for (let j = 0; j <= this.LENGTH2; j++) {
                this.table[i][j] = Number.MAX_VALUE;
            }
        }

        this.doCycle();
        this.setState({ eval: true, doCycle: true });
        this.setState({ cols: this.LENGTH2 + 1});

    }

    private doCycle = () => {
        // Assign current state for easy manipulation

        if (this.cycleCounter <= this.LENGTH1) { 
            for (let j = 0; j <= this.LENGTH2; j++) { 
                if (this.cycleCounter === 0 || j === 0) {
                    this.table[this.cycleCounter][j] = 0;
                }
                else if (this.state.stringX[this.cycleCounter - 1] === this.state.stringY[j - 1]) { 
                    this.table[this.cycleCounter] [j] = this.table[this.cycleCounter - 1] [j - 1] + 1;

                    this.intResult = Math.max(this.intResult, this.table[this.cycleCounter] [j]); 
                }
                else {
                    this.table[this.cycleCounter][j] = 0;
                }
            }
            this.cycleCounter++;
        }

        this.setState({table:[]});
        
        for (let j = 0; j <= this.LENGTH1; j++) {
            this.setState(prevState => ({
                table: [...prevState.table, this.table[j]]}));
        }

        if (this.cycleCounter > this.LENGTH1) {
            this.setState({ doCycle: false});
            this.setState({ result: "Final result: " + this.intResult.toString()});
        }
        else {
            this.setState({ result: "Current result: " + this.intResult.toString()});
            this.setState({})
        }
    }

    private tableHead = (cols: number) => {
        const {classes} = this.props;

        const table = [];

        table.push(<TableCell className={[classes.tableHeading, classes.caption].join(' ')}>{"Table"}</TableCell>)
        for (let i = 1; i < cols; i++) {
            table.push(<TableCell className={[classes.tableTopCaption, classes.caption].join(' ')}>{"str Y[" + (i - 1) + "] - " + this.state.stringY[i - 1]}</TableCell>);
        }

        return table; 
    }

    private tableBody = () => {
        const {classes} = this.props;

        const body = [];

        console.log("in body, length: " + this.LENGTH1.toString());

        for (let i = 1; i <= this.LENGTH1; i++) {
            console.log("body cycle outer");

            const key: string = "cycle: " + { i };
            const row = [];

            row.push(
                <TableCell className={[classes.tableLeftCaption, classes.caption].join(' ')}>{"String X[" + (i - 1) + "] - " + this.state.stringX[i - 1]}</TableCell>
            );

            for (let j = 1; j <= this.LENGTH2; j++) {
                console.log("body cycle inner");

                let cell = "-";

                if (this.state.table[i][j] !== Number.MAX_VALUE) {
                    cell = this.state.table[i][j].toString();
                }

                row.push(
                    <TableCell className={classes.tableCell}>{cell}</TableCell>
                );
            }

            body.push(
                <TableRow key={key}>
                    {row}
                </TableRow>
            );
        }

        return body;
    }
}

export default withStyles(styles)(Substring);