import * as Prism from 'prismjs';
import * as React from 'react';

import { TableCell, TableRow, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import CustomButton from 'src/components/customComponents/CustomButton';
import CustomTextField from 'src/components/customComponents/CustomTextField';
import DemoTable from 'src/components/dpComponents/DemoTable';
import { GetNumbers } from 'src/helpers/Helpers';
import SpeedSelector from 'src/components/customComponents/SpeedSelector';
import { demoStyle } from 'src/styles/demoStyle';
import { strings } from 'src/strings/languages';

interface ICoinsDemoState {
    givenPrices: string
    inProgress: boolean
    tableVisible: boolean
    result: string
    speed: number
    array: number[]
    highlightCandidates: boolean
    highlightMax: boolean
    highlightCurrent: boolean
}

type AllProps =
    WithStyles<typeof demoStyle>;

class RodDemo extends React.Component<AllProps, ICoinsDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private nextAutomataState: 'evalMaxVal' | 'highlightMaxIndex' | 'assignValue' | 'nextIteration' | 'final' | 'done' = 'evalMaxVal';


    // Given prices
    private prices: number[];

    private array: number[];

    private LENGTH: number;
    private maxIndex: number;

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
            array: [],
            highlightCandidates: false,
            highlightMax: false,
            highlightCurrent: false,
        }
    }

    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                    {strings.rod.demo.title}
                </Typography>
                <div className={classes.bottomMargin}>
                    {strings.rod.demo.brief}
                </div>
                <div className={classes.container}>
                    <div className={classes.flexChild}>
                        <CustomTextField label={strings.rod.prices} value={this.state.givenPrices} onChange={this.handlePrices} />

                        {/* Speed select */}
                        <SpeedSelector onClick={this.speedChange} speed={this.state.speed.toString()} />
                        <br />

                        {/* Start button */}
                        <CustomButton color='dark' label={strings.global.start} onClick={this.onStartClick} visible={true} />

                        {/* Step button */}
                        <CustomButton color='light' label={strings.global.step} onClick={this.finiteAutomata} visible={this.state.inProgress && this.state.speed === 0} />

                        {/* Finish button */}
                        <CustomButton color='light' label={strings.global.finish} onClick={this.onFinishClick} visible={this.state.inProgress} />
                    </div>
                </div>
                <br />

                {/* Table and result */}
                <DemoTable visible={this.state.tableVisible} cols={this.LENGTH + 2} result={this.state.result} currentState='' head={this.tableHead} body={this.tableBody} />
            </div>
        );
    }

    private handlePrices = (e: any) => {
        let sum = 0;
        for (const coin of e.target.value.split(",")) {
            if (Number.isNaN(+coin)) {
                return;
            }
            sum++;
        }
        if (sum <= 15) {
            this.setState({ givenPrices: e.target.value, tableVisible: false, inProgress: false });
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

        this.array = [];

        this.prices = GetNumbers(this.state.givenPrices);
        this.LENGTH = this.prices.length;

        if (this.prices.length === 0) {
            this.setState({ result: 'Error parsing prices.' });
            return;
        }

        this.array[0] = 0;

        this.setState({
            tableVisible: true,
            inProgress: true,
            result: '',
            array: [0],
        });

        this.outerCounter = 0;

        this.nextAutomataState = 'evalMaxVal';
        // Check if auto play or step by step
        if (this.state.speed !== 0) {
            this.setTimeout(this.finiteAutomata);
        }
    }

    private finiteAutomata = () => {
        // Finite automata
        switch (this.nextAutomataState) {
            case 'evalMaxVal':
                this.evalMaxVal();
                this.nextAutomataState = 'highlightMaxIndex';
                break;
            case 'highlightMaxIndex':
                this.highlightMaxIndex();
                this.nextAutomataState = 'assignValue';
                break;
            case 'assignValue':
                this.assignValue();
                this.nextAutomataState = 'nextIteration';
                break;
            case 'nextIteration':
                this.nextIteration();

                if (this.outerCounter + 1 > this.LENGTH) {
                    this.nextAutomataState = 'final';
                }
                else {
                    this.nextAutomataState = 'evalMaxVal';
                }
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

    /****************************** Finite automata operations ************************/

    // Do 1 inner cycle (maxVal is evaluated) and enable candidates highliting
    private evalMaxVal = () => {
        this.outerCounter++;

        let maxVal: number = Number.MIN_VALUE;

        for (let i = 0; i < this.outerCounter; i++) {
            if (this.prices[i] + this.array[this.outerCounter - i - 1] > maxVal) {
                maxVal = this.prices[i] + this.array[this.outerCounter - i - 1];
                this.maxIndex = this.outerCounter - i - 1;
            }
        }

        this.setState({ highlightCandidates: true });
        this.array[this.outerCounter] = maxVal;
    }

    // Just enable higliting on max index (evaluated max value)
    private highlightMaxIndex = () => {
        this.setState({ highlightMax: true });
    }

    private assignValue = () => {
        this.setState(prevState => ({
            array: [...prevState.array, this.array[this.outerCounter]],
            highlightCurrent: true,
        }));
    }

    private nextIteration = () => {
        this.setState({
            highlightCandidates: false,
            highlightMax: false,
            highlightCurrent: false
        });
    }

    private setFinalState = () => {
        this.setState({
            inProgress: false,
            result: `Result: ${this.array[this.LENGTH]}`,
        });
    }

    private onFinishClick = () => {
        clearTimeout(this.timeout);
        this.array = [0];

        for (let outerLocal = 1; outerLocal <= this.LENGTH; outerLocal++) {
            let maxVal = Number.MIN_VALUE;
            for (let i = 0; i < outerLocal; i++) {
                if (this.prices[i] + this.array[outerLocal - i - 1] > maxVal) {
                    maxVal = this.prices[i] + this.array[outerLocal - i - 1];
                }
            }
            this.array[outerLocal] = maxVal;
        }

        this.outerCounter = this.LENGTH;    // To show proper value in table
        this.setState({
            highlightCandidates: false,
            highlightMax: false,
            highlightCurrent: false,
            array: this.array
        });
        this.setFinalState();
    };

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={classes.caption} />)

        for (let i = 0; i <= this.LENGTH; i++) {
            const classNames = [classes.columnCaption, classes.caption];

            if (i === this.outerCounter) {
                classNames.push(classes.blueCell);
            }

            heading.push(
                <TableCell key={'columnName' + i.toString()} className={classNames.join(' ')}>
                    {`Array[${i}]`}
                </TableCell>);
        }

        return heading;
    }

    // Return table body
    private tableBody = () => {
        const { classes } = this.props;

        const body = [];
        let classNames = [];

        const row = [];

        classNames = [classes.rowCaption, classes.caption];

        // Row names
        row.push(
            <TableCell key={'rowName'} className={classNames.join(' ')}>
                {this.outerCounter === 0 ? 'Initial' : `Cycle ${this.outerCounter}.`}
            </TableCell>
        );

        for (let j = 0; j <= this.LENGTH; j++) {
            const key = `body column ${j}`;
            let value = this.state.array[j] === undefined ? "-" : this.state.array[j].toString();

            classNames = [classes.tableCell];

            if (this.state.highlightCandidates) {
                if (value !== "-" && this.outerCounter > j) {
                    classNames.push(classes.yellowCell);
                    value += ` + ${this.prices[this.outerCounter - j - 1]}`;
                }
            }

            if (this.state.highlightMax && j === this.maxIndex) {
                classNames.push(classes.greenCell);
            }

            if (this.state.highlightCurrent && j === this.outerCounter) {
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
            <TableRow key={`row`}>
                {row}
            </TableRow>
        );

        return body;
    }
}

export default withStyles(demoStyle)(RodDemo);
