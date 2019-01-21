import * as React from 'react';

import { Avatar, Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import myTheme from '../../styles/index';
import posed from "react-pose";

interface ISubstringState {
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
    hovering: boolean
    speed: number
    buttonLabel: string
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
    box: {
        width: '100px',
        height: '100px',
        backgroundColor: 'red'
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
    },
    leftMargin: {
        marginLeft: 20
    },
    firstAvatar: {
        margin: 10,
        height: 60,
        width: 60,
        display: 'flex',
        color: '#fff',
        backgroundColor: 'blue'
    },
    greenAvatar: {
        margin: 10,
        height: 60,
        width: 60,
        display: 'flex',
        color: '#fff',
        backgroundColor: 'green'
    },
    redAvatar: {
        margin: 10,
        height: 60,
        width: 60,
        display: 'flex',
        color: '#fff',
        backgroundColor: 'red'
    },
    avatars:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const AnimatedDiv = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
});

class Substring extends React.Component<AllProps, ISubstringState> {

    /////////////////////// private variables /////////////////////////////////

    private cycleCounter: number
    private innerCounter: number
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
    private table: number[][]
    // Length of strings
    private LENGTH1: number
    private LENGTH2: number

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
            hovering: false,
            speed: 1,
            buttonLabel: "Finish"
        }
        this.strXChange = this.strXChange.bind(this);
        this.strYChange = this.strYChange.bind(this);
    }

    public render() {
        const { classes } = this.props;

        return (
            <Grid container={true} direction='column'>
                <Typography variant={'h4'} align={'center'}>
                    Longest common substring <br /><br />
                </Typography>
                <Grid className={classes.gap}>
                    Given two strings <b>X</b> and <b>Y</b>. We want to find the length of the longest common substring. <br /> <br />
                    For example: <br />
                    <div className={classes.leftMargin}>
                        X = "I like dynamic programm<b>ing!</b>"<br />
                        Y = "Really? So tell me something about this cool th<b>ing!</b>"<br /><br />
                    </div>
                    The lenght of the longest common substring is <b>4</b> and the substring is "ing!".<br /> <br />

                    <Typography variant={'h6'}>
                        Simple solution
                    </Typography>
                    We have to consider all substrings of first string and check if this is a substring in second string.
                    There will be <b>O(m^2)</b> substrings. We can check for matching substring in <b>O(n)</b> time.<br /><br />

                    <div className={classes.leftMargin}>
                        Time complexity is <b>O(m^2 * n)</b><br /><br />
                    </div>

                    <Typography variant={'h6'}>
                        Dynamic programming
                    </Typography>
                    Using this method we need to find the length of longest common <b>suffix</b> for substrings of both strings.
                        These length's are stored in a table. At the end cell with the biggest value is our result.<br /><br />

                    <div className={classes.leftMargin}>
                        Time complexity is <b>O(m* n)</b><br /><br />
                    </div>
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
                    <br/>

                    {/* Speed select */}
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select speed</FormLabel>
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
                    <br/>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.evaluate} disabled={this.state.doCycle}>
                        Start
                    </Button>
                    {(this.state.doCycle === true) &&
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.state.speed === 0 ? this.doStep : this.finish}>
                            {this.state.buttonLabel}
                        </Button>
                    }
                    <div className={classes.avatars}>
                        <AnimatedDiv pose={this.state.charX !== "" ? 'visible' : 'hidden'}>
                            <Avatar className={classes.firstAvatar}>{this.state.charX}</Avatar>
                        </AnimatedDiv>
                        <AnimatedDiv pose={this.state.charY !== "" ? 'visible' : 'hidden'}>
                            <Avatar className={this.state.charX === this.state.charY ? classes.greenAvatar : classes.redAvatar}>{this.state.charY}</Avatar>
                        </AnimatedDiv>
                    </div>
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

    private speedChange = (e: any) => {
        this.setState({ speed: +e.target.value });
    };

    private finish = () => {
        this.setState({speed: 1000});
    }

    private evaluate = () => {
        this.setState({ 
            hovering: !this.state.hovering,
            buttonLabel: this.state.speed === 0 ? "Step" : "Finish"
        });
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

        this.initialize();
        this.setState({ 
            eval: true,
            doCycle: true,
            cols: this.LENGTH2 + 1
        });

        this.innerCounter = 0;
        if (this.state.speed !== 0) {
            setTimeout(this.doStep, 1000);
        }
    }

    private initialize = () => {
        for (let j = 0; j <= this.LENGTH2; j++) {
            this.table[this.cycleCounter][j] = 0;
        }
        this.cycleCounter++;

        this.setState({ table: this.table });
        this.setState({ result: "Current result: " + this.intResult.toString() });
    }

    private transitionHelper = () => {
        this.setState({charY: ""});
        setTimeout(this.doStep, 1000 / this.state.speed)
    }

    private doStep = () => {
        this.setState({ charX: this.state.stringX[this.cycleCounter - 1], charY: this.state.stringY[this.innerCounter - 1] });

        if (this.innerCounter === 0) {
            this.table[this.cycleCounter][this.innerCounter] = 0;
            this.setState({charY: ""});
        }
        else if (this.state.stringX[this.cycleCounter - 1] === this.state.stringY[this.innerCounter - 1]) {
            this.table[this.cycleCounter][this.innerCounter] = this.table[this.cycleCounter - 1][this.innerCounter - 1] + 1;
            this.intResult = Math.max(this.intResult, this.table[this.cycleCounter][this.innerCounter]);
        }
        else {
            this.table[this.cycleCounter][this.innerCounter] = 0;
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
                setTimeout(this.transitionHelper, 1000 / this.state.speed);
            }
        }
        else {
            this.cycleCounter++;
            if (this.cycleCounter > this.LENGTH1) {
                this.setState({ 
                    doCycle: false,
                    result: "Final result: " + this.intResult.toString()
                });
            }
            else {
                this.setState({ result: "Current result: " + this.intResult.toString() });
                this.innerCounter = 0;
                
                if (this.state.speed !== 0) {
                    setTimeout(this.transitionHelper, 1000 / this.state.speed);
                }
            }
        }
    }

    private tableHead = (cols: number) => {
        const { classes } = this.props;

        const table = [];

        table.push(<TableCell key='heading' className={[classes.tableHeading, classes.caption].join(' ')}>Table</TableCell>)
        for (let i = 1; i < cols; i++) {
            table.push(<TableCell key={'columnName' + i.toString()} className={[classes.tableTopCaption, classes.caption].join(' ')}>{"str Y[" + (i - 1) + "] - " + this.state.stringY[i - 1]}</TableCell>);
        }

        return table;
    }

    private tableBody = () => {
        const { classes } = this.props;

        const body = [];

        // console.log("in body, length: " + this.LENGTH1.toString());

        for (let i = 1; i <= this.LENGTH1; i++) {
            // console.log("body cycle outer");

            const key: string = "cycle: " + { i };
            const row = [];

            row.push(
                <TableCell key={key + 'cell' + i.toString()} className={[classes.tableLeftCaption, classes.caption].join(' ')}>{"String X[" + (i - 1) + "] - " + this.state.stringX[i - 1]}</TableCell>
            );

            for (let j = 1; j <= this.LENGTH2; j++) {
                let cell = "-";

                if (this.state.table[i][j] !== Number.MAX_VALUE) {
                    cell = this.state.table[i][j].toString();
                }

                row.push(
                    <TableCell key={key + 'cell2 ' + j.toString()} className={classes.tableCell}>{cell}</TableCell>
                );
            }

            body.push(
                <TableRow key={key + i.toString()}>
                    {row}
                </TableRow>
            );
        }

        return body;
    }
}

export default withStyles(styles)(Substring);
