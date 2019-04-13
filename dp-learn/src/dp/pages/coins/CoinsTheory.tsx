import * as Markdown from 'react-markdown';
import * as Prism from 'prismjs';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { coinsDynCode, coinsRecCode } from 'src/dp/helpers/coins/CoinsStrings';

import BottomedDiv from 'src/hoc/BottomedDiv';
import CoinsTree from 'src/resources/coins/coinsTree.png';
import Complexity from 'src/components/dpComponents/Complexity';
import CustomTitle from 'src/hoc/CustomTitle';
import FlexOne from 'src/hoc/FlexOne';
import SourceCode from 'src/components/dpComponents/SourceCode';
import Table1 from 'src/resources/coins/coinsTable1.png';
import Table2 from 'src/resources/coins/coinsTable2.png';
import { strings } from 'src/strings/languages';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    center: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    },
    leftMargin: {
        marginLeft: 20
    },
    bottomMargin: {
        marginBottom: 15,
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    flexChild: {
        flex: 1,
        padding: theme.spacing.unit * 2
    },
});

class CoinsTheory extends React.Component<AllProps> {
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
                {/* Brief */}
                <BottomedDiv>
                    {/* Title */}
                    <CustomTitle variant='h5'>
                        {strings.coins.theory.title}
                    </CustomTitle>
                    <Markdown source={strings.coins.brief.b1} />
                    <div className={[classes.leftMargin, classes.bottomMargin].join(' ')}>
                        C = {'{ 2, 3, 5 }'}<br />
                        V = 7
                            </div>
                    <Markdown source={strings.coins.brief.b2} />
                    <div className={classes.leftMargin}>
                        <ul>
                            <li>7 = 2 + 2 + 3</li>
                            <li>7 = 2 + 5</li>
                        </ul>
                    </div>
                    <Markdown source={strings.coins.brief.b3} />
                </BottomedDiv>
                <hr />
                <Grid>
                    {/* Recursive solution */}
                    <FlexOne>
                        <Typography variant={'h5'} align={'center'} className={classes.bottomMargin}>
                            {strings.global.recursiveSolution}
                        </Typography>

                        <Markdown source={strings.coins.theory.recursion1} className={classes.bottomMargin} />

                        <Complexity time={'O(N^V)'} space={'O(N + 1)'} />
                        {/* Recursion Tree */}
                        <Typography variant={'h6'} className={classes.bottomMargin}>
                            {strings.global.recusionTree}
                        </Typography>
                        <BottomedDiv>
                            <img src={CoinsTree} alt="MinimumCoinsRecTree" />
                        </BottomedDiv>
                        <SourceCode code={coinsRecCode} />
                    </FlexOne>

                    {/* Dynamic programming */}
                    <FlexOne>
                        <Typography variant={'h5'} align={'center'} className={classes.bottomMargin}>
                            {strings.global.dynProgSolution}
                        </Typography>
                        <BottomedDiv>
                            {strings.coins.theory.dynProg1}
                        </BottomedDiv>
                        <Complexity time={'O(N*V)'} space={'O(N + (V + 1) + 1)'} />
                        {/* Table example 1 */}
                        <Typography variant={'subtitle1'} className={classes.bottomMargin}>
                            {strings.coins.coins} 1, 2, 5 <br />
                            {strings.coins.value} 4
                            </Typography>
                        <BottomedDiv>
                            <img src={Table1} width={500} alt="CoinsTable1" />
                        </BottomedDiv>
                        {/* Table example 2 */}
                        <Typography variant={'subtitle1'} className={classes.bottomMargin}>
                            {strings.coins.coins}: 1, 2, 4 <br />
                            {strings.coins.value}: 4
                            </Typography>
                        <BottomedDiv>
                            <img src={Table2} width={500} alt="CoinsTable2" />
                        </BottomedDiv>
                        <SourceCode code={coinsDynCode} />
                    </FlexOne>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(CoinsTheory);
