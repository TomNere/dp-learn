import * as Markdown from 'react-markdown';
import * as React from 'react';

import { TableCell, TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from "@material-ui/core/styles";

import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import CustomTitle from 'src/hoc/CustomTitle';
import DemoTable from 'src/components/dpComponents/DemoTable';
import FlexRowContainer from 'src/hoc/FlexRowContainer';
import SpeedSelector from 'src/components/customComponents/SpeedSelector';
import { ValueOrUndefined } from 'src/helpers/Helpers';
import { demoStyle } from 'src/styles/demoStyle';
import { strings } from 'src/strings/languages';

interface ISubstringDemoState {
    speed: number
    inProgress: boolean
    tableVisible: boolean
    table: number[][]
    result: string
    currentState: string
    stringX: string
    stringY: string
    match: boolean | undefined
    highlitingOn: boolean
}

type AllProps =
    WithStyles<typeof demoStyle>;

class SubstringDemo extends React.Component<AllProps, ISubstringDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;

    private nextAutomataState:
        'doInnerCycle' |
        'nextInnerCycle' |
        'assignZero' |
        'assignOne' |
        'assignIncremented' |
        'done'
        = 'done';

    // Tuple for result position
    private resultPos: [number, number];

    private solution: Array<[number, number]>;

    // Length of strings
    private LENGTH1: number;
    private LENGTH2: number;

    // Timeout
    private timeout: any;

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            speed: 1,
            inProgress: false,
            tableVisible: false,
            table: [],
            result: "",
            currentState: '...',
            stringX: "String",
            stringY: "Testing",
            match: undefined,
            highlitingOn: false
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <CustomTitle>
                    {strings.substring.demo.title}
                </CustomTitle>

                <div className={classes.bottomMargin}>
                    <Markdown source={strings.substring.demo.brief} />
                </div>
                <FlexRowContainer>
                    <CustomTextField label={`${strings.components.string} X`} value={this.state.stringX} onChange={this.handlestrXChange} />
                    <CustomTextField label={`${strings.components.string} Y`} value={this.state.stringY} onChange={this.handlestrYChange} />
                </FlexRowContainer>

                {/* Speed select */}
                <SpeedSelector onClick={this.speedChange} speed={this.state.speed.toString()} />
                <br />

                {/* Start button */}
                <CustomButton color='dark' label={strings.global.start} onClick={this.onStartClick} visible={true} />

                {/* Step button */}
                <CustomButton color='light' label={strings.global.step} onClick={this.finiteAutomata} visible={this.state.inProgress && this.state.speed === 0} />

                {/* Finish button */}
                <CustomButton color='light' label={strings.global.finish} onClick={this.onFinishClick} visible={this.state.inProgress} />

                {/* Table and result */}
                <DemoTable currentState={this.state.currentState} cols={this.LENGTH2 + 1} visible={this.state.tableVisible} result={this.state.result} head={this.tableHead} body={this.tableBody} />
            </div>
        );
    }

    private handlestrXChange = (e: any) => {
        this.setState({ stringX: e.target.value });
    };

    private handlestrYChange = (e: any) => {
        this.setState({ stringY: e.target.value });
    };

    private speedChange = (e: any) => {
        this.setState({ speed: +e.target.value });
    };

    private setTimeout = (func: () => void) => {
        this.timeout = setTimeout(func, 5000 / this.state.speed);
    }

    private onStartClick = () => {
        clearTimeout(this.timeout);

        const table: number[][] = [];

        this.LENGTH1 = this.state.stringX.length;
        this.LENGTH2 = this.state.stringY.length;

        this.resultPos = [0, 0];

        // Initialize two dimensional array
        for (let i = 0; i < this.LENGTH1; i++) {
            table[i] = [];
        }

        this.outerCounter = 0;
        this.innerCounter = 0;

        this.setState({
            tableVisible: true,
            inProgress: true,
            table,
            result: '',
            currentState: strings.substring.demo.start,
            match: undefined,
            highlitingOn: false
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
            case 'nextInnerCycle':
                this.nextInnerCycle();
                break;
            case 'assignZero':
                this.assignZero();
                break;
            case 'assignOne':
                this.assignOne();
                break;
            case 'assignIncremented':
                this.assignIncremented();
                break;
        }

        // if speed != 0, setTimeout is needed
        const auto: boolean = this.state.speed !== 0;

        if (auto && this.nextAutomataState !== 'done') {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private doInnerCycle = () => {
        this.setState({ highlitingOn: true });
        if (this.state.stringX[this.outerCounter] === this.state.stringY[this.innerCounter]) {
            this.setState({
                currentState: `${this.state.stringX[this.outerCounter]} == ${this.state.stringY[this.innerCounter]}, ${strings.substring.demo.match}`,
                match: true
            });
            if (this.innerCounter === 0 || this.outerCounter === 0) {
                this.nextAutomataState = 'assignOne';
            }
            else {
                this.nextAutomataState = 'assignIncremented';
            }
        }
        else {
            this.setState({ currentState: `${this.state.stringX[this.outerCounter]} != ${this.state.stringY[this.innerCounter]}, ${strings.substring.demo.noMatch}${strings.substring.demo.assignZero} ` });
            this.nextAutomataState = 'assignZero';
        }
    }

    private assignZero = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = 0;

        this.setState({
            table,
        });

        this.nextAutomataState = 'nextInnerCycle';
    }

    private assignOne = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = 1;

        this.setState({
            table,
        });

        if (table[this.outerCounter][this.innerCounter] > this.state.table[this.resultPos[0]][this.resultPos[1]]) {
            this.resultPos[0] = this.outerCounter;
            this.resultPos[1] = this.innerCounter;
        }

        this.nextAutomataState = 'nextInnerCycle';
    }

    private assignIncremented = () => {
        this.setState({ match: true });

        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = table[this.outerCounter - 1][this.innerCounter - 1] + 1;

        this.setState({
            table,
        });

        if (table[this.outerCounter][this.innerCounter] > this.state.table[this.resultPos[0]][this.resultPos[1]]) {
            this.resultPos[0] = this.outerCounter;
            this.resultPos[1] = this.innerCounter;
        }

        this.nextAutomataState = 'nextInnerCycle';
    }

    private nextInnerCycle = () => {
        if (this.innerCounter + 1 >= this.LENGTH2) {
            if (this.outerCounter + 1 >= this.LENGTH1) {
                this.nextAutomataState = 'done';
                this.setFinalState();
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

        this.setState({
            match: undefined,
        });

        this.doInnerCycle();
    }

    private onFinishClick = () => {
        clearTimeout(this.timeout);
        this.setState({ speed: 0 });

        const table: number[][] = [];

        for (let i = 0; i <= this.LENGTH1; i++) {
            table[i] = [];
            for (let j = 0; j <= this.LENGTH2; j++) {
                if (this.state.stringX[i] === this.state.stringY[j]) {
                    if (i === 0 || j === 0) {
                        table[i][j] = 1;
                    }
                    else {
                        table[i][j] = table[i - 1][j - 1];
                    }
                }
                else {
                    table[i][j] = 0;
                }
                if (table[i][j] > this.state.table[this.resultPos[0]][this.resultPos[1]]) {
                    this.resultPos[0] = i;
                    this.resultPos[1] = j;
                }
            }
        }

        this.setFinalState();
    };

    private setFinalState = () => {
        const cells: Array<[number, number]> = [];
        let finalString = '';

        for (let i = this.state.table[this.resultPos[0]][this.resultPos[1]] - 1; i >= 0; i--) {
            cells.push([this.resultPos[0] - i, this.resultPos[1] - i]);
            finalString += this.state.stringX[this.resultPos[0] - i];
        }
        this.solution = cells;

        this.setState({
            inProgress: false,
            result: `${strings.substring.demo.longestSubr}: "${finalString}", ${strings.substring.demo.length}: ${this.state.table[this.resultPos[0]][this.resultPos[1]]}.`,
            currentState: '...'
        });
    }

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={[classes.tableHeading, classes.caption].join(' ')} />)

        for (let i = 0; i < this.LENGTH2; i++) {
            const classNames = [classes.columnCaption];

            // Highlight solution
            if (this.state.inProgress === false) {
                this.solution.forEach(element => {
                    if (element[0] === i) {
                        classNames.push(classes.blueCaption);
                    }
                });
            }
            else {
                classNames.push(classes.caption);
            }

            heading.push(
                <TableCell key={'columnName' + i.toString()} className={classNames.join(' ')}>
                    {this.state.stringY[i]}
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
        for (let i = 0; i < this.LENGTH1; i++) {
            const row = [];

            classNames = [classes.rowCaption, classes.caption];

            // Row names
            row.push(
                <TableCell key={`rowName ${i.toString()}`} className={classNames.join(' ')}>
                    {this.state.stringX[i]}
                </TableCell>
            );

            // Table body(content)
            for (let j = 0; j < this.LENGTH2; j++) {
                classNames = [classes.tableCell];
                const key = `row ${i}, column ${j}`;

                let value = ValueOrUndefined(this.state.table[i][j]);

                if (this.state.highlitingOn) {
                    // Highlight solution
                    if (this.state.inProgress === false) {
                        this.solution.forEach(element => {
                            if (element[0] === i && element[1] === j) {
                                classNames.push(classes.blueCell);
                            }
                        });
                    }
                    else {
                        // Highlight current
                        if (i === this.outerCounter && j === this.innerCounter) {
                            classNames.push(classes.blueCell);
                        }

                        // Highlight previous
                        if (this.state.match && i === this.outerCounter - 1 && j === this.innerCounter - 1 && this.nextAutomataState === 'nextInnerCycle') {
                            classNames.push(classes.yellowCell);
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

export default withStyles(demoStyle)(SubstringDemo);
