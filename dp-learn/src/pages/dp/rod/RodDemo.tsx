import * as Prism from 'prismjs';
import * as React from 'react';

import { Avatar, Button, Grid, TableCell, TableRow, TextField } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { coinsBacktrack, coinsSmallDynCode, getCoins as getPrices } from 'src/dpProblemsStuff/coins/CoinsConsts';

import { AnimatedDiv } from 'src/components/animations/Animated';
import DemoTable from 'src/components/fields/DemoTable';
import SimpleSourceCode from 'src/components/fields/SimpleSourceCode';
import SpeedSelector from 'src/components/buttons/SpeedSelector';
import StepFinishButton from 'src/components/buttons/StepFinishButton';
import { demoStyles } from 'src/styles/demoStyles';
import { strings } from 'src/strings/languages';

interface ICoinsDemoState {
    givenPrices: string
    charX: string
    charY: string
    inProgress: boolean
    tableVisible: boolean
    result: string
    speed: number
    array: number[]
    highlitedCell: number | undefined
    subRes: string
    skip: boolean
    pose: string
}

type AllProps =
    WithStyles<typeof demoStyles>;

class RodDemo extends React.Component<AllProps, ICoinsDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;

    // To store table position of the result
    // private tableRow: number;
    // private tableCol: number;

    // Given coins
    private coins: number[];
    private oldValue: string;

    private array: number[];

    private LENGTH: number;
    private maxVal: number;

    // Timeout
    private timeout: any;

    // Delay helper
    private delayHelper = 1500;

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenPrices: "1, 5, 6, 6, 9",
            charX: "",
            charY: "",
            speed: 1,
            inProgress: false,
            tableVisible: false,
            result: "",
            array: [],
            highlitedCell: undefined,
            skip: false,
            pose: "empty",
            subRes: ""
        }
    }

    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.bottomMargin}>
                    {strings.rod.demo.brief}
                </div>
                <div className={classes.container}>
                    <div className={classes.flexChild}>
                        <Grid className={[classes.container, classes.bottomMargin].join(' ')}>
                            <form className={classes.container} autoComplete="off">
                                <TextField
                                    id="givenPricesTF"
                                    label={`${strings.coins.coins}(max. 15)`}
                                    className={classes.textField}
                                    value={this.state.givenPrices}
                                    onChange={this.handlePrices}
                                    margin="normal"
                                />
                            </form>
                        </Grid>
                        <br />

                        {/* Speed select */}
                        <SpeedSelector onClick={this.speedChange} speed={this.state.speed.toString()} />
                        <br />
                        <Button variant="contained" color="primary" className={classes.buttonDark} onClick={this.evaluate}>
                            {strings.global.start}
                        </Button>

                        {/* Do step or finish */}
                        <StepFinishButton visible={this.state.inProgress} speed={this.state.speed} onStepClick={this.onStepClick} onFinishClick={this.onFinishClick} />
                    </div>
                    <div className={classes.flexChild}>
                        <SimpleSourceCode code={coinsSmallDynCode} />
                    </div>
                    <div className={classes.flexChild}>
                        <SimpleSourceCode code={coinsBacktrack} />
                    </div>
                </div>
                <br />

                {/* Animated avatars */}
                {(this.state.inProgress) &&
                    <div className={classes.avatars}>
                        <Avatar className={[classes.avatar, classes.defaultAvatar].join(' ')}>{this.state.charX}</Avatar>
                        <span className={classes.sign}> > </span>

                        <AnimatedDiv pose={this.state.pose}>
                            <Avatar
                                className={[classes.avatar, this.state.charY === "" ? classes.defaultAvatar :
                                    this.state.pose === 'noMatch' ? classes.redAvatar : classes.greenAvatar].join(' ')}
                            >
                                {this.state.charY}
                            </Avatar>
                        </AnimatedDiv>
                    </div>
                }

                {/* Table and result */}
                <DemoTable visible={this.state.tableVisible} cols={this.LENGTH + 2} result={this.state.result} subRes={this.state.subRes} head={this.tableHead} body={this.tableBody} />
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

    private evaluate = () => {
        this.setState({
            charX: "",
            charY: ""
        });

        this.array = [];

        this.coins = getPrices(this.state.givenPrices);
        this.LENGTH = this.coins.length;

        if (this.coins.length === 0) {
            this.setState({ result: 'Error parsing prices.' });
            return;
        }

        this.array[0] = 0;

        this.setState({
            tableVisible: true,
            inProgress: true,
            array: this.array,
        });

        this.innerCounter = 0;
        this.maxVal = Number.MIN_VALUE;

        // Check if auto play or step by step
        if (this.state.speed === 0) {
            this.outerCounter = 0;
        }
        else {
            this.outerCounter = 1;
            this.timeout = setTimeout(this.doIteration, this.delayHelper / this.state.speed);
        }
    }

    private doIteration = () => {
        //
    }

    private onStepClick = () => {
        this.oldValue = '';
        if (this.innerCounter === 0) {
            this.outerCounter++;
        }
        // Only for speed === 0
        if (this.outerCounter > this.state.givenValue) {
            this.setFinalState();
            return;
        }

        this.setState({ highlitedCell: undefined });

        if (this.coins[this.innerCounter] <= this.outerCounter) {
            const subRes = this.array[this.outerCounter - this.coins[this.innerCounter]];

            this.setState({
                charX: this.array[this.outerCounter] === Number.MAX_VALUE ? '∞' : this.array[this.outerCounter].toString(),
                charY: subRes === Number.MAX_VALUE ? '∞' : `${subRes} + 1`,
                highlitedCell: this.outerCounter - this.coins[this.innerCounter],
                subRes: `subres = Array[${this.outerCounter} - Coins[${this.innerCounter}]] = Array[${this.outerCounter} - ${this.coins[this.innerCounter]}] = ${subRes}`
            });

            if ((subRes !== Number.MAX_VALUE) && (subRes + 1 < this.array[this.outerCounter])) {
                this.oldValue = this.array[this.outerCounter] === Number.MAX_VALUE ? '∞' : this.array[this.outerCounter].toString();
                this.array[this.outerCounter] = subRes + 1;
                this.backtrackHelp[this.outerCounter] = this.innerCounter;
                this.setState({ pose: 'match' });

                // Flash
                // this.incrementOn();
            }
            else {
                this.setState({ pose: 'noMatch' });
            }
        }
        else {
            this.setState({
                subRes: `(Coins[${this.innerCounter}] => ${this.coins[this.innerCounter]}) > ${this.outerCounter}, skipping...`,
                pose: 'empty',
                charX: '',
                charY: ''
            });
        }

        this.setState({ array: this.array });

        this.innerCounter++;

        if (this.innerCounter < this.coins.length) {
            if (this.state.speed !== 0) {
                this.timeout = setTimeout(this.transitionHelper, this.delayHelper / this.state.speed);
            }
        }
        else {
            if (this.outerCounter + 1 > this.state.givenValue) {
                if (this.state.speed !== 0) {
                    this.timeout = setTimeout(this.setFinalState, this.delayHelper / this.state.speed);
                }
                else {
                    this.innerCounter = 0;
                }
            }
            else {
                this.innerCounter = 0;
                this.timeout = setTimeout(this.transitionHelper, this.delayHelper / this.state.speed);
            }
        }
    }

    private onFinishClick = () => {
        clearTimeout(this.timeout);
        this.setState({ speed: 0 });

        while (this.outerCounter <= this.state.givenValue) {
            this.onStepClick();
        }

        this.setState({ speed: 1 });
    };

    // private incrementOn = () => {
    //     this.setState({
    //         // highlitedCells: cells
    //     });

    //     if (this.state.speed !== 0) {
    //         setTimeout(this.incrementOff, (this.delayHelper / 2) / this.state.speed);
    //     }
    // }

    // private incrementOff = () => {
    //     // this.setState({ highlitedCells: [] });
    // }

    private setFinalState = () => {
        let start = this.state.givenValue;
        let coins = '';
        while (start !== 0) {
            const j = this.backtrackHelp[start];
            coins += `${this.coins[j]} `;
            start = start - this.coins[j];
        }

        this.setState({
            inProgress: false,
            result: `We need ${this.array[this.state.givenValue]} coins - ${coins}.`,
            subRes: "",
            charX: "",
            pose: "empty",
            charY: "",
        });
    }

    private transitionHelper = () => {
        if (this.state.speed !== 0) {
            this.setState({ charY: "" });
            this.timeout = setTimeout(this.onStepClick, 500 / this.state.speed);
        }
    }

    // Return table heading
    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={classes.caption} />)

        for (let i = 0; i <= this.state.givenValue; i++) {
            const classNames = [classes.columnCaption, classes.caption];

            if (i === this.outerCounter && i !== 0) {
                classNames.push(classes.highlitedCell);
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

        let row = [];

        classNames = [classes.rowCaption, classes.caption];

        // Row names
        row.push(
            <TableCell key={'tableRow name'} className={classNames.join(' ')}>
                {`Cycle ${this.outerCounter}.`}
            </TableCell>
        );

        for (let j = 0; j <= this.state.givenValue; j++) {
            const key = `body column ${j}`;
            let value = this.state.array[j] === Number.MAX_VALUE ? "∞" : this.state.array[j].toString();

            classNames = [classes.tableCell];

            if (this.state.highlitedCell === j) {
                classNames.push(classes.incCell);

                if (this.state.pose === 'match') {
                    value += ' + 1';
                }
            }

            if (this.outerCounter === j && this.state.pose === 'match') {
                classNames.push(classes.greenCell);
                value = `${this.oldValue} => ${value}`;
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
            <TableCell key={'backtrackHelp name'} className={[classes.rowCaption, classes.caption].join(' ')}>
                {'Backtrac helper'}
            </TableCell>
        );

        for (let j = 0; j <= this.state.givenValue; j++) {
            row.push(
                <TableCell key={`backtrack${j}`} className={classes.tableCell}>
                    {this.backtrackHelp[j]}
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

export default withStyles(demoStyles)(RodDemo);
