import * as Prism from 'prismjs';
import * as React from 'react';

import { GetNumbers, ValueOrUndefined } from 'src/helpers/Helpers';
import { TableCell, TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import CustomTitle from 'src/hoc/CustomTitle';
import DemoTable from 'src/components/dpComponents/DemoTable';
import FlexRowContainer from 'src/hoc/FlexRowContainer';
import SimpleSourceCode from 'src/components/dpComponents/SimpleSourceCode';
import SpeedSelector from 'src/components/customComponents/SpeedSelector';
import { demoStyle } from 'src/styles/demoStyle';
import { rodSmallDynCode } from 'src/dp/helpers/rod/RodCodes';
import { strings } from 'src/strings/languages';

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
    WithStyles<typeof demoStyle>;

class RodDemo extends React.Component<AllProps, ICoinsDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private nextAutomataState:
        'start' |
        'doInnerCycle' |
        'highlightMaxIndex' |
        'assignValue' |
        'nextInnerCycle' |
        'final' |
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

    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.rod.demo.title}
                </CustomTitle>
                <div className={classes.bottomMargin}>
                    {strings.rod.demo.brief}
                </div>
                <div className={classes.container}>
                    <div className={classes.flexChild}>
                        <div className={classes.bottomMargin}>
                            <CustomTextField label={`${strings.rod.prices} (max. 15)`} value={this.state.givenPrices} onChange={this.handlePrices} />
                        </div>

                        {/* Speed select */}
                        <SpeedSelector onClick={this.speedChange} speed={this.state.speed.toString()} />
                        <br />

                        <FlexRowContainer>
                            {/* Start button */}
                            <CustomButton label={strings.global.start} onClick={this.onStartClick} disabled={false} />

                            {/* Step button */}
                            <CustomButton label={strings.global.step} onClick={this.finiteAutomata} disabled={!this.state.inProgress || this.state.speed !== 0} />

                            {/* Finish button */}
                            <CustomButton label={strings.global.finish} onClick={this.onFinishClick} disabled={!this.state.inProgress} />
                        </FlexRowContainer>
                    </div>
                    <div className={classes.flexChild}>
                        <SimpleSourceCode code={rodSmallDynCode} />
                    </div>
                </div>

                {/* Table and result */}
                <DemoTable visible={this.state.tableVisible} cols={this.LENGTH + 2} result={this.state.result} currentState={this.state.currentState} head={this.tableHead} body={this.tableBody} />
            </div>
        );
    }

    private handlePrices = (e: any) => {
        const prices = GetNumbers(e.target.value);
        if (prices.length <= 15) {
            this.setState({ givenPrices: e.target.value, tableVisible: false, inProgress: false });
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

        this.prices = GetNumbers(this.state.givenPrices);
        this.LENGTH = this.prices.length;

        if (this.prices.length === 0) {
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
                this.nextAutomataState = 'highlightMaxIndex';
                break;
            case 'highlightMaxIndex':
                this.highlightMaxIndex();
                this.nextAutomataState = 'assignValue';
                break;
            case 'assignValue':
                this.assignValue();
                this.nextAutomataState = 'nextInnerCycle';
                break;
            case 'nextInnerCycle':
                this.nextInnerCycle();
                break;
            case 'final':
                this.setFinalState(this.state.table);
                this.nextAutomataState = 'done';
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

        this.setState({ highlightCandidates: true, highlightMax: false, currentState: strings.rod.demo.candidates });
    }

    // Just enable higliting on max index (evaluated max value)
    private highlightMaxIndex = () => {
        this.setState({ highlightMax: true, currentState: strings.rod.demo.best });
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
    }

    private nextInnerCycle = () => {
        let currentState: string;

        if (this.outerCounter + 1 > this.LENGTH) {
            this.nextAutomataState = 'final';
            currentState = '...';
        }
        else {
            this.nextAutomataState = 'doInnerCycle';
            this.outerCounter++;
            currentState = `${strings.rod.demo.evalPriceFor} ${this.outerCounter}`
        }

        this.setState({
            highlightCandidates: false,
            highlightMax: false,
            currentState
        });
    }

    private setFinalState = (table: number[]) => {
        this.setState({
            inProgress: false,
            result: `${strings.rod.demo.result} ${table[this.LENGTH]}, ${strings.rod.demo.usedLengths} ${this.getFullSolution()}`,
            currentState: '...',
            highlightingOn: false
        });
    }

    private onFinishClick = () => {
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

export default withStyles(demoStyle)(RodDemo);
