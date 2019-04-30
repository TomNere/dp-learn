import * as React from 'react';

import { CheckForZero, GetNumbers, ValueOrUndefined } from 'src/helpers';
import { Grid, TableCell, TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import CustomButton from 'src/components/customStyled/CustomButton';
import CustomTextField from 'src/components/customStyled/CustomTextField';
import CustomTitle from 'src/components/customStyled/CustomTitle';
import DemoTable from 'src/components/specialized/DemoTable';
import FlexOne from 'src/components/hoc/FlexOne';
import FlexTwo from 'src/components/hoc/FlexTwo';
import Formula from 'src/components/hoc/Formula';
import SpeedSelector from 'src/components/specialized/SpeedSelector';
import { globalStyles } from 'src/styles/globalStyles';
import { rodFormula } from 'src/strings/dpProblemsStrings/RodStrings';
import { strings } from 'src/strings/translations/strings';

interface ICoinsDemoState {
    givenPrices: string
    inProgress: boolean
    tableVisible: boolean
    result: string
    speed: number
    table: number[]
    highlightCandidates: boolean
    highlightMax: boolean
    currentState: string
    highlightingOn: boolean
}

type AllProps =
    WithStyles<typeof globalStyles>;

class RodDemo extends React.Component<AllProps, ICoinsDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private nextAutomataState:
        'start' |
        'doInnerCycle' |
        'highlightMaxIndex' |
        'assignValue' |
        'nextInnerCycle' |
        'done' = 'done';

    // Given prices
    private prices: number[];

    // Helper for solution building
    private solutionHelper: number[];

    // Helper for solution highlighting
    private solution: number[];

    // Length of array of given prices
    private LENGTH: number;

    // Helpers for new value in table and in solution helper
    private maxIndex: number;
    private chosenLength: number;

    // Timeout
    private timeout: any;

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenPrices: "1, 5, 6, 6, 9",
            speed: 1,
            inProgress: false,
            tableVisible: false,
            result: "",
            table: [],
            highlightCandidates: false,
            highlightMax: false,
            currentState: '...',
            highlightingOn: false
        }
    }

    public render() {
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.rod.demo.title}
                </CustomTitle>
                <BottomMarginDiv>
                    {strings.rod.demo.brief}
                </BottomMarginDiv>
                <Grid container={true} direction='row'>
                    <FlexOne>
                        <BottomMarginDiv>
                            <CustomTextField label={`${strings.rod.prices} (max. 15)`} value={this.state.givenPrices} onChange={this.handlePrices} />
                        </BottomMarginDiv>

                        {/* Speed select */}
                        <SpeedSelector onClick={this.speedChange} speed={this.state.speed.toString()} />
                        <br />

                        <Grid container={true} direction='row'>
                            {/* Start button */}
                            <CustomButton label={strings.global.start} onClick={this.handleStartClick} disabled={false} />

                            {/* Step button */}
                            <CustomButton label={strings.global.step} onClick={this.finiteAutomata} disabled={!this.state.inProgress || this.state.speed !== 0} />

                            {/* Finish button */}
                            <CustomButton label={strings.global.finish} onClick={this.handleFinishClick} disabled={!this.state.inProgress} />
                        </Grid>
                    </FlexOne>
                    <FlexTwo>
                        <Formula>
                            {rodFormula}
                        </Formula>
                    </FlexTwo>
                </Grid>
                <br />

                {/* Table and result */}
                <DemoTable visible={this.state.tableVisible} cols={this.LENGTH + 2} result={this.state.result} currentState={this.state.currentState} head={this.tableHead} body={this.tableBody} />
            </div>
        );
    }

    private handlePrices = (e: any) => {
        const prices = GetNumbers(e.target.value, false);
        if (prices.length <= 15) {
            clearTimeout(this.timeout);
            this.setState({ givenPrices: e.target.value, tableVisible: false, inProgress: false, result:'', });
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

    private handleStartClick = () => {
        clearTimeout(this.timeout);
        console.log(this.state.givenPrices);

        this.prices = GetNumbers(this.state.givenPrices, false);
        console.log(this.prices);

        this.LENGTH = this.prices.length;
        
        if (CheckForZero(this.prices)) {
            this.setState({ result: strings.global.invalidArg });
            return;
        }

        this.maxIndex = 0;
        this.solutionHelper = [];

        this.setState({
            tableVisible: true,
            inProgress: true,
            result: '',
            currentState: strings.demoGlobal.start0,
            table: [0],
            highlightingOn: true,
            highlightMax: false,
        });

        this.outerCounter = 0;

        this.nextAutomataState = 'start';

        // Check if auto play or step by step
        if (this.state.speed !== 0) {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private finiteAutomata = () => {
        // Finite automata
        switch (this.nextAutomataState) {
            case 'start':
                this.start();
                break;
            case 'doInnerCycle':
                this.doInnerCycle();
                break;
            case 'highlightMaxIndex':
                this.highlightMaxIndex();
                break;
            case 'assignValue':
                this.assignValue();
                break;
            case 'nextInnerCycle':
                this.nextInnerCycle();
                break;
        }

        // If speed != 0, setTimeout is needed
        const auto: boolean = this.state.speed !== 0;

        if (auto && this.nextAutomataState !== 'done') {
            this.setTimeout(this.finiteAutomata);
        }
    }

    /****************************** Finite automata operations ************************/

    private start = () => {
        this.outerCounter++;
        this.setState({
            currentState: `${strings.rod.demo.evalPriceFor} ${this.outerCounter}`,
        });
        this.nextAutomataState = 'doInnerCycle';
    }

    // Do 1 inner cycle (maxVal is evaluated) and enable candidates highlighting
    private doInnerCycle = () => {
        let maxVal: number = Number.MIN_VALUE;

        for (let i = 0; i < this.outerCounter; i++) {
            if (this.prices[i] + this.state.table[this.outerCounter - i - 1] > maxVal) {
                maxVal = this.prices[i] + this.state.table[this.outerCounter - i - 1];
                this.maxIndex = this.outerCounter - i - 1;
                this.chosenLength = i;
            }
        }

        this.setState({ highlightCandidates: true, highlightMax: false, currentState: strings.demoGlobal.candidates });
        this.nextAutomataState = 'highlightMaxIndex';
    }

    // Just enable higliting on max index (evaluated max value)
    private highlightMaxIndex = () => {
        this.setState({ highlightMax: true, currentState: strings.demoGlobal.best });
        this.nextAutomataState = 'assignValue';
    }

    private assignValue = () => {
        const table = [...this.state.table];
        const value = this.prices[this.chosenLength] + this.state.table[this.maxIndex];
        table[this.outerCounter] = value;
        this.solutionHelper[this.outerCounter] = this.chosenLength + 1;

        this.setState({
            table,
            currentState: `${strings.demoGlobal.assigning} ${value}, ${strings.rod.demo.usedLength} ${this.solutionHelper[this.outerCounter]}`
        });
        this.nextAutomataState = 'nextInnerCycle';
    }

    private nextInnerCycle = () => {
        let currentState: string = '';

        if (this.outerCounter + 1 > this.LENGTH) {
            this.setFinalState(this.state.table);
            return;
        }
        else {
            this.outerCounter++;
            currentState = `${strings.rod.demo.evalPriceFor} ${this.outerCounter}`
        }

        this.setState({
            highlightCandidates: false,
            highlightMax: false,
            currentState
        });

        this.nextAutomataState = 'doInnerCycle';
    }

    private setFinalState = (table: number[]) => {
        this.setState({
            inProgress: false,
            result: `${strings.rod.demo.result} ${table[this.LENGTH]}, ${strings.rod.demo.usedLengths} ${this.getFullSolution()}`,
            currentState: strings.global.done,
            highlightingOn: false
        });
    }

    private handleFinishClick = () => {
        clearTimeout(this.timeout);
        const table: number[] = [0];
        this.solutionHelper = [];

        for (let outerLocal = 1; outerLocal <= this.LENGTH; outerLocal++) {
            let maxVal = Number.MIN_VALUE;
            for (let i = 0; i < outerLocal; i++) {
                if (this.prices[i] + table[outerLocal - i - 1] > maxVal) {
                    maxVal = this.prices[i] + table[outerLocal - i - 1];
                    this.solutionHelper[outerLocal] = i + 1;
                }
            }
            table[outerLocal] = maxVal;
        }

        this.outerCounter = this.LENGTH;    // To show proper value in table
        this.setState({
            highlightCandidates: false,
            highlightMax: false,
            highlightingOn: false,
            table
        });

        this.setFinalState(table);
    };

    // Return full solution
    private getFullSolution = () => {
        let start = this.LENGTH;
        let lengths = '';

        this.solution = [];
        while (start > 0) {
            this.solution.push(start);
            lengths += `${this.solutionHelper[start]}, `;
            start -= this.solutionHelper[start];
        }

        // Remove last ','
        return lengths.slice(0, -2);
    }

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={classes.caption} />)

        for (let i = 0; i <= this.LENGTH; i++) {
            const classNames = [classes.columnCaption, classes.caption];

            heading.push(
                <TableCell key={'columnName' + i.toString()} className={classNames.join(' ')}>
                    {`${strings.rod.demo.length} ${i}`}
                </TableCell>);
        }

        return heading;
    }

    // Return table body
    private tableBody = () => {
        const { classes } = this.props;

        const body = [];
        let classNames = [];

        let row = [];

        classNames = [classes.rowCaption, classes.caption];

        // Row names
        row.push(
            <TableCell key={'rowName'} className={classNames.join(' ')}>
                {strings.rod.demo.highestPrice}
            </TableCell>
        );

        for (let j = 0; j <= this.LENGTH; j++) {
            const key = `body column ${j}`;
            let value = ValueOrUndefined(this.state.table[j]);

            classNames = [classes.tableCell];

            if (this.state.highlightingOn) {
                if (this.state.highlightCandidates) {
                    if (value !== "-" && this.outerCounter > j) {
                        classNames.push(classes.yellowCell);
                        value += ` + ${this.prices[this.outerCounter - j - 1]}`;
                    }
                }

                if (this.state.highlightMax && j === this.maxIndex) {
                    classNames.push(classes.greenCell);
                }

                // Current
                if (j === this.outerCounter) {
                    classNames.push(classes.blueCell);
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
            <TableRow key={`row`}>
                {row}
            </TableRow>
        );

        // Solution helper
        row = [];
        row.push(
            <TableCell key={'solution name'} className={[classes.rowCaption, classes.caption].join(' ')}>
                {strings.rod.demo.usedLengthBig}
            </TableCell>
        );

        for (let j = 0; j <= this.LENGTH; j++) {
            classNames = [classes.tableCell];

            // Don't highlight first cell
            if (this.state.highlightingOn && j > 0 && this.outerCounter === j) {
                classNames.push(classes.blueCell);
            }

            // Highlight solution
            if (this.state.inProgress === false) {
                this.solution.forEach(element => {
                    if (element === j) {
                        classNames.push(classes.blueCell);
                    }
                });
            }

            row.push(
                <TableCell key={`solution${j}`} className={classNames.join(' ')}>
                    {ValueOrUndefined(this.solutionHelper[j])}
                </TableCell>
            );
        }

        // Push row to the table
        body.push(
            <TableRow key={`tableRow2`}>
                {row}
            </TableRow>
        );

        return body;
    }
}

export default withStyles(globalStyles)(RodDemo);
