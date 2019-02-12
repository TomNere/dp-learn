import '../../../styles/prism.css';

import * as Prism from 'prismjs';
import * as React from 'react';

import { Paper, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { substrDynCode, substrEnhCode, substrRecCode } from './SubstringCodes';

import Complexity from 'src/components/hoc/presentational/fields/Complexity';
import FloatingButton from 'src/components/hoc/presentational/buttons/FloatingButton';
import { IProps } from '../../Welcome';
import SourceCode from 'src/components/hoc/presentational/fields/SourceCode';

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
                <FloatingButton variant='floating' onClick={this.handleDemoOpen} />
                {/* Title */}
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                    Longest common substring
                </Typography>
                {/* Brief */}
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
                    <Complexity time={'O(m^2 * n)'} />
                    <hr />
                    <div className={classes.container}>
                        <div className={classes.flexChild}>
                            <Typography variant={'h6'} align={'center'} className={classes.bottomMargin}>
                                Using recursion
                            </Typography>

                            <div>
                                This solution seems pretty simple. Space complexity is only on lengths of strings.
                                But if the strings has no common substring, time complexity can grow nearly to <b>2^n</b> considering <b>m == n</b>,
                                so this method is very inefficient.
                            </div>
                            <Complexity time={'O(n^2'} space={'O(m + n)'} />
                            <SourceCode code={substrRecCode} />
                        </div>
                        <div className={classes.flexChild}>
                            <Typography variant={'h6'} align={'center'} className={classes.bottomMargin}>
                                Dynamic programming
                            </Typography>

                            <div>
                                Using this method we need to find the length of longest common <b>suffix</b> for substrings of both strings.
                                These length's are stored in a table. At the end cell with the biggest value is our result. <br />
                                Value in column is compared to value in row. Default value is 0, but when a match is detected, value from
                                previous column and row is incremented (suffix is incremented). We need to fill <b>M x N</b> table.
                            </div>
                            <Complexity time={'O(m * n)'} space={'O(m * n)'} />

                            <FloatingButton variant='small' onClick={this.handleDemoOpen} />
                            <SourceCode code={substrDynCode} />
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
                            <Complexity time={'O(m * n)'} space={'O(2 * n)'} />
                            <SourceCode code={substrEnhCode} />
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
