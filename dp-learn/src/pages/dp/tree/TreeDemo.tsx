import * as Markdown from 'react-markdown';
import * as React from 'react';

import { FreqArraySum, GetNumbers, ValueOrIntMax, ValueOrUndefined } from 'src/helpers/Helpers';
import { Grid, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from "@material-ui/core/styles";

import DemoTable from 'src/components/fields/DemoTable';
import MyButton from 'src/components/buttons/MyButton';
import SpeedSelector from 'src/components/buttons/SpeedSelector';
import { demoStyles } from 'src/styles/demoStyles';
import { strings } from 'src/strings/languages';

interface ITreeDemoState {
    givenKeys: string
    givenFreqs: string
    speed: number
    inProgress: boolean
    tableVisible: boolean
    result: string
    currentState: string
    table: number[][]
    highlightCurrent: boolean
    highlightedToSum: Array<[number, number]>
    highlightFreqs: boolean
}

type AllProps =
    WithStyles<typeof demoStyles>;

class TreeDemo extends React.Component<AllProps, ITreeDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;
    private rootCounter: number;

    private nextAutomataState:
        'doInnerCycle' |
        'doRootCycle' |
        'nextRootCycle' |
        'nextInnerCycle' |
        'showSumRes' |
        'final' |
        'done'
        = 'done';

    private keys: number[];
    private freqs: number[];

    private columnNumber: number;
    private valueToAssign: number;

    // Length of strings
    private LENGTH: number;

    // Timeout
    private timeout: any;

    ////////////////////////////////////////////////////////////////////////////

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenKeys: '1,2,3,4',
            givenFreqs: '2,4,6,8',
            speed: 1,
            inProgress: false,
            tableVisible: false,
            result: '',
            table: [],
            currentState: '...',
            highlightCurrent: false,
            highlightedToSum: [],
            highlightFreqs: false,
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                    {strings.tree.demo.title}
                </Typography>
                <div className={classes.bottomMargin}>
                    <Markdown source={strings.tree.demo.brief} />
                </div>
                <Grid className={[classes.container, classes.bottomMargin].join(' ')}>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="keysArrayTF"
                            label={strings.tree.arrayOfK}
                            className={classes.textField}
                            value={this.state.givenKeys}
                            onChange={this.handleKeys}
                            margin="normal"
                        />
                    </form>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="freqsArrayTF"
                            label={strings.tree.arrayOfF}
                            className={classes.textField}
                            value={this.state.givenFreqs}
                            onChange={this.handleFreqs}
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
                <MyButton color='light' label={strings.global.step} onClick={this.finiteAutomata} visible={this.state.inProgress && this.state.speed === 0} />

                {/* Finish button */}
                <MyButton color='light' label={strings.global.finish} onClick={this.onFinishClick} visible={this.state.inProgress} />

                {/* Table and result */}
                <DemoTable cols={this.LENGTH + 1} visible={this.state.tableVisible} result={this.state.result} head={this.tableHead} body={this.tableBody} subRes={this.state.currentState} />
            </div>
        );
    }

    private handleKeys = (e: any) => {
        let sum = 0;
        for (const key of e.target.value.split(",")) {
            if (Number.isNaN(+key)) {
                return;
            }
            sum++;
        }
        if (sum <= 15) {
            this.setState({ givenKeys: e.target.value, tableVisible: false, inProgress: false });
        }
    }

    private handleFreqs = (e: any) => {
        let sum = 0;
        for (const freq of e.target.value.split(",")) {
            if (Number.isNaN(+freq)) {
                return;
            }
            sum++;
        }
        if (sum <= 15) {
            this.setState({ givenFreqs: e.target.value, tableVisible: false, inProgress: false });
        }
    }

    private speedChange = (e: any) => {
        this.setState({ speed: +e.target.value });
    };

    private setTimeout = (func: () => void) => {
        this.timeout = setTimeout(func, 5000 / this.state.speed);
    }

    private onStartClick = () => {
        clearTimeout(this.timeout);
        this.disableHighlighting();

        this.keys = GetNumbers(this.state.givenKeys);
        this.freqs = GetNumbers(this.state.givenFreqs);

        if (this.keys.length === 0 || this.keys.length !== this.freqs.length) {
            this.setState({ result: 'Error parsing arguments' });
            return;
        }

        this.LENGTH = this.keys.length;

        const localTable: number[][] = []

        // Initialize
        // For a single key, cost is equal to frequency of the key 
        for (let i = 0; i < this.LENGTH; i++) {
            localTable[i] = [];
            localTable[i][i] = this.freqs[i];
        }

        this.outerCounter = 2;
        this.innerCounter = 0;

        this.setState({
            tableVisible: true,
            inProgress: true,
            result: '',
            currentState: `${strings.tree.demo.evalChainLength} ${this.outerCounter}`,
            table: localTable,
        });

        this.nextAutomataState = 'doInnerCycle';
        // Check if auto play or step by step
        if (this.state.speed !== 0) {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private finiteAutomata = () => {
        // Finite automata
        switch (this.nextAutomataState) {
            case 'doInnerCycle':
                this.doInnerCycle();
                break;
            case 'doRootCycle':
                this.doRootCycle();
                break;
            case 'nextRootCycle':
                this.nextRootCycle();
                break;
            case 'nextInnerCycle':
                this.nextInnerCycle();
                break;
            case 'showSumRes':
                this.showSumRes();
                break;
            case 'final':
                this.setFinalState();
                this.nextAutomataState = 'done';
        }

        // if speed != 0, setTimeout is needed
        const auto: boolean = this.state.speed !== 0;

        if (auto && this.nextAutomataState !== 'done') {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private doInnerCycle = () => {
        this.columnNumber = this.innerCounter + this.outerCounter - 1;
        this.assignIntMax();
    }

    private assignIntMax = () => {
        const table = [...this.state.table];
        table[this.innerCounter][this.columnNumber] = Number.MAX_VALUE;
        this.rootCounter = this.innerCounter - 1;   // - 1 for proper incremented value

        this.setState({
            table,
            highlightCurrent: true,
            currentState: strings.tree.demo.assignedIntMax
        });
        this.nextAutomataState = 'nextRootCycle';
    }

    private doRootCycle = () => {
        if (this.rootCounter <= this.columnNumber) {
            const highlightedToSum: Array<[number, number]> = [];
            if (this.rootCounter > this.innerCounter) {
                highlightedToSum.push([this.innerCounter, this.rootCounter - 1])
            }
            if (this.rootCounter < this.columnNumber) {
                highlightedToSum.push([this.rootCounter + 1, this.columnNumber])
            }

            this.setState({
                highlightedToSum,
                currentState: strings.tree.demo.selectedToSum
            });
            this.nextAutomataState = 'showSumRes';
        }
        else {
            this.nextInnerCycle();
        }
    }

    private showSumRes = () => {
        this.valueToAssign = 0;
        this.state.highlightedToSum.forEach(element => {
            this.valueToAssign += this.state.table[element[0]][element[1]];
        });

        this.valueToAssign += FreqArraySum(this.freqs, this.innerCounter, this.columnNumber);

        const currentVal = this.state.table[this.innerCounter][this.columnNumber];

        if (this.valueToAssign < currentVal) {
            const table = [...this.state.table];
            table[this.innerCounter][this.columnNumber] = this.valueToAssign

            this.setState({
                table,
                currentState: `${this.valueToAssign} < ${ValueOrIntMax(currentVal)}, ${strings.tree.demo.assigning}`
            });
        }
        else {
            this.setState({
                currentState: `${this.valueToAssign} >= ${ValueOrIntMax(currentVal)}, ${strings.tree.demo.nothingToDo}`
            });
        }

        this.nextAutomataState = 'nextRootCycle';
    }

    private nextRootCycle = () => {
        this.setState({
            highlightedToSum: [],
        });

        this.rootCounter++;
        this.doRootCycle();
    }

    private nextInnerCycle = () => {
        if (this.innerCounter + 1 > this.LENGTH - this.outerCounter) {
            if (this.outerCounter + 1 > this.LENGTH) {
                this.setFinalState();
                return;
            }
            else {
                this.outerCounter++;
                this.innerCounter = 0;

                this.setState({
                    highlightCurrent: false,
                    currentState: `${strings.tree.demo.evalChainLength} ${this.outerCounter}`,
                });
            }
        }
        else {
            this.setState({
                highlightCurrent: false,
                currentState: strings.tree.demo.nextCell
            });

            this.innerCounter++;
        }

        this.nextAutomataState = 'doInnerCycle';
    }

    private onFinishClick = () => {
        clearTimeout(this.timeout);

        /* Create an auxiliary 2D matrix to store results  
        of subproblems */
        const table: number[][] = [];


        /* table[i][j] = Optimal cost of binary search tree 
           that can be  formed from keys[i] to keys[j]. 
           table[0][n-1] will store the resultant table */

        // For a single key, cost is equal to frequency of the key 
        for (let i = 0; i < this.LENGTH; i++) {
            table[i] = []
            table[i][i] = this.freqs[i];
        }


        // Now we need to consider chains of length 2, 3, ... . 
        // L is chain length. 
        for (let outerCounter = 2; outerCounter <= this.LENGTH; outerCounter++) {
            // i is row number in table[][] 
            for (let innerCounter = 0; innerCounter <= this.LENGTH - outerCounter; innerCounter++) {
                // Get column number j from row number i and  
                // chain length L

                const columnNumber = innerCounter + outerCounter - 1;
                table[innerCounter][columnNumber] = Number.MAX_VALUE;

                // Try making all keys in interval keys[i..j] as root 
                for (let rootCounter = innerCounter; rootCounter <= columnNumber; rootCounter++) {
                    // c = cost when keys[r] becomes root of this subtree 
                    const val = ((rootCounter > innerCounter) ? table[innerCounter][rootCounter - 1] : 0) +
                        ((rootCounter < columnNumber) ? table[rootCounter + 1][columnNumber] : 0) +
                        FreqArraySum(this.freqs, innerCounter, columnNumber);

                    if (val < table[innerCounter][columnNumber]) {
                        table[innerCounter][columnNumber] = val;
                    }
                }
            }
        }

        this.outerCounter = this.LENGTH;    // To show proper value in table
        this.disableHighlighting();
        this.setState({
            table,
            inProgress: false,
            currentState: strings.tree.demo.done,
            result: `Result: ${table[0][this.LENGTH - 1]}`
        });
    };

    private setFinalState = () => {
        this.disableHighlighting();
        this.setState({
            inProgress: false,
            currentState: strings.tree.demo.done,
            result: `Result: ${this.state.table[0][this.LENGTH - 1]}`,
        });
    }

    private disableHighlighting = () => {
        this.setState({
            highlightCurrent: false,
            highlightFreqs: false,
            highlightedToSum: [],
        });
    }

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={classes.caption} />)

        for (let i = 0; i < this.LENGTH; i++) {
            const classNames = [];

            if (this.state.highlightedToSum.length > 0 && i >= this.innerCounter && i <= this.columnNumber) {
                classNames.push(classes.tableCell, classes.yellowCell);
            }
            else {
                classNames.push(classes.columnCaption, classes.caption);
            }

            heading.push(
                <TableCell key={'columnName' + i.toString()} className={classNames.join(' ')}>
                    {`${this.freqs[i]}`}
                </TableCell>);
        }

        return heading;
    }

    // Return table body
    private tableBody = () => {
        const { classes } = this.props;

        const body = [];
        let classNames = [];

        for (let i = 0; i < this.LENGTH; i++) {
            const row = [];

            classNames = [classes.rowCaption, classes.caption];
            // if (this.state.highlightColRow && i === this.outerCounter) {
            //     classNames.push(classes.blueCell);
            // }

            // Row names
            row.push(
                <TableCell key={`rowName ${i.toString()}`} className={classNames.join(' ')}>
                    {`${this.keys[i]}`}
                </TableCell>
            );

            for (let j = 0; j < this.LENGTH; j++) {
                const key = `row ${i}, column ${j}`;

                let value: string;

                if (this.state.table[i][j] === Number.MAX_VALUE) {
                    value = 'INT_MAX';
                }
                else {
                    value = ValueOrUndefined(this.state.table[i][j]);
                }

                classNames = [classes.tableCell];

                // Highlight cell with INT_MAX value
                if (this.state.highlightCurrent && i === this.innerCounter && j === this.columnNumber) {
                    classNames.push(classes.blueCell);
                }

                if (this.state.highlightedToSum.length > 0) {
                    this.state.highlightedToSum.forEach(element => {
                        if (element[0] === i && element[1] === j) {
                            classNames.push(classes.yellowCell);
                            // TODO break
                        }
                    });
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

export default withStyles(demoStyles)(TreeDemo);
