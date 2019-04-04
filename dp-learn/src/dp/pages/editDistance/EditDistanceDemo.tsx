import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Min, MinPosition } from 'src/helpers/Helpers';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from "@material-ui/core/styles";

import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import DemoTable from 'src/components/dpComponents/DemoTable';
import FlexRowContainer from 'src/hoc/FlexRowContainer';
import SpeedSelector from 'src/components/customComponents/SpeedSelector';
import { demoStyle } from 'src/styles/demoStyle';
import { strings } from 'src/strings/languages';

interface ISubstringDemoState {
    stringX: string
    stringY: string
    speed: number
    inProgress: boolean
    tableVisible: boolean
    result: string
    table: number[][]
    highlightColRow: boolean,
    highlightCurrent: boolean,
    highlightPrevious: boolean,
    highlightCandidates: boolean,
    highlightMin: boolean
}

type AllProps =
    WithStyles<typeof demoStyle>;

class EditDistanceDemo extends React.Component<AllProps, ISubstringDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;
    private nextAutomataState:
        'doInnerCycle' |
        'assignInner' |
        'assignOuter' |
        'assignPrevious' |
        'assignMin' |
        'nextInnerCycle' |
        'nextOuterCycle' |
        'highlightColRow' |
        'highlightPrevious' |
        'highlightMinIndex' |
        'final' |
        'done'
        = 'highlightColRow';

    // Tuple for table position of min
    private minPosition: [number, number];

    // Length of strings
    private LENGTH1: number;
    private LENGTH2: number;

    // Timeout
    private timeout: any;

    ////////////////////////////////////////////////////////////////////////////

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            stringX: "AdRemovee",
            stringY: "AddRemove",
            speed: 1,
            inProgress: false,
            tableVisible: false,
            result: "",
            table: [],
            highlightColRow: false,
            highlightCurrent: false,
            highlightPrevious: false,
            highlightCandidates: false,
            highlightMin: false
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                    {strings.editDistance.demo.title}
                </Typography>
                <div className={classes.bottomMargin}>
                    <Markdown source={strings.editDistance.demo.brief} />
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
                <DemoTable subRes="" cols={this.LENGTH2 + 1} visible={this.state.tableVisible} result={this.state.result} head={this.tableHead} body={this.tableBody} />
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

        this.LENGTH1 = this.state.stringX.length;
        this.LENGTH2 = this.state.stringY.length;

        const localTable: number[][] = []

        // Initialize
        for (let i = 0; i <= this.LENGTH1; i++) {
            localTable[i] = [];
        }

        this.outerCounter = 0;
        this.innerCounter = 0;

        this.setState({
            tableVisible: true,
            inProgress: true,
            result: '',
            table: localTable,
        });

        this.nextAutomataState = 'highlightColRow';
        // Check if auto play or step by step
        if (this.state.speed !== 0) {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private finiteAutomata = () => {
        // Finite automata
        switch (this.nextAutomataState) {
            case 'highlightColRow':
                this.setState({ highlightColRow: true });
                this.nextAutomataState = 'doInnerCycle';
                break;
            case 'doInnerCycle':
                this.doInnerCycle();
                break;
            case 'assignInner':
                this.assignInner();
                break;
            case 'assignOuter':
                this.assignOuter();
                break;
            case 'assignMin':
                this.assignMin();
                break;
            case 'assignPrevious':
                this.assignPrevious();
                break;
            case 'nextInnerCycle':
                this.nextInnerCycle();
                break;
            case 'highlightPrevious':
                this.highlightPrevious();
                break;
            case 'highlightMinIndex':
                this.highlightMin();
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
        // If first string is empty, only option is to 
        // insert all characters of second string 
        if (this.outerCounter === 0) {
            this.assignInner();
            return;
        }

        // If second string is empty, only option is to 
        // remove all characters of second string 
        if (this.innerCounter === 0) {
            this.assignOuter();
            return;
        }

        // If last characters are same, ignore last char 
        // and recur for remaining string 
        if (this.state.stringX[this.outerCounter - 1] === this.state.stringY[this.innerCounter - 1]) {
            this.highlightPrevious();
            return;
        }

        // If the last character is different, consider all 
        // possibilities and find the minimum
        this.setState({ highlightCandidates: true });
        this.minPosition = MinPosition(
            [this.state.table[this.outerCounter][this.innerCounter - 1], [this.outerCounter, this.innerCounter - 1]],
            [this.state.table[this.outerCounter - 1][this.innerCounter], [this.outerCounter - 1, this.innerCounter]],
            [this.state.table[this.outerCounter - 1][this.innerCounter - 1], [this.outerCounter - 1, this.innerCounter - 1]]
        );

        this.nextAutomataState = 'highlightMinIndex';
    }

    private assignInner = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = this.innerCounter;

        this.setState({
            table,
            highlightCurrent: true,
        });
        this.nextAutomataState = 'nextInnerCycle';
    }

    private assignOuter = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = this.outerCounter;

        this.setState({
            table,
            highlightCurrent: true,
        });
        this.nextAutomataState = 'nextInnerCycle';
    }

    private assignPrevious = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = this.state.table[this.outerCounter - 1][this.innerCounter - 1];

        this.setState({
            table,
            highlightCurrent: true,
        });
        this.nextAutomataState = 'nextInnerCycle';
    }

    private assignMin = () => {
        const table = [...this.state.table];
        table[this.outerCounter][this.innerCounter] = 1 + this.state.table[this.minPosition[0]][this.minPosition[1]];

        this.setState({
            table,
            highlightCurrent: true,
        });
        this.nextAutomataState = 'nextInnerCycle';
    }

    private highlightPrevious = () => {
        this.setState({ highlightPrevious: true });
        this.nextAutomataState = 'assignPrevious';
    }

    private highlightMin = () => {
        this.setState({ highlightMin: true });
        this.nextAutomataState = 'assignMin';
    }

    private nextInnerCycle = () => {
        this.setState({
            highlightCurrent: false,
            highlightPrevious: false,
            highlightCandidates: false,
            highlightMin: false
        });

        if (this.innerCounter + 1 > this.LENGTH2) {
            if (this.outerCounter + 1 > this.LENGTH1) {
                this.nextAutomataState = 'final';
            }
            else {
                this.outerCounter++;
                this.innerCounter = 0;
                this.nextAutomataState = 'doInnerCycle';
            }
            return;
        }
        else {
            this.innerCounter++;
        }

        this.nextAutomataState = 'doInnerCycle';
    }

    private onFinishClick = () => {
        clearTimeout(this.timeout);
        const table: number[][] = [];

        for (let i = 0; i <= this.LENGTH1; i++) {
            table[i] = [];
            for (let j = 0; j <= this.LENGTH2; j++) {
                // If first string is empty, only option is to 
                // insert all characters of second string 
                if (i === 0) {
                    table[i][j] = j;  // Min. operations = j 
                }

                // If second string is empty, only option is to 
                // remove all characters of second string 
                else if (j === 0) {
                    table[i][j] = i; // Min. operations = i 
                }

                // If last characters are same, ignore last char 
                // and recur for remaining string 
                else if (this.state.stringX[i - 1] === this.state.stringY[j - 1]) {
                    table[i][j] = table[i - 1][j - 1];
                }

                // If the last character is different, consider all 
                // possibilities and find the minimum 
                else {
                    table[i][j] = 1 + Min(table[i][j - 1],  // Insert 
                        table[i - 1][j],  // Remove 
                        table[i - 1][j - 1]); // Replace
                }
            }
        }

        this.outerCounter = this.LENGTH1;    // To show proper value in table

        this.setState({
            highlightCandidates: false,
            highlightMin: false,
            highlightCurrent: false,
            table,
            inProgress: false,
            highlightColRow: false,
            result: `Result: ${table[this.LENGTH1][this.LENGTH2]}`
        });
    };

    private setFinalState = () => {
        this.setState({
            inProgress: false,
            highlightColRow: false,
            result: `Result: ${this.state.table[this.LENGTH1][this.LENGTH2]}`,
        });
    }

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={classes.caption} />)

        for (let i = 0; i <= this.LENGTH2; i++) {
            const classNames = [classes.columnCaption, classes.caption];

            if (this.state.highlightColRow && i === this.innerCounter) {
                classNames.push(classes.blueCell);
            }

            heading.push(
                <TableCell key={'columnName' + i.toString()} className={classNames.join(' ')}>
                    {i === 0 ? '-' : `Y[${i - 1}] - ${this.state.stringY[i - 1]}`}
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
            if (this.state.highlightColRow && i === this.outerCounter) {
                classNames.push(classes.blueCell);
            }

            // Row names
            row.push(
                <TableCell key={`rowName ${i.toString()}`} className={classNames.join(' ')}>
                    {i === 0 ? '-' : `X[${i - 1}] - ${this.state.stringX[i - 1]}`}
                </TableCell>
            );

            for (let j = 0; j <= this.LENGTH2; j++) {
                const key = `row ${i}, column ${j}`;

                let value = this.state.table[i][j] === undefined ? "-" : this.state.table[i][j].toString();

                classNames = [classes.tableCell];

                // Highlight current cell
                if (this.state.highlightCurrent && i === this.outerCounter && j === this.innerCounter) {
                    classNames.push(classes.greenCell);
                }

                // Highlight previous cell
                if (this.state.highlightPrevious && i === this.outerCounter - 1 && j === this.innerCounter - 1) {
                    classNames.push(classes.greenCell);
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

export default withStyles(demoStyle)(EditDistanceDemo);
