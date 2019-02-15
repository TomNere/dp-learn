import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Paper, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { coinsDynCode, coinsRecCode } from './CoinsCodes';

import CoinsTree from './coinsTree.png';
import Complexity from 'src/components/hoc/presentational/fields/Complexity';
import FloatingButton from 'src/components/hoc/presentational/buttons/FloatingButton';
import { IHistoryProps } from 'src/components/Welcome';
import SourceCode from 'src/components/hoc/presentational/fields/SourceCode';
import { strings } from 'src/translations/languages';

type AllProps =
    IHistoryProps &
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

class Coins extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <FloatingButton variant='floating' onClick={this.handleDemoOpen} />
                {/* Title */}
                <Typography variant={'h4'} align={'center'} className={classes.bottomMargin}>
                {strings.coins.title}
                </Typography>
                {/* Brief */}
                <Paper className={classes.paper}>
                    <div className={classes.bottomMargin}>
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
                            <SourceCode code={coinsDynCode} />
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }

    private handleDemoOpen = () => {
        this.props.history.push("/mainpage/coins/demo");
    };
}

export default withStyles(styles)(Coins);
