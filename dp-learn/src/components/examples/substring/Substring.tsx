import '../../../styles/prism.css';

import * as Prism from 'prismjs';
import * as React from 'react';

import { AccessTime, Code, PlayArrow, Storage } from '@material-ui/icons';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Fab, Paper, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { substrDynCode, substrEnhCode, substrRecCode } from './SubstringCodes';

import { IProps } from '../../Welcome';
import myTheme from '../../../styles/index';

type AllProps =
    IProps &
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexChild: {
        flex: 1,
        padding: theme.spacing.unit * 2
    },
    bottomMargin: {
        marginBottom: 15,
    },
    leftMargin: {
        marginLeft: 20
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    expPanel: {
        background: myTheme.palette.primary.main,
    },
    whiteText: {
        color: 'white'
    },
    complexityParent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    complexity: {
        margin: theme.spacing.unit * 3,
        border: '1px solid black',
        padding: '8px 4px',
        marginRight: '20px',
        display: 'inline-block',
        '& svg': {
            display: 'inline-block',
            verticalAlign: 'middle'
        }
    },
    fab: {
        position: 'fixed',
        zIndex: 9,
        bottom: '2rem',
        right: '2rem',
        color: 'white',
        borderColor: myTheme.palette.primary.main,
        background: myTheme.palette.secondary.main
    },
    fabBig: {
        fontSize: 24,
    },
    fabButton: {
        marginBottom: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.secondary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.primary.main
        }
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class Substring extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props)
    }

    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Fab size='large' variant='extended' aria-label="demo" className={[classes.fab, classes.fabBig].join(' ')} onClick={this.handleDemoOpen}>
                    <PlayArrow className={classes.extendedIcon} />
                    Try out demo!
                </Fab>
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                    Longest common substring
                </Typography>
                <Paper className={classes.paper}>
                    <div className={classes.bottomMargin}>
                        There are two strings <b>X</b> and <b>Y</b>. We want to find the length of the longest common substring(subsequence), e.g.: <br />
                        <div className={classes.leftMargin}>
                            X = "I like dynamic programm<b>ing!</b>"<br />
                            Y = "Really? So tell me something about this cool th<b>ing!</b>"<br /><br />
                        </div>
                        The lenght of the longest common substring is <b>4</b> and the substring is <b>"ing!"</b>.
                    </div>
                    <hr />
                    {/* Simple solution */}
                    <Typography variant={'h6'} className={classes.bottomMargin}>
                        Simple solution
                    </Typography>
                    <div>
                        We have to consider all substrings of first string and check if this is a substring in second string.
                    Consider <b>m</b> is length of the first string and <b>n</b> length of the second string, there will be <b>O(m^2)</b> substrings in first string.
                    We can check for matching substring in <b>O(n)</b> time.
                    </div>
                    <div className={classes.complexity}>
                        <AccessTime />
                        <span>Time complexity is <b>O(m^2 * n)</b></span>
                    </div>
                    <hr />
                    <div className={classes.container}>
                        <div className={classes.flexChild}>
                            <Typography variant={'h6'} align={'center'} className={classes.bottomMargin}>
                                Dynamic programing
                            </Typography>

                            <div>
                                Using this method we need to find the length of longest common <b>suffix</b> for substrings of both strings.
                                These length's are stored in a table. At the end cell with the biggest value is our result. <br />
                                Value in column is compared to value in row. Default value is 0, but when a match is detected, value from
                                previous column and row is incremented (suffix is incremented). We need to fill <b>M x N</b> table.
                            </div>
                            <div className={classes.complexityParent}>
                                <div className={classes.complexity}>
                                    <AccessTime />
                                    <span>Time complexity is <b>O(m * n)</b></span>
                                    <br />
                                    <Storage />
                                    <span>Space complexity is <b>O(m * n)</b></span>
                                </div>
                            </div>
                            <Fab size='small' variant='extended' aria-label="demo" className={classes.fabButton} onClick={this.handleDemoOpen}>
                                <PlayArrow className={classes.extendedIcon} />
                                Try out demo!
                            </Fab>
                            <ExpansionPanel className={[classes.expPanel, classes.bottomMargin].join(' ')}>
                                <ExpansionPanelSummary expandIcon={<Code className={classes.whiteText} />}>
                                    <Typography className={[classes.heading, classes.whiteText].join(' ')}>Source code</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <pre>
                                        <code className="language-clike">
                                            {substrDynCode}
                                        </code>
                                    </pre>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <Typography variant={'subtitle1'} className={classes.bottomMargin}>
                                Enhancement
                            </Typography>
                            <div>
                                The space used by this solution can be significantly reduced.
                                Suppose we are at position <b>table[i][j]</b>. <br />
                                Now if <b>x[i-1] == x[j-1]</b>, then we add the value of <b>table[i-1][j-1]</b>
                                to our result. That is we add value from previous row and value for all other rows below the previous row are never used.
                                So, at a time we are using only two consecutive rows.
                                This observation can be used to reduce the space required to find length of longest common substring.
                                Instead of creating a matrix of size <b>m*n</b>, we create a matrix of size <b>2*n</b>.
                                A variable currRow is used to represent that either row 0 or row 1 of this matrix is currently used to find length.
                                Initially row 0 is used as current row for the case when length of string x is zero. At the end of each iteration,
                                current row is made previous row and previous row is made new current row.
                            </div>
                            <div className={classes.complexityParent}>
                                <div className={classes.complexity}>
                                    <AccessTime />
                                    <span>Time complexity is <b>O(m * n)</b></span>
                                    <br />
                                    <Storage />
                                    <span>Space complexity is <b>O(2 * n)</b></span>
                                </div>
                            </div>
                            <ExpansionPanel className={classes.expPanel}>
                                <ExpansionPanelSummary expandIcon={<Code className={classes.whiteText} />}>
                                    <Typography className={[classes.heading, classes.whiteText].join(' ')}>Source code</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.leftMargin}>
                                        <pre>
                                            <code className="language-clike">
                                                {substrEnhCode}
                                            </code>
                                        </pre>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        <div className={classes.flexChild}>
                            <Typography variant={'h6'} align={'center'} className={classes.bottomMargin}>
                                Using recursion
                            </Typography>

                            <div>
                                This solution seems pretty simple. Space complexity is only on lengths of strings.
                                But if the strings has no common substring, time complexity can grow nearly to <b>2^n</b> considering <b>m == n</b>,
                                so this method is very inefficient.
                            </div>
                            <div className={classes.complexityParent}>
                                <div className={classes.complexity}>
                                    <AccessTime />
                                    <span>Time complexity is <b>O(n^2)</b></span>
                                    <br />
                                    <Storage />
                                    <span>Space complexity is <b>O(m + n)</b></span>
                                </div>
                            </div>
                            <ExpansionPanel className={classes.expPanel}>
                                <ExpansionPanelSummary expandIcon={<Code className={classes.whiteText} />}>
                                    <Typography className={[classes.heading, classes.whiteText].join(' ')}>Source code</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.leftMargin}>
                                        <pre>
                                            <code className="language-clike">
                                                {substrRecCode}
                                            </code>
                                        </pre>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }

    private handleDemoOpen = () => {
        this.props.history.push("/mainpage/substring/demo");
    };
}

export default withStyles(styles)(Substring);
