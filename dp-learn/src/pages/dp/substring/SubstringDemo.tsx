import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Avatar, Grid, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from "@material-ui/core/styles";

import { AnimatedDiv } from 'src/components/animations/Animated';
import DemoTable from 'src/components/fields/DemoTable';
import MyButton from 'src/components/buttons/MyButton';
import SpeedSelector from 'src/components/buttons/SpeedSelector';
import { demoStyles } from 'src/styles/demoStyles';
import { strings } from 'src/strings/languages';

interface ISubstringDemoState {
    stringX: string
    stringY: string
    charX: string
    charY: string
    speed: number
    inProgress: boolean
    tableVisible: boolean
    result: string
    table: number[][]
    selectedCol: number
    selectedRow: number
    highlitedCells: string[]
}

type AllProps =
    WithStyles<typeof demoStyles>;

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
            speed: 1,
            inProgress: false,
            tableVisible: false,
            result: "",
            table: [],
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
                <SpeedSelector onClick={this.speedChange} speed={this.state.speed.toString()} />
                <br />

                {/* Start button */}
                <MyButton color='dark' label={strings.global.start} onClick={this.onStartClick} visible={true} />

                {/* Step button */}
                <MyButton color='light' label={strings.global.step} onClick={this.onStepClick} visible={this.state.inProgress && this.state.speed === 0} />

                {/* Finish button */}
                <MyButton color='light' label={strings.global.finish} onClick={this.onFinishClick} visible={this.state.inProgress} />

                {/* Animated avatars */}
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

                {/* Table and result */}
                <DemoTable subRes="" cols={this.LENGTH2 + 1} visible={this.state.tableVisible} result={this.state.result} head={this.tableHead} body={this.tableBody} />
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

    private onStartClick = () => {
        this.setState({
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
            tableVisible: true,
            inProgress: true,
            table: this.table,
            result: "Current result: 0"
        });

        this.innerCounter = 0;

        // Check if auto play or debugging
        if (this.state.speed !== 0) {
            this.timeout = setTimeout(this.onStepClick, this.delayHelper / this.state.speed);
        }
        else {
            this.onStepClick();
        }
    }

    private transitionHelper = () => {
        if (this.state.speed !== 0) {
            this.setState({ charY: "" });
            this.timeout = setTimeout(this.onStepClick, 500 / this.state.speed);
        }
    }

    private onStepClick = () => {
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
                this.onStepClick();
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

    private onFinishClick = () => {
        clearTimeout(this.timeout);
        this.setState({ speed: 0 });

        while (this.outerCounter <= this.LENGTH1) {
            this.onStepClick();
        }

        this.setState({ speed: 1 });
    };

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
            inProgress: false,
            result: `Longest common substring: "${finalString}", length is ${this.table[this.tableRow][this.tableCol]}.`,
            highlitedCells: cells,
            charX: "",
            charY: "",
            selectedCol: 0,
            selectedRow: 0
        });
    }

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={[classes.tableHeading, classes.caption].join(' ')}>Table</TableCell>)

        for (let i = 1; i < this.LENGTH2 + 1; i++) {
            const classNames = [classes.columnCaption, classes.caption];

            if (i === this.state.selectedCol) {
                classNames.push(classes.yellowCell);
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
                classNames.push(classes.yellowCell);
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
                const key = `row ${i}, column ${j}`;

                let value = this.state.table[i][j] === Number.MAX_VALUE ? "-" : this.state.table[i][j].toString();

                for (const highlitedKey in this.state.highlitedCells) {
                    if (this.state.highlitedCells[highlitedKey] === key) {
                        classNames.push(classes.incCell);

                        if (this.state.inProgress) {
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

export default withStyles(demoStyles)(SubstringDemo);
