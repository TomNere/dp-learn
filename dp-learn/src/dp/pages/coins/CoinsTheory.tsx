import * as Markdown from 'react-markdown';
import * as Prism from 'prismjs';
import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { coinsDynCode, coinsRecCode } from 'src/dp/helpers/coins/CoinsCodes';

import CoinsTree from 'src/resources/coins/coinsTree.png';
import Complexity from 'src/components/dpComponents/Complexity';
import CustomSubtitle from 'src/hoc/CustomSubtitle';
import SourceCode from 'src/components/dpComponents/SourceCode';
import Table1 from 'src/resources/coins/coinsTable1.png';
import Table2 from 'src/resources/coins/coinsTable2.png';
import { Typography } from '@material-ui/core';
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
                    <div className={classes.bottomMargin}>
                        {/* Title */}
                        <CustomSubtitle variant='h5'>
                            {strings.coins.theory.title}
                        </CustomSubtitle>
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
                    </div>
                    <hr />
                    <div className={classes.container}>
                        {/* Recursive solution */}
                        <div className={classes.flexChild}>
                            <Typography variant={'h5'} align={'center'} className={classes.bottomMargin}>
                                {strings.global.recursiveSolution}
                            </Typography>

                            <Markdown source={strings.coins.theory.recursion1} className={classes.bottomMargin} />

                            <Complexity time={'O(N^V)'} space={'O(N + 1)'} />
                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.recusionTree}
                            </Typography>
                            <div className={classes.bottomMargin}>
                                <img src={CoinsTree} alt="MinimumCoinsRecTree" />
                            </div>
                            <SourceCode code={coinsRecCode} />
                        </div>

                        {/* Dynamic programming */}
                        <div className={classes.flexChild}>
                            <Typography variant={'h5'} align={'center'} className={classes.bottomMargin}>
                                {strings.global.dynProgSolution}
                            </Typography>
                            <div className={classes.bottomMargin}>
                                {strings.coins.theory.dynProg1}
                            </div>
                            <Complexity time={'O(N*V)'} space={'O(N + (V + 1) + 1)'} />
                            {/* Table example 1 */}
                            <Typography variant={'subtitle1'} className={classes.bottomMargin}>
                                {strings.coins.coins} 1, 2, 5 <br/>
                                {strings.coins.value} 4
                            </Typography>
                            <div className={classes.bottomMargin}>
                                <img src={Table1} width={500} alt="CoinsTable1" />
                            </div>
                            {/* Table example 2 */}
                            <Typography variant={'subtitle1'} className={classes.bottomMargin}>
                                {strings.coins.coins}: 1, 2, 4 <br/>
                                {strings.coins.value}: 4
                            </Typography>
                            <div className={classes.bottomMargin}>
                                <img src={Table2} width={500} alt="CoinsTable2" />
                            </div>
                            <SourceCode code={coinsDynCode} />
                        </div>
                    </div>
            </div>
        );
    }
}

export default withStyles(styles)(CoinsTheory);
