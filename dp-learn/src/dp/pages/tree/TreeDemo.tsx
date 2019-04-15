import * as Markdown from 'react-markdown';
import * as React from 'react';

import { FreqArraySum, GetNumbers, ValueOrIntMax, ValueOrUndefined } from 'src/helpers/Helpers';
import { Grid, TableCell, TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from "@material-ui/core/styles";

import BottomedDiv from 'src/hoc/BottomedDiv';
import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import CustomTitle from 'src/hoc/CustomTitle';
import DemoTable from 'src/components/dpComponents/DemoTable';
import FlexOne from 'src/hoc/FlexOne';
import FlexTwo from 'src/hoc/FlexTwo';
import Formula from 'src/hoc/Formula';
import SpeedSelector from 'src/components/customComponents/SpeedSelector';
import { demoStyle } from 'src/styles/globalStyles';
import { strings } from 'src/strings/languages';
import { treeFormula } from 'src/dp/helpers/tree/treeStrings';

interface ITreeDemoState {
    speed: number
    inProgress: boolean
    tableVisible: boolean
    table: Array<Array<[number, number]>>
    result: string
    currentState: string
    givenKeys: string
    givenFreqs: string
    highlightCurrent: boolean
    highlightedToSum: Array<[number, number]>
    highlightFreqs: boolean
}

type AllProps =
    WithStyles<typeof demoStyle>;

class TreeDemo extends React.Component<AllProps, ITreeDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;
    private mostInnerCounter: number;

    private nextAutomataState:
        'doInnerCycle' |
        'doRootCycle' |
        'nextRootCycle' |
        'nextInnerCycle' |
        'showSumRes' |
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
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.tree.demo.title}
                </CustomTitle>
                <BottomedDiv>
                    <Markdown source={strings.tree.demo.brief} />
                </BottomedDiv>
                <Grid container={true} direction='row'>
                    <FlexOne>
                        <Grid container={true} direction='column'>
                            <CustomTextField label={`${strings.tree.arrayOfK} (max. 15)`} value={this.state.givenKeys} onChange={this.handleKeys} />
                            <CustomTextField label={`${strings.tree.arrayOfF} (max. 15)`} value={this.state.givenFreqs} onChange={this.handleFreqs} />
                        </Grid>

                        {/* Speed select */}
                        <SpeedSelector onClick={this.speedChange} speed={this.state.speed.toString()} />
                        <br />

                        <Grid container={true} direction='row'>
                            {/* Start button */}
                            <CustomButton label={strings.global.start} onClick={this.onStartClick} disabled={false} />

                            {/* Step button */}
                            <CustomButton label={strings.global.step} onClick={this.finiteAutomata} disabled={!this.state.inProgress || this.state.speed !== 0} />

                            {/* Finish button */}
                            <CustomButton label={strings.global.finish} onClick={this.onFinishClick} disabled={!this.state.inProgress} />
                        </Grid>
                    </FlexOne>
                    <FlexTwo>
                        <Formula>
                            {treeFormula}
                        </Formula>
                    </FlexTwo>
                </Grid>
                <br />

                {/* Table and result */}
                <DemoTable cols={this.LENGTH + 1} visible={this.state.tableVisible} result={this.state.result} head={this.tableHead} body={this.tableBody} currentState={this.state.currentState} />
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

        if (+e.target.value === 0) {
            clearTimeout(this.timeout);
        }
        else if (this.state.inProgress) {
            this.setTimeout(this.finiteAutomata);
        }
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
            this.setState({ result: strings.global.invalidArg });
            return;
        }

        this.LENGTH = this.keys.length;

        const localTable: Array<Array<[number, number]>> = [];

        // Initialize
        // For a single key, cost is equal to frequency of the key 
        for (let i = 0; i < this.LENGTH; i++) {
            localTable[i] = [];
            localTable[i][i] = [this.freqs[i], i];
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
        table[this.innerCounter][this.columnNumber] = [Number.MAX_VALUE, -1];
        this.mostInnerCounter = this.innerCounter - 1;   // - 1 for proper incremented value

        this.setState({
            table,
            highlightCurrent: true,
            currentState: strings.tree.demo.assignedIntMax
        });
        this.nextAutomataState = 'nextRootCycle';
    }

    private doRootCycle = () => {
        if (this.mostInnerCounter <= this.columnNumber) {
            const highlightedToSum: Array<[number, number]> = [];
            if (this.mostInnerCounter > this.innerCounter) {
                highlightedToSum.push([this.innerCounter, this.mostInnerCounter - 1])
            }
            if (this.mostInnerCounter < this.columnNumber) {
                highlightedToSum.push([this.mostInnerCounter + 1, this.columnNumber])
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
            this.valueToAssign += this.state.table[element[0]][element[1]][0];
        });

        this.valueToAssign += FreqArraySum(this.freqs, this.innerCounter, this.columnNumber);
        const currentVal = this.state.table[this.innerCounter][this.columnNumber][0];

        if (this.valueToAssign < currentVal) {
            const table = [...this.state.table];
            table[this.innerCounter][this.columnNumber] = [this.valueToAssign, this.mostInnerCounter];

            this.setState({
                table,
                currentState: `${this.valueToAssign} < ${ValueOrIntMax(currentVal)}. ${strings.demoGlobal.assigning}`
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

        this.mostInnerCounter++;
        this.doRootCycle();
    }

    private nextInnerCycle = () => {
        if (this.innerCounter + 1 > this.LENGTH - this.outerCounter) {
            if (this.outerCounter + 1 > this.LENGTH) {
                this.setFinalState(this.state.table);
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
        const table: Array<Array<[number, number]>> = [];

        /* table[i][j] = Optimal cost of binary search tree 
           that can be  formed from keys[i] to keys[j]. 
           table[0][n-1] will store the resultant table */

        // For a single key, cost is equal to frequency of the key 
        for (let i = 0; i < this.LENGTH; i++) {
            table[i] = []
            table[i][i] = [this.freqs[i], i];
        }

        // Now we need to consider chains of length 2, 3, ... . 
        // L is chain length. 
        for (let outerCounter = 2; outerCounter <= this.LENGTH; outerCounter++) {
            // i is row number in table[][] 
            for (let innerCounter = 0; innerCounter <= this.LENGTH - outerCounter; innerCounter++) {
                // Get column number j from row number i and  
                // chain length L

                const columnNumber = innerCounter + outerCounter - 1;
                table[innerCounter][columnNumber] = [Number.MAX_VALUE, -1];

                // Try making all keys in interval keys[i..j] as root 
                for (let mostInnerCounter = innerCounter; mostInnerCounter <= columnNumber; mostInnerCounter++) {
                    // c = cost when keys[r] becomes root of this subtree 
                    const val = ((mostInnerCounter > innerCounter) ? table[innerCounter][mostInnerCounter - 1][0] : 0) +
                        ((mostInnerCounter < columnNumber) ? table[mostInnerCounter + 1][columnNumber][0] : 0) +
                        FreqArraySum(this.freqs, innerCounter, columnNumber);

                    if (val < table[innerCounter][columnNumber][0]) {
                        table[innerCounter][columnNumber] = [val, mostInnerCounter];
                    }
                }
            }
        }

        this.outerCounter = this.LENGTH;    // To show proper value in table
        this.setState({ table });
        this.setFinalState(table);
    };

    private setFinalState = (table: Array<Array<[number, number]>>) => {
        this.disableHighlighting();
        this.setState({
            inProgress: false,
            currentState: strings.global.done,
            result: `${strings.tree.demo.cost}: ${table[0][this.LENGTH - 1][0]}`,
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
                    {`${strings.tree.demo.key} ${this.keys[i]}`}
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

            // Row names
            row.push(
                <TableCell key={`rowName ${i.toString()}`} className={classNames.join(' ')}>
                    {`${strings.tree.demo.key} ${this.keys[i]}`}
                </TableCell>
            );

            for (let j = 0; j < this.LENGTH; j++) {
                const key = `row ${i}, column ${j}`;

                let value: string = '';

                if (this.state.table[i][j] !== undefined) {
                    if (this.state.table[i][j][0] === Number.MAX_VALUE) {
                        value = 'INT_MAX';
                    }
                    else {
                        value = ValueOrUndefined(this.state.table[i][j][0]);
    
                        if (this.state.table[i][j][1] !== -1) {
                            value += ` (${this.state.table[i][j][1]})`;
                        }
                    }
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

export default withStyles(demoStyle)(TreeDemo);
