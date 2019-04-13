import * as React from 'react';

import { GetNumbers, ValueOrIntMax } from 'src/helpers/Helpers';
import { Grid, TableCell, TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import BottomedDiv from 'src/hoc/BottomedDiv';
import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import CustomTitle from 'src/hoc/CustomTitle';
import DemoTable from 'src/components/dpComponents/DemoTable';
import FlexOne from 'src/hoc/FlexOne';
import FlexTwo from 'src/hoc/FlexTwo';
import Formula from 'src/hoc/Formula';
import SpeedSelector from 'src/components/customComponents/SpeedSelector';
import { coinsFormula } from 'src/dp/helpers/coins/CoinsStrings';
import { demoStyle } from 'src/styles/globalStyles';
import { strings } from 'src/strings/languages';

interface ICoinsDemoState {
    speed: number
    inProgress: boolean
    tableVisible: boolean
    table: number[]
    result: string
    currentState: string
    givenValue: number
    givenCoins: string
    currentCol: number | undefined
    match: boolean | undefined
}

type AllProps =
    WithStyles<typeof demoStyle>;

// Minimum coins problem demo
class CoinsDemo extends React.Component<AllProps, ICoinsDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;

    private nextAutomataState:
        'start' |
        'doInnerCycle' |
        'nextInnerCycle' |
        'assignNewValue' |
        'dontAssignNewValue' |
        'done'
        = 'done';

    private coins: number[];

    // Helper for solution building
    private solutionHelper: number[];

    // Helper for solution highlighting
    private solution: number[];

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
            givenValue: 4,
            givenCoins: "1,2,5",
            currentCol: undefined,
            match: undefined,
        }
    }

    public render() {
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.coins.demo.title}
                </CustomTitle>
                <BottomedDiv>
                    {strings.coins.demo.brief}
                </BottomedDiv>
                <Grid direction='row' container={true}>
                    <FlexOne>
                        <Grid direction='column' container={true}>
                            <CustomTextField label={`${strings.coins.value} (0-20)`} value={this.state.givenValue.toString()} onChange={this.handleValue} />
                            <CustomTextField label={`${strings.coins.coins} (max. 5)`} value={this.state.givenCoins} onChange={this.handleCoins} />
                        </Grid>

                        {/* Speed select */}
                        <SpeedSelector onClick={this.speedChange} speed={this.state.speed.toString()} />
                        <br />

                        <Grid direction='row' container={true}>
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
                            {coinsFormula}
                        </Formula>
                    </FlexTwo>
                </Grid>
                <br /> 

                {/* Table and result */}
                <DemoTable visible={this.state.tableVisible} cols={this.state.givenValue + 2} result={this.state.result} currentState={this.state.currentState} head={this.tableHead} body={this.tableBody} />
            </div>
        );
    }

    private handleValue = (e: any) => {
        if (!Number.isNaN(+e.target.value) && +e.target.value >= 0 && +e.target.value <= 20) {
            this.setState({ givenValue: +e.target.value, tableVisible: false, inProgress: false });
        }
    }

    private handleCoins = (e: any) => {
        const coins = GetNumbers(e.target.value);
        if (coins.length <= 5) {
            this.setState({ givenCoins: e.target.value, tableVisible: false, inProgress: false });
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
        this.coins = GetNumbers(this.state.givenCoins);

        if (this.coins.length === 0) {
            this.setState({ result: strings.global.invalidArg });
            return;
        }

        const table: number[] = []

        this.solutionHelper = [];

        // Base case (If given value is 0)
        table[0] = 0;
        this.solutionHelper[0] = 0;

        // Initialize all table values as Infinite
        for (let i = 1; i <= this.state.givenValue; i++) {
            table[i] = Number.MAX_VALUE;
        }

        this.outerCounter = 0;
        this.innerCounter = 0;

        this.setState({
            tableVisible: true,
            inProgress: true,
            result: '',
            currentState: strings.demoGlobal.start0,
            table,
            match: undefined,
            currentCol: undefined
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
            case 'start':
                this.start();
                break;
            case 'doInnerCycle':
                this.doInnerCycle();
                break;
            case 'nextInnerCycle':
                this.nextInnerCycle();
                break;
            case 'assignNewValue':
                this.assignNewValue();
                break;
            case 'dontAssignNewValue':
                this.dontAssignNewValue();
                break;
        }

        // if speed != 0, setTimeout is needed
        const auto: boolean = this.state.speed !== 0;

        if (auto && this.nextAutomataState !== 'done') {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private start = () => {
        this.outerCounter = 1;

        this.setState({
            currentState: `${strings.coins.demo.evalCoinsFor} ${this.outerCounter}`,
        });
        this.nextAutomataState = 'doInnerCycle';
    }

    private doInnerCycle = () => {
        if (this.coins[this.innerCounter] <= this.outerCounter) {
            const subRes = this.state.table[this.outerCounter - this.coins[this.innerCounter]];

            this.setState({
                currentCol: this.outerCounter - this.coins[this.innerCounter],
                currentState: `(${ValueOrIntMax(subRes)} != INT_MAX) && (${ValueOrIntMax(subRes)} + 1 < ${ValueOrIntMax(this.state.table[this.outerCounter])}) ?`
            });

            if (subRes !== Number.MAX_VALUE && subRes + 1 < this.state.table[this.outerCounter]) {
                this.nextAutomataState = 'assignNewValue'
            }
        }
        else {
            this.nextInnerCycle();
        }
    }

    private assignNewValue = () => {
        const table = [...this.state.table];
        const value = this.state.table[this.outerCounter - this.coins[this.innerCounter]] + 1;
        table[this.outerCounter] = value;
        this.solutionHelper[this.outerCounter] = this.coins[this.innerCounter];

        this.setState({
            table,
            currentState: `${strings.demoGlobal.assigning} ${value}, ${strings.coins.demo.usedCoin} ${this.solutionHelper[this.outerCounter]}`
        });

        this.setState({ match: true });
        this.nextAutomataState = 'nextInnerCycle';
    }

    private dontAssignNewValue = () => {
        this.setState({ match: false });
        this.nextAutomataState = 'nextInnerCycle';
    }

    private nextInnerCycle = () => {
        let currentState: string = '..';

        if (this.innerCounter + 1 >= this.coins.length) {
            if (this.outerCounter + 1 > this.state.givenValue) {
                this.setFinalState(this.state.table);
                return;
            }
            else {
                this.outerCounter++;
                this.innerCounter = 0;

                currentState = `${strings.coins.demo.evalCoinsFor} ${this.outerCounter}`;
            }
        }
        else {
            this.setState({
                currentCol: undefined,
            });

            this.innerCounter++;
            this.doInnerCycle();
            return;
        }

        this.setState({
            currentCol: undefined,
            match: undefined,
            currentState,
        });

        this.nextAutomataState = 'doInnerCycle';
    }

    // Stop animation and get result immediately
    private onFinishClick = () => {
        clearTimeout(this.timeout);

        this.solutionHelper = [0];
        const table: number[] = [];

        table[0] = 0;

        for (let i = 1; i <= this.state.givenValue; i++) {
            table[i] = Number.MAX_VALUE;
        }

        // Compute minimum coins required for all
        // values from 1 to value
        for (let i = 1; i <= this.state.givenValue; i++) {
            // Go through all coins smaller than i
            for (const coin of this.coins) {
                if (coin <= i) {
                    const subRes = table[i - coin];
                    if (subRes !== Number.MAX_VALUE && subRes + 1 < table[i]) {
                        table[i] = subRes + 1;
                        this.solutionHelper[i] = coin;
                    }
                }
            }
        }

        this.setState({
            table,
        });

        this.setFinalState(table);
    };

    private setFinalState = (table: number[]) => {
        this.outerCounter = -1;
        this.nextAutomataState = 'done';

        this.setState({
            inProgress: false,
            result: `${strings.coins.demo.isNeeded}: ${table[this.state.givenValue]}, ${strings.coins.demo.usedCoins}: ${this.getFullSolution()}`,
            currentState: "...",
        });
    }

    private getFullSolution = () => {
        let start = this.state.givenValue;
        let coins = '';

        this.solution = []
        while (start > 0) {
            this.solution.push(start);
            coins += `${this.solutionHelper[start]}, `;
            start -= this.solutionHelper[start];
        }

        return coins.slice(0, -2);
    }

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={classes.caption} />)

        for (let i = 0; i <= this.state.givenValue; i++) {
            const classNames = [];

            classNames.push(classes.columnCaption, classes.caption);

            heading.push(
                <TableCell key={'columnName' + i.toString()} className={classNames.join(' ')}>
                    {`${strings.coins.demo.value} ${i}`}
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
            <TableCell key={'tableRow name'} className={classNames.join(' ')}>
                {strings.coins.demo.coinsNumber}
            </TableCell>
        );

        for (let j = 0; j <= this.state.givenValue; j++) {
            const key = `body column ${j}`;
            let value = ValueOrIntMax(this.state.table[j]);

            classNames = [classes.tableCell];

            if (this.outerCounter === j) {
                classNames.push(classes.blueCell);
            }

            if (this.state.currentCol === j) {
                value += ' + 1';

                if (this.state.match === true) {
                    classNames.push(classes.greenCell);
                }
                else if (this.state.match === false) {
                    classNames.push(classes.redCell);
                }
                else {
                    classNames.push(classes.yellowCell);
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
            <TableRow key={`tableRow1`}>
                {row}
            </TableRow>
        );

        row = [];
        row.push(
            <TableCell key={'solution name'} className={[classes.rowCaption, classes.caption].join(' ')}>
                {strings.coins.demo.usedCoinBig}
            </TableCell>
        );

        for (let j = 0; j <= this.state.givenValue; j++) {
            classNames = [classes.tableCell];

            if (this.outerCounter === j) {
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
                    {this.solutionHelper[j]}
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

export default withStyles(demoStyle)(CoinsDemo);
