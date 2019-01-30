import * as React from 'react';

import { Avatar, Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, TextField, Theme, Typography } from '@material-ui/core';
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles";

import { AnimatedDiv } from '../../ConstComponents';
import myTheme from '../../../styles/index';

interface ISubstringDemoState {
    stringX: string
    stringY: string
    charX: string
    charY: string
    result: string
    eval: boolean
    doCycle: boolean
    table: number[][]
    cellColors: string[][]
    cols: number
    speed: number
    buttonLabel: string
}

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 200,
    },
    buttonDark: {
        margin: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.primary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.secondary.main
        }
    },
    buttonLight: {
        margin: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.secondary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.primary.main
        }
    },
    bottomMargin: {
        marginBottom: 15,
    },
    tableHeading: {
        fontSize: theme.typography.pxToRem(30),
    },
    caption: {
        color: 'white',
        borderRight: 'solid 1px gray',
        backgroundColor: myTheme.palette.primary.main,
        padding: '4px 24px 4px 14px'
    },
    columnCaption: {
        fontSize: theme.typography.pxToRem(14),
        textAlign: 'center',
        padding: 0
    },
    rowCaption: {
        fontSize: theme.typography.pxToRem(14),
    },
    tableCell: {
        textAlign: 'center',
        padding: 0,
        "& th:last-child": {
            borderRight: 'solid 1px gray'
        },
    },
    result: {
        fontSize: theme.typography.pxToRem(30),
        textAlign: 'center'
    },
    avatar: {
        margin: 10,
        height: 60,
        width: 60,
        display: 'flex',
        color: '#fff',
        fontSize: 30
    },
    avatars: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blueAvatar: {
        backgroundColor: 'blue'
    },
    greenAvatar: {
        backgroundColor: 'green'
    },
    redAvatar: {
        backgroundColor: 'red'
    },
});

class SubstringDemo extends React.Component<AllProps, ISubstringDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCycle: number;
    private innerCounter: number;
    // To store length of the longest common 
    // substring 
    private intResult: number;

    // Create a table to store lengths of  
    // longest common suffixes of substrings. 
    // Note that table[i][j] contains length 
    // of longest common suffix of X[0..i-1]  
    // and Y[0..j-1]. The first row and first 
    // column entries have no logical meaning, 
    // they are used only for simplicity of  
    // program 
    private table: number[][];

    // Length of strings
    private LENGTH1: number;
    private LENGTH2: number;

    // Timeout
    private timeout: any;

    ////////////////////////////////////////////////////////////////////////////

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            stringX: "String",
            stringY: "Testing",
            charX: "",
            charY: "",
            result: "",
            eval: false,
            doCycle: false,
            cellColors: [],
            table: [],
            cols: 0,
            speed: 1,
            buttonLabel: "Finish"
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                    Longest common substring - demo
                </Typography>
                <div className={classes.bottomMargin}>
                    Basic dynamic programming method for "Longest common substring" problem.
                </div>
                <Grid className={[classes.container, classes.bottomMargin].join(' ')}>
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
                </Grid>
                <br/>
                {/* Speed select */}
                <FormControl component={"fieldset" as "div"}>
                    <FormLabel component="label">Select speed</FormLabel>
                    <RadioGroup
                        aria-label="position"
                        name="position"
                        value={this.state.speed.toString()}
                        onChange={this.speedChange}
                        row={true}
                    >
                        <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="1x"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio color="primary" />}
                            label="2x"
                        />
                        <FormControlLabel
                            value="5"
                            control={<Radio color="primary" />}
                            label="5x"
                        />
                        <FormControlLabel
                            value="10"
                            control={<Radio color="primary" />}
                            label="10x"
                        />
                        <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label="Step by step"
                        />
                    </RadioGroup>
                </FormControl>
                <br/>
                <Button variant="contained" className={classes.buttonDark} onClick={this.evaluate} disabled={this.state.doCycle}>
                    Start
                </Button>
                {(this.state.doCycle === true) &&
                    <Button variant="contained" color="primary" className={classes.buttonLight} onClick={this.state.speed === 0 ? this.doStep : this.finish}>
                        {this.state.buttonLabel}
                    </Button>
                }
                {(this.state.eval) &&
                    <div className={classes.avatars}>
                        <Avatar className={[classes.avatar, classes.blueAvatar].join(' ')}>{this.state.charX}</Avatar>
                        <AnimatedDiv pose={this.state.charY !== "" ? 'visible' : 'hidden'}>
                            <Avatar className={this.state.charX === this.state.charY ? classes.greenAvatar : classes.redAvatar}>{this.state.charY}</Avatar>
                        </AnimatedDiv>
                    </div>
                }

                {(this.state.eval === true) &&
                    <div>
                        <Paper className={classes.bottomMargin}>
                            <Table>
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
                        <div className={classes.result}>
                            {this.state.result}
                        </div>
                    </div>
                }
            </div>
        );
    }

    private strXChange = (e: any) => {
        this.setState({ stringX: e.target.value });
    };

    private strYChange= (e: any) => {
        this.setState({ stringY: e.target.value });
    };

    private speedChange = (e: any) => {
        this.setState({ speed: +e.target.value });
    };

    private finish = () => {
        clearTimeout(this.timeout);
        this.setState({ speed: 0 });
        while (this.outerCycle <= this.LENGTH1) {
            this.doStep();
        }
    };

    private evaluate = () => {
        this.setState({
            buttonLabel: this.state.speed === 0 ? "Step" : "Finish",
            charX: "",
            charY: ""
        });

        this.table = [];
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

        // Initialize first row
        for (let j = 0; j <= this.LENGTH2; j++) {
            this.table[0][j] = 0;
        }

        this.outerCycle = 1;

        this.setState({
            eval: true,
            doCycle: true,
            cols: this.LENGTH2 + 1,
            table: this.table,
            result: "Current result: 0"
        });

        this.innerCounter = 0;

        // Check if auto play or debugging
        if (this.state.speed !== 0) {
            this.setState({ charX: this.state.stringX[this.outerCycle - 1] })
            this.timeout = setTimeout(this.doStep, 1000);
        }
    }

    private transitionHelper = () => {
        this.setState({ charY: "" });
        this.timeout = setTimeout(this.doStep, 1000 / this.state.speed)
    }

    private doStep = () => {
        this.setState({ charX: this.state.stringX[this.outerCycle - 1], charY: this.state.stringY[this.innerCounter - 1] });

        if (this.innerCounter === 0) {
            this.table[this.outerCycle][this.innerCounter] = 0;
            this.setState({ charY: "" });
        }
        else if (this.state.stringX[this.outerCycle - 1] === this.state.stringY[this.innerCounter - 1]) {
            this.table[this.outerCycle][this.innerCounter] = this.table[this.outerCycle - 1][this.innerCounter - 1] + 1;
            this.intResult = Math.max(this.intResult, this.table[this.outerCycle][this.innerCounter]);
        }
        else {
            this.table[this.outerCycle][this.innerCounter] = 0;
        }

        this.setState({ table: this.table });

        this.innerCounter++;

        if (this.innerCounter === 1) {
            if (this.state.speed !== 0) {
                this.doStep();
            }
            return;
        }

        if (this.innerCounter <= this.LENGTH2) {
            this.setState({ result: "Current result: " + this.intResult.toString() });

            if (this.state.speed === 1000) {
                this.doStep();
            }
            else if (this.state.speed !== 0) {
                this.timeout = setTimeout(this.transitionHelper, 1000 / this.state.speed);
            }
        }
        else {
            this.outerCycle++;
            if (this.outerCycle > this.LENGTH1) {
                this.setState({
                    doCycle: false,
                    result: "Final result: " + this.intResult.toString()
                });
            }
            else {
                this.setState({ result: "Current result: " + this.intResult.toString() });
                this.innerCounter = 0;

                if (this.state.speed !== 0) {
                    this.timeout = setTimeout(this.transitionHelper, 1000 / this.state.speed);
                }
            }
        }
    }

    // Return table heading
    private tableHead = (cols: number) => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={[classes.tableHeading, classes.caption].join(' ')}>Table</TableCell>)

        for (let i = 1; i < cols; i++) {
            heading.push(
                <TableCell key={'columnName' + i.toString()} className={[classes.columnCaption, classes.caption].join(' ')}>
                    {`Str Y[${i - 1}] - '${this.state.stringY[i - 1]}'`}
                </TableCell>);
        }

        return heading;
    }

    // Return table body
    private tableBody = () => {
        const { classes } = this.props;

        const body = [];

        // i = 1 because 0 is heading
        for (let i = 1; i <= this.LENGTH1; i++) {
            const row = [];

            // Row names
            row.push(
                <TableCell key={`rowName ${i.toString()}`} className={[classes.caption, classes.rowCaption].join(' ')}>
                    {`Str X[${i - 1}] - ${this.state.stringX[i - 1]}`}
                </TableCell>
            );

            // Table body(content), j = 1 because 0 is row name
            for (let j = 1; j <= this.LENGTH2; j++) {
                row.push(
                    <TableCell key={`row ${i},column ${j}`} className={classes.tableCell}>
                        {this.state.table[i][j] === Number.MAX_VALUE ? "-" : this.state.table[i][j].toString()}
                    </TableCell>
                );
            }

            // Push row to the table
            body.push(
                <TableRow key={`row ${i}`}>
                    {row}
                </TableRow>
            );
        }

        return body;
    }
}

export default withStyles(styles)(SubstringDemo);
