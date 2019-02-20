import * as Prism from 'prismjs';
import * as React from 'react';

import { Avatar, Button, Grid, TableCell, TableRow, TextField } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { coinsBacktrack, coinsSmallDynCode, getCoins } from './CoinsConsts';

import { AnimatedDiv } from 'src/components/Animated';
import DemoTable from 'src/components/hoc/presentational/fields/DemoTable';
import SimpleSourceCode from 'src/components/hoc/presentational/fields/SimpleSourceCode';
import SpeedSelector from 'src/components/hoc/presentational/buttons/SpeedSelector';
import StepFinishButton from 'src/components/hoc/presentational/buttons/StepFinishButton';
import { demoStyles } from 'src/styles/demoStyles';
import { strings } from 'src/translations/languages';

interface ICoinsDemoState {
    givenValue: number
    givenCoins: string
    charX: string
    charY: string
    inProgress: boolean
    tableVisible: boolean
    result: string
    speed: number
    table: number[]
    highlitedCell: number | undefined
    subRes: string
    skip: boolean
    pose: string
}

type AllProps =
    WithStyles<typeof demoStyles>;

class CoinsDemo extends React.Component<AllProps, ICoinsDemoState> {

    /////////////////////// private variables /////////////////////////////////

    private outerCounter: number;
    private innerCounter: number;

    // To store table position of the result
    // private tableRow: number;
    // private tableCol: number;

    // Given coins
    private coins: number[];
    private oldValue: string;

    private backtrackHelp: number[];

    // Create a table to store lengths of  
    // longest common suffixes of substrings. 
    // Note that table[i][j] contains length 
    // of longest common suffix of X[0..i-1]  
    // and Y[0..j-1]. The first row and first 
    // column entries have no logical meaning, 
    // they are used only for simplicity of  
    // program 
    private table: number[];

    // Timeout
    private timeout: any;

    // Delay helper
    private delayHelper = 1500;

    public constructor(props: AllProps) {
        super(props)
        this.state = {
            givenValue: 4,
            givenCoins: "1,2,5",
            charX: "",
            charY: "",
            speed: 1,
            inProgress: false,
            tableVisible: false,
            result: "",
            table: [],
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
                    {strings.coins.demo.brief}
                </div>
                <div className={classes.container}>
                <div className={classes.flexChild}>
                <Grid className={[classes.container, classes.bottomMargin].join(' ')}>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="givenValueTF"
                            label={`${strings.coins.value}(1-20)`}
                            className={classes.textField}
                            value={this.state.givenValue}
                            onChange={this.handleValue}
                            margin="normal"
                        />
                    </form>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="givenCoinsTF"
                            label={`${strings.coins.coins}(max. 5)`}
                            className={classes.textField}
                            value={this.state.givenCoins}
                            onChange={this.handleCoins}
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
                <br/>

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
                <DemoTable visible={this.state.tableVisible} cols={this.state.givenValue + 2} result={this.state.result} subRes={this.state.subRes} head={this.tableHead} body={this.tableBody} />
            </div>
        );
    }

    private handleValue = (e: any) => {
        if (!Number.isNaN(+e.target.value) && +e.target.value >= 1 && +e.target.value <= 20) {
            this.setState({ givenValue: +e.target.value, tableVisible: false, inProgress: false });
        }
    }

    private handleCoins = (e: any) => {
        let sum = 0;
        for (const coin of e.target.value.split(",")) {
            if (Number.isNaN(+coin)) {
                return;
            }
            sum++;
        }
        if (sum <= 5) {
            this.setState({ givenCoins: e.target.value, tableVisible: false, inProgress: false });
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

        this.table = [];
        this.backtrackHelp = [];
        // this.tableCol = this.tableRow = 0;

        this.coins = getCoins(this.state.givenCoins);
        if (this.coins.length === 0) {
            this.setState({ result: 'Error' });
            return;
        }

        // Base case (If given value is 0) 
        this.table[0] = 0;
        this.backtrackHelp[0] = 0;

        // Initialize all table
        // values as Infinite
        for (let i = 1; i <= this.state.givenValue; i++) {
            this.table[i] = Number.MAX_VALUE;
            this.backtrackHelp[i] = -1;
        }

        this.outerCounter = 0;

        this.setState({
            tableVisible: true,
            inProgress: true,
            table: this.table,
        });

        this.innerCounter = 0;

        // Check if auto play or debugging
        if (this.state.speed !== 0) {
            this.timeout = setTimeout(this.onStepClick, this.delayHelper / this.state.speed);
        }
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
            const subRes = this.table[this.outerCounter - this.coins[this.innerCounter]];

            this.setState({
                charX: this.table[this.outerCounter] === Number.MAX_VALUE ? '∞' : this.table[this.outerCounter].toString(),
                charY: subRes === Number.MAX_VALUE ? '∞' : `${subRes} + 1`,
                highlitedCell: this.outerCounter - this.coins[this.innerCounter],
                subRes: `subres = Array[${this.outerCounter} - Coins[${this.innerCounter}]] = Array[${this.outerCounter} - ${this.coins[this.innerCounter]}] = ${subRes}`
            });

            if ((subRes !== Number.MAX_VALUE) && (subRes + 1 < this.table[this.outerCounter])) {
                this.oldValue = this.table[this.outerCounter] === Number.MAX_VALUE ? '∞' : this.table[this.outerCounter].toString();
                this.table[this.outerCounter] = subRes + 1;
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

        this.setState({ table: this.table });

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
        this.setState({
            inProgress: false,
            result: `We need ${this.table[this.state.givenValue]} coins -toString()`,
            // highlitedCells: cells,
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
            let value = this.state.table[j] === Number.MAX_VALUE ? "∞" : this.state.table[j].toString();

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

export default withStyles(demoStyles)(CoinsDemo);
