import '../../styles/prism.css';

import * as Prism from 'prismjs';
import * as React from 'react';

import { Avatar, Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { AnimatedDiv } from '../ConstComponents';
import { Code } from '@material-ui/icons';
import myTheme from '../../styles/index';

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
    flexChild: {
        flexBasis: '50%',
        flexGrow: 0,
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
    bottomMargin: {
        marginBottom: 15,
    },
    tableHeading: {
        fontSize: theme.typography.pxToRem(30),
    },
    caption: {
        color: 'white',
        borderRight: 'solid 1px gray',
        backgroundColor: myTheme.palette.primary.main
    },
    columnCaption: {
        fontSize: theme.typography.pxToRem(14),
        textAlign: 'center',
    },
    rowCaption: {
        fontSize: theme.typography.pxToRem(14),
    },
    tableCell: {
        textAlign: 'center',
        "& th:last-child": {
            borderRight: 'solid 1px gray'
        },
    },
    result: {
        fontSize: theme.typography.pxToRem(30),
        textAlign: 'center'
    },
    leftMargin: {
        marginLeft: 20
    },
    paper: {
        padding: 20,
        marginBottom: 15,
        display: 'inline-block'
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
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    expPanel: {
        margin: theme.spacing.unit,
        background: myTheme.palette.primary.main,
    },
    whiteText: {
        color: 'white'
    },
    minHeight: {
        minHeight: 100,
    },
    margin: {
        margin: theme.spacing.unit,
    }
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

    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                    Longest common substring
                </Typography>
                <Typography variant={'h5'}>
                    Brief:
                </Typography>
                <Paper className={classes.paper}>
                    There are two strings <b>X</b> and <b>Y</b>. We want to find the length of the longest common substring, e.g.: <br />
                    <div className={classes.leftMargin}>
                        X = "I like dynamic programm<b>ing!</b>"<br />
                        Y = "Really? So tell me something about this cool th<b>ing!</b>"<br /><br />
                    </div>
                    The lenght of the longest common substring is <b>4</b> and the substring is <b>"ing!"</b>.
                </Paper>
                <Typography variant={'h5'} >
                    Solution:
                </Typography>
                <Paper className={classes.paper}>
                    {/* Simple solution */}
                    <Typography variant={'h6'}>
                        Simple solution
                    </Typography>
                    We have to consider all substrings of first string and check if this is a substring in second string.
                    There will be <b>O(m^2)</b> substrings. We can check for matching substring in <b>O(n)</b> time.<br /><br />
                
                    <div className={classes.margin}>
                        Time complexity is <b>O(m^2 * n)</b>
                    </div>
                    <hr/>
                    <div className={classes.container}>
                        <div className={classes.flexChild}>
                            <Typography variant={'h6'}>
                                Dynamic programing
                            </Typography>

                            <div className={[classes.leftMargin, classes.bottomMargin, classes.minHeight].join(' ')}>
                                Using this method we need to find the length of longest common <b>suffix</b> for substrings of both strings.
                            These length's are stored in a table. At the end cell with the biggest value is our result. <br />
                                Value in column is compared to value in row. Default value is 0, but when a match is detected, value from
                                previous column and row is incremented (suffix is incremented).
                            </div>
                            <div className={classes.leftMargin}>
                                Time complexity is <b>O(m * n), where m,n are lengths of strings </b><br /><br />
                            </div>
                            <ExpansionPanel className={classes.expPanel}>
                                <ExpansionPanelSummary expandIcon={<Code className={classes.whiteText} />}>
                                    <Typography className={[classes.heading, classes.whiteText].join(' ')}>Source code</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.leftMargin}>
                                        <pre>
                                            <code className="language-clike">
                                                {`// Returns length of longest common substring
int CommonSubstrLength(char* x, char* y) 
{
    // Store strings length
    int len1 = strlen(x);
    int len2 = strlen(y);

    // Table (two-dimensional array) for storing values
    // Table size is length +1 because of simplicity
    int[len1 + 1][len2 + 1] table;
          
    // Variable keeping length of the longest common substring
    int result = 0;
  
    // Algorithm
    for (int i = 0; i <= len1; i++)
    {
        for (int j = 0; j <= len2; j++)
        {
            // This will fill first row and column of table with zero values
            if (i == 0 || j == 0)
            {
                table[i, j] = 0;
            }
            // Check for matching characters
            // (i - 1 and j - 1 because we have bigger table than strings)
            else if (x[i - 1] == x[j - 1])
            {
                // Match!
                // Suffix is incremented
                // We have zero value in first column/row, so we can just increment
                table[i][j] = ++table[i - 1][j - 1];

                // Set new result if needed
                if (result < table[i][j]) {
                    result = table[i][j];
                }
            }
            // Different characters
            else
            {
                table[i, j] = 0; 
            }
        }
    }

    return result; 
}`}
                                            </code>
                                        </pre>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        <div className={classes.flexChild}>
                            <Typography variant={'h6'}>
                                Using recursion
                            </Typography>

                            <div className={[classes.leftMargin, classes.bottomMargin, classes.minHeight].join(' ')}>
                                This solution seems simple but
                            </div>
                            <div className={classes.leftMargin}>
                                Time complexity is <b>O(n^2), where m,n are lengths of strings </b><br /><br />
                            </div>

                            <ExpansionPanel className={classes.expPanel}>
                                <ExpansionPanelSummary expandIcon={<Code className={classes.whiteText} />}>
                                    <Typography className={[classes.heading, classes.whiteText].join(' ')}>Source code</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.leftMargin}>
                                        <pre>
                                            <code className="language-clike">
                                                {`// Returns length of longest common substring
// x, y - strings
// i - length of y
// j - length of x
// count must be 0
int CommonSubstrLength(char* x, char* y, int i, int j, int count)  
{
    if (i == 0 || j == 0)
    {
        return count;
    }
  
    if (x[i - 1] == y[j - 1])
    {
        count = CommonSubstrLength(i - 1, j - 1, count + 1);
    }

    int tmp1 = CommonSubstrLength(i, j - 1, 0);
    int tmp2 = CommonSubstrLength(i - 1, j, 0);

    if (tmp1 < 2)
    {
        tmp1 = tmp2;
    }

    if (count < tmp1)
    {
        count = tmp1;
    }

    return count;
}`}
                                            </code>
                                        </pre>

                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </div>
                </Paper>

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
                    <br />

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
                    <br />
                    <br />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.evaluate} disabled={this.state.doCycle}>
                        Start
                    </Button>
                    {(this.state.doCycle === true) &&
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.state.speed === 0 ? this.doStep : this.finish}>
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
                </Grid>
            </div>
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
        this.setState({ speed: 1000 });
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
            this.setState({ charX: this.state.stringX[this.cycleCounter - 1] })
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
        this.setState({ charY: "" });
        setTimeout(this.doStep, 1000 / this.state.speed)
    }

    private doStep = () => {
        this.setState({ charX: this.state.stringX[this.cycleCounter - 1], charY: this.state.stringY[this.innerCounter - 1] });

        if (this.innerCounter === 0) {
            this.table[this.cycleCounter][this.innerCounter] = 0;
            this.setState({ charY: "" });
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

export default withStyles(styles)(Substring);
