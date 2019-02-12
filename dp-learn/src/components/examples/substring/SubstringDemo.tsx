import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Avatar, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, TextField, Theme, Typography } from '@material-ui/core';
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles";

import { AnimatedDiv } from '../../Animated';
import myTheme from '../../../styles/index';
import { strings } from 'src/translations/languages';

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
    selectedCol: number
    selectedRow: number
    highlitedCells: string[]
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
        padding: '4px 24px 4px 14px',
    },
    columnCaption: {
        fontSize: theme.typography.pxToRem(14),
        textAlign: 'center',
        padding: theme.spacing.unit,
    },
    rowCaption: {
        fontSize: theme.typography.pxToRem(14),
    },
    tableCell: {
        textAlign: 'center',
        padding: 0,
        borderRight: '1px solid rgba(224, 224, 224, 1)',
    },
    highlitedCell: {
        backgroundColor: myTheme.palette.secondary.main
    },
    centeredContent: {
        textAlign: 'center',
        margin: theme.spacing.unit * 2,
        "& span": {
            fontSize: theme.typography.pxToRem(24),
            color: 'white',
            backgroundColor: myTheme.palette.secondary.main,
            padding: theme.spacing.unit,
            borderRadius: theme.spacing.unit * 2,
        }
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
    defaultAvatar: {
        backgroundColor: myTheme.palette.secondary.main
    },
    greenAvatar: {
        backgroundColor: 'green'
    },
    redAvatar: {
        backgroundColor: 'red'
    },
    table: {
        width: 'auto',
        "& td:last-child, th:last-child": {
            paddingRight: theme.spacing.unit
        },
    },
    incCell: {
        backgroundColor: myTheme.palette.secondary.light
    }
});

class SubstringDemo extends React.Component<AllProps, ISubstringDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;

    // To store table position of the result
    private tableRow: number;
    private tableCol: number;

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

    // Delay helper
    private delayHelper = 1500;

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
            buttonLabel: "Finish",
            selectedCol: 0,
            selectedRow: 0,
            highlitedCells: []
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                    {strings.substring.demo.title}
                </Typography>
                <div className={classes.bottomMargin}>
                    <Markdown source={strings.substring.demo.brief} />
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
                <br />
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
                <br />
                <Button variant="contained" className={classes.buttonDark} onClick={this.evaluate} disabled={this.state.doCycle}>
                    Start
                </Button>
                {(this.state.doCycle === true) &&
                    <Button variant="contained" color="primary" className={classes.buttonLight} onClick={this.state.speed === 0 ? this.doStep : this.finish}>
                        {this.state.buttonLabel}
                    </Button>
                }
                {(this.state.charX !== "" || this.state.charY !== "") &&
                    <div className={classes.avatars}>
                        <Avatar className={[classes.avatar, classes.defaultAvatar].join(' ')}>{this.state.charX}</Avatar>
                        <AnimatedDiv pose={this.state.charY === "" || this.state.speed === 0 ? 'empty' : (this.state.charX === this.state.charY ? 'match' : 'noMatch')}>
                            <Avatar
                                className={[classes.avatar, this.state.charY === "" ? classes.defaultAvatar :
                                    this.state.charX !== this.state.charY ? classes.redAvatar : classes.greenAvatar].join(' ')}
                            >
                                {this.state.charY}
                            </Avatar>
                        </AnimatedDiv>
                    </div>
                }
                {(this.state.eval === true) &&
                    <div>
                        <div className={classes.centeredContent}>
                            <span>
                                {this.state.result}
                            </span>
                        </div>
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
                    </div>
                }
            </div>
        );
    }

    private strXChange = (e: any) => {
        this.setState({ stringX: e.target.value });
    };

    private strYChange = (e: any) => {
        this.setState({ stringY: e.target.value });
    };

    private speedChange = (e: any) => {
        this.setState({ speed: +e.target.value });
    };

    private finish = () => {
        clearTimeout(this.timeout);
        this.setState({ speed: 0 });

        while (this.outerCounter <= this.LENGTH1) {
            this.doStep();
        }
        
        this.setState({ speed: 1});
    };

    private evaluate = () => {
        this.setState({
            buttonLabel: this.state.speed === 0 ? "Step" : "Finish",
            charX: "",
            charY: ""
        });

        this.table = [];
        this.tableCol = this.tableRow = 0;

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

        this.outerCounter = 1;

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
            this.timeout = setTimeout(this.doStep, this.delayHelper / this.state.speed);
        }
        else {
            this.doStep();
        }
    }

    private transitionHelper = () => {
        if (this.state.speed !== 0) {
            this.setState({ charY: "" });
            this.timeout = setTimeout(this.doStep, 500 / this.state.speed);
        }
    }

    private doStep = () => {
        // Only for speed === 0
        if (this.outerCounter > this.LENGTH1) {
            this.setFinalState();
            return;
        }

        this.setState({
            charX: this.state.stringX[this.outerCounter - 1],
            charY: this.state.stringY[this.innerCounter - 1],
            selectedCol: this.innerCounter,
            selectedRow: this.outerCounter,
            highlitedCells: []
        });

        if (this.innerCounter === 0) {
            this.table[this.outerCounter][this.innerCounter] = 0;
            this.setState({ charY: "" });
        }
        else if (this.state.stringX[this.outerCounter - 1] === this.state.stringY[this.innerCounter - 1]) {
            this.table[this.outerCounter][this.innerCounter] = this.table[this.outerCounter - 1][this.innerCounter - 1] + 1;

            // Flash
            if (this.outerCounter > 1 && this.innerCounter > 1) {
                this.incrementOn();
            }
            
            if (this.table[this.outerCounter][this.innerCounter] > this.table[this.tableRow][this.tableCol]) {
                this.tableRow = this.outerCounter;
                this.tableCol = this.innerCounter;
            }
        }
        else {
            this.table[this.outerCounter][this.innerCounter] = 0;
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
            this.setState({ result: "Current max. length: " + this.table[this.tableRow][this.tableCol].toString() });

            if (this.state.speed !== 0) {
                this.timeout = setTimeout(this.transitionHelper, this.delayHelper / this.state.speed);
            }
        }
        else {
            this.outerCounter++;
            if (this.outerCounter > this.LENGTH1) {
                this.timeout = setTimeout(this.setFinalState, this.delayHelper / this.state.speed);
            }
            else {
                this.setState({ result: "Current max. length: " + this.table[this.tableRow][this.tableCol].toString() });
                this.innerCounter = 0;
                this.timeout = setTimeout(this.transitionHelper, this.delayHelper / this.state.speed);
            }
        }
    }

    private incrementOn = () => {

        const cells = [`row ${this.outerCounter - 1},column ${this.innerCounter - 1}`];

        this.setState({ 
            highlitedCells: cells
        });

        if (this.state.speed !== 0) {
            setTimeout(this.incrementOff, (this.delayHelper / 2) / this.state.speed);
        }
    }

    private incrementOff = () => {
        this.setState({ highlitedCells: [] });
    }

    private setFinalState = () => {
        const cells: string[] = [];
        let finalString = "";

        for (let i = this.table[this.tableRow][this.tableCol] - 1; i >= 0; i--) {
            cells.push(`row ${this.tableRow - i},column ${this.tableCol - i}`);
            finalString += this.state.stringX[this.tableRow - i - 1];
        }


        this.setState({
            doCycle: false,
            result: `Longest common substring: "${finalString}", length is ${this.table[this.tableRow][this.tableCol]}.`,
            highlitedCells: cells,
            charX: "",
            charY: "",
            selectedCol: 0,
            selectedRow: 0
        });
    }

    // Return table heading
    private tableHead = (cols: number) => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={[classes.tableHeading, classes.caption].join(' ')}>Table</TableCell>)

        for (let i = 1; i < cols; i++) {
            const classNames = [classes.columnCaption, classes.caption];

            if (i === this.state.selectedCol) {
                classNames.push(classes.highlitedCell);
            }

            heading.push(
                <TableCell key={'columnName' + i.toString()} className={classNames.join(' ')}>
                    {`Y[${i - 1}] - ${this.state.stringY[i - 1]}`}
                </TableCell>);
        }

        return heading;
    }

    // Return table body
    private tableBody = () => {
        const { classes } = this.props;

        const body = [];
        let classNames = [];
        // i = 1 because 0 is heading
        for (let i = 1; i <= this.LENGTH1; i++) {
            const row = [];

            classNames = [classes.rowCaption, classes.caption];
            if (i === this.state.selectedRow) {
                classNames.push(classes.highlitedCell);
            }

            // Row names
            row.push(
                <TableCell key={`rowName ${i.toString()}`} className={classNames.join(' ')}>
                    {`X[${i - 1}] - ${this.state.stringX[i - 1]}`}
                </TableCell>
            );

            // Table body(content), j = 1 because 0 is row name
            for (let j = 1; j <= this.LENGTH2; j++) {
                classNames = [classes.tableCell];
                const key = `row ${i},column ${j}`;

                let value = this.state.table[i][j] === Number.MAX_VALUE ? "-" : this.state.table[i][j].toString();

                for (const highlitedKey in this.state.highlitedCells) {
                    if (this.state.highlitedCells[highlitedKey] === key) {
                        classNames.push(classes.incCell);

                        if (this.state.doCycle) {
                            value += ' + 1';
                        }
                    }
                }

                row.push(
                    <TableCell key={key} className={classNames.join(' ')}>
                        {value}
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
