// author: Tomáš Nereča, 2019

// Codes for optimization problem solutiom are inspirated by https://www.geeksforgeeks.org/edit-distance-dp-5/

import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Grid, TableCell, TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { min, minPosition } from 'src/helpers';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import CustomButton from 'src/components/customStyled/CustomButton';
import CustomTextField from 'src/components/customStyled/CustomTextField';
import CustomTitle from 'src/components/hoc/CustomTitle';
import DemoTable from 'src/components/specialized/DemoTable';
import FlexOne from 'src/components/hoc/FlexOne';
import FlexTwo from 'src/components/hoc/FlexTwo';
import Formula from 'src/components/hoc/Formula';
import SpeedSelector from 'src/components/specialized/SpeedSelector';
import { editDistFormula } from 'src/strings/dpProblemsStrings/EditDistanceStrings';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/strings';

interface ISubstringDemoState {
    stringX: string
    stringY: string
    speed: string
    inProgress: boolean
    tableVisible: boolean
    result: string
    table: number[][]
    highlightingOn: boolean
    highlightPrevious: boolean
    highlightCandidates: boolean
    highlightMin: boolean
    currentState: string
}

type AllProps =
    WithStyles<typeof globalStyles>;

// Edit distance problem demo
class EditDistanceDemo extends React.Component<AllProps, ISubstringDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;

    private nextAutomataState:
        'assignInner' |
        'assignOuter' |
        'assignPrevious' |
        'findMin' |
        'nextInnerLoop' |
        'assignMin' |
        'done'
        = 'done';

    // Tuple for table position of min
    private minPosition: [number, number];

    // Green highlighted cels of solution - chosen operations
    private greenCells: Array<[number, number]>;

    // Blue highlighted cels of solution - diferent characters
    private blueCells: Array<[number, number]>;

    // Length of strings
    private LENGTH1: number;
    private LENGTH2: number;

    // Timeout
    private timeout: any;
    private speed: number = 1;

    ////////////////////////////////////////////////////////////////////////////

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            stringX: "AdRemovee",
            stringY: "AddRemove",
            speed: '9',
            inProgress: false,
            tableVisible: false,
            result: "",
            table: [],
            highlightingOn: false,
            highlightPrevious: false,
            highlightCandidates: false,
            highlightMin: false,
            currentState: '...'
        }
    }

    public render() {
        return (
            <div>
                <CustomTitle variant='h2'>
                    {strings.editDistance.demo.title}
                </CustomTitle>
                <BottomMarginDiv>
                    <Markdown source={strings.editDistance.demo.brief} />
                </BottomMarginDiv>
                <Grid container={true} direction='row'>
                    <FlexOne>
                        <Grid container={true} direction='column'>
                            <CustomTextField label={`${strings.global.string} X (max. 20)`} value={this.state.stringX} onChange={this.handlestrXChange} />
                            <CustomTextField label={`${strings.global.string} Y (max. 20)`} value={this.state.stringY} onChange={this.handlestrYChange} />
                        </Grid>

                        {/* Speed select */}
                        <SpeedSelector onClick={this.speedChange} speed={this.state.speed} />
                        <br />

                        <Grid container={true} direction='row'>
                            {/* Start button */}
                            <CustomButton label={strings.demoGlobal.start} onClick={this.handleStartClick} disabled={false} />

                            {/* Step button */}
                            <CustomButton label={strings.demoGlobal.step} onClick={this.finiteAutomata} disabled={!this.state.inProgress || +this.state.speed !== 0} />

                            {/* Finish button */}
                            <CustomButton label={strings.demoGlobal.finish} onClick={this.handleFinishClick} disabled={!this.state.inProgress} />
                        </Grid>
                    </FlexOne>
                    <FlexTwo>
                        <Formula>
                            {editDistFormula}
                        </Formula>
                    </FlexTwo>
                </Grid>
                <br />

                {/* Table and result */}
                <DemoTable currentState={this.state.currentState} cols={this.LENGTH2 + 2} visible={this.state.tableVisible} result={this.state.result} head={this.tableHead} body={this.tableBody} />
            </div>
        );
    }

    private handlestrXChange = (e: any) => {
        if (e.target.value.length <= 20) {
            clearTimeout(this.timeout);
            this.setState({ stringX: e.target.value, tableVisible: false,inProgress: false, result:'', });
        }
    };

    private handlestrYChange = (e: any) => {
        if (e.target.value.length <= 20) {
            clearTimeout(this.timeout);
            this.setState({ stringY: e.target.value, tableVisible: false, inProgress: false, result:'', });
        }
    };

    private speedChange = (e: any) => {
        this.setState({ speed: e.target.value });
        this.speed = +e.target.value;
            
        clearTimeout(this.timeout);

        if (+e.target.value !== 0 && this.state.inProgress) {
            this.finiteAutomata();
        }
    };

    private setTimeout = (func: () => void) => {
        this.timeout = setTimeout(func, 9000 / this.speed);
    }

    private handleStartClick = () => {
        clearTimeout(this.timeout);

        this.LENGTH1 = this.state.stringX.length;
        this.LENGTH2 = this.state.stringY.length;

        const table: number[][] = []

        // Initialize
        for (let i = 0; i <= this.LENGTH1; i++) {
            table[i] = [];
        }

        this.outerCounter = 0;
        this.innerCounter = 0;

        this.setState({
            tableVisible: true,
            inProgress: true,
            result: strings.demoGlobal.evaluation,
            table,
            highlightingOn: true
        });

        // Start immediately with inner loop
        this.doInnerLoop();

        // Check if auto play or step by step
        if (this.speed !== 0) {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private finiteAutomata = () => {
        // Finite automata
        switch (this.nextAutomataState) {
            case 'assignInner':
                this.assignInner();
                break;
            case 'assignOuter':
                this.assignOuter();
                break;
            case 'findMin':
                this.findMin();
                break;
            case 'assignMin':
                this.assignMin();
                break;
            case 'assignPrevious':
                this.assignPrevious();
                break;
            case 'nextInnerLoop':
                this.nextInnerLoop();
                break;
        }

        // if speed != 0, setTimeout is needed
        const auto: boolean = this.speed !== 0;

        if (auto && this.nextAutomataState !== 'done') {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private doInnerLoop = () => {
        let currentState: string;

        // String X is empty, insert all characters of string Y
        if (this.outerCounter === 0) {
            currentState = strings.editDistance.demo.stringXEmpty;
            this.nextAutomataState = 'assignInner';
        }

        // String Y is empty, remove all characters of string X
        else if (this.innerCounter === 0) {
            currentState = strings.editDistance.demo.stringYEmpty;
            this.nextAutomataState = 'assignOuter';
        }

        // Last characters are same, no operation needed
        else if (this.state.stringX[this.outerCounter - 1] === this.state.stringY[this.innerCounter - 1]) {
            currentState = strings.editDistance.demo.charactersSame
            this.nextAutomataState = 'assignPrevious';
        }
        // Characters different, need to find best operation
        else {
            currentState = strings.editDistance.demo.charactersDiff;
            this.nextAutomataState = 'findMin';
            this.setState({ highlightCandidates: true });
        }

        this.setState({ currentState });
    }

    private assignInner = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = this.innerCounter;

        this.setState({
            table,
        });
        this.nextAutomataState = 'nextInnerLoop';
    }

    private assignOuter = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = this.outerCounter;

        this.setState({
            table,
        });
        this.nextAutomataState = 'nextInnerLoop';
    }

    private assignPrevious = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = this.state.table[this.outerCounter - 1][this.innerCounter - 1];

        this.setState({
            table,
            highlightPrevious: true
        });
        this.nextAutomataState = 'nextInnerLoop';
    }

    private findMin = () => {
        this.minPosition = minPosition(
            [this.state.table[this.outerCounter][this.innerCounter - 1], [this.outerCounter, this.innerCounter - 1]],
            [this.state.table[this.outerCounter - 1][this.innerCounter], [this.outerCounter - 1, this.innerCounter]],
            [this.state.table[this.outerCounter - 1][this.innerCounter - 1], [this.outerCounter - 1, this.innerCounter - 1]]
        );

        this.setState({ highlightMin: true, currentState: strings.demoGlobal.best });

        this.nextAutomataState = 'assignMin';
    }

    private assignMin = () => {
        const table = [...this.state.table];
        const value = 1 + this.state.table[this.minPosition[0]][this.minPosition[1]];
        table[this.outerCounter][this.innerCounter] = value;

        this.setState({
            table,
            currentState: `${strings.demoGlobal.assigning} ${value}`
        });
        this.nextAutomataState = 'nextInnerLoop';
    }

    private nextInnerLoop = () => {
        this.setState({
            highlightPrevious: false,
            highlightCandidates: false,
            highlightMin: false
        });

        if (this.innerCounter + 1 > this.LENGTH2) {
            if (this.outerCounter + 1 > this.LENGTH1) {
                this.nextAutomataState = 'done';
                this.setFinalState(this.state.table);
                return;
            }
            else {
                this.outerCounter++;
                this.innerCounter = 0;
            }
        }
        else {
            this.innerCounter++;
        }

        this.doInnerLoop();
    }

    private handleFinishClick = () => {
        clearTimeout(this.timeout);
        const table: number[][] = [];

        for (let i = 0; i <= this.LENGTH1; i++) {
            table[i] = [];
            for (let j = 0; j <= this.LENGTH2; j++) {
                // First string is empty, insert all characters of second string 
                if (i === 0) {
                    table[i][j] = j;  // Min. operations = j 
                }

                // Second string is empty, remove all characters of first string 
                else if (j === 0) {
                    table[i][j] = i; // Min. operations = i 
                }

                // Last characters same, continue to next characters
                else if (this.state.stringX[i - 1] === this.state.stringY[j - 1]) {
                    table[i][j] = table[i - 1][j - 1];
                }

                // Last character is different, try all
                // possibilities and find the minimum
                else {
                    table[i][j] = 1 + min(table[i][j - 1],  // Insert 
                        table[i - 1][j],  // Remove 
                        table[i - 1][j - 1]); // Replace
                }
            }
        }

        this.outerCounter = this.LENGTH1;    // To show proper value in table

        this.setState({
            table,
        });

        this.setFinalState(table);
    };

    private setFinalState = (table: number[][]) => {
        // let start: [number, number] = [this.LENGTH1, this.LENGTH2];
        this.blueCells = [];
        this.greenCells = [];
        const operations: string[] = [];

        /*****************************************************************************************************************/
        // Inspirated by https://github.com/mission-peace/interview/blob/master/src/com/interview/dynamic/EditDistance.java
        
        let i = this.LENGTH1;
        let j = this.LENGTH2;

        while(true) {
            if (i === 0 && j === 0) {
                break;
            }

            if (i === 0) {
                this.greenCells.push([i, j - 1]);
                this.blueCells.push([i, j]);
                operations.push('🖊');
                j -= 1;
            }
            else if (j === 0) {
                this.greenCells.push([i - 1, j]);
                this.blueCells.push([i, j]);
                operations.push('✗');
                i -= 1;
            }
            else if (this.state.stringX[i - 1] === this.state.stringY[j - 1]) {
                i -= 1;
                j -= 1;
            }
            else if (table[i][j] === table[i - 1][j - 1] + 1) {
                this.greenCells.push([i - 1, j - 1]);
                this.blueCells.push([i, j]);
                operations.push('↔');

                i -= 1;
                j -= 1;
            }
            else if (table[i][j] === table[i - 1][j] + 1) {
                this.greenCells.push([i - 1, j]);
                this.blueCells.push([i, j]);
                operations.push('✗');

                i -= 1;
            }
            else if (table[i][j] === table[i][j - 1] + 1) {
                this.greenCells.push([i, j - 1]);
                this.blueCells.push([i, j]);
                operations.push('🖊');

                j -= 1;
            }
        }
        /****************************************************************************************************/

        this.setState({
            inProgress: false,
            highlightingOn: false,
            currentState: strings.demoGlobal.done,
            result: `${strings.editDistance.demo.opNumber}: ${table[this.LENGTH1][this.LENGTH2]}, ${strings.editDistance.demo.usedOps}: ${operations.join(', ')}`,
        });
    }

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={classes.caption} />)

        for (let i = 0; i <= this.LENGTH2; i++) {
            const classNames = [classes.columnCaption, classes.caption];

            heading.push(
                <TableCell key={'columnName' + i.toString()} className={classNames.join(' ')}>
                    {i === 0 ? strings.editDistance.demo.empty : this.state.stringY[i - 1]}
                </TableCell>);
        }

        return heading;
    }

    // Return table body
    private tableBody = () => {
        const { classes } = this.props;

        const body = [];
        let classNames = [];

        for (let i = 0; i <= this.LENGTH1; i++) {
            const row = [];

            classNames = [classes.rowCaption, classes.caption];

            // Row names
            row.push(
                <TableCell key={`rowName ${i.toString()}`} className={classNames.join(' ')}>
                    {i === 0 ? strings.editDistance.demo.empty : this.state.stringX[i - 1]}
                </TableCell>
            );

            for (let j = 0; j <= this.LENGTH2; j++) {
                const key = `row ${i}, column ${j}`;

                let value = this.state.table[i][j] === undefined ? "-" : this.state.table[i][j].toString();

                classNames = [classes.tableCell];

                if (this.state.highlightingOn) {
                    // Highlight current cell
                    if (i === this.outerCounter && j === this.innerCounter) {
                        classNames.push(classes.blueCell);
                    }

                    // Highlight previous cell
                    if (this.state.highlightPrevious && i === this.outerCounter - 1 && j === this.innerCounter - 1) {
                        classNames.push(classes.yellowCell);
                    }

                    if (this.state.highlightCandidates &&
                        (
                            (i === this.outerCounter && j === this.innerCounter - 1) ||     // insert
                            (i === this.outerCounter - 1 && j === this.innerCounter) ||     // remove
                            (i === this.outerCounter - 1 && j === this.innerCounter - 1)    // replace
                        )) {
                        classNames.push(classes.yellowCell);
                        value = value + ' + 1';
                    }

                    if (this.state.highlightMin && i === this.minPosition[0] && j === this.minPosition[1]) {
                        classNames.push(classes.greenCell);
                    }
                }

                // Highlight solution
                if (this.state.inProgress === false) {
                    // Green cells
                    this.greenCells.forEach(element => {
                        if (element[0] === i && element[1] === j) {
                            classNames.push(classes.greenCell);
                            value += ' + 1';
                        }
                    });

                    // Blue cells
                    this.blueCells.forEach(element => {
                        if (element[0] === i && element[1] === j) {
                            classNames.push(classes.blueCell);
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

export default withStyles(globalStyles)(EditDistanceDemo);
