import * as Markdown from 'react-markdown';
import * as Prism from 'prismjs';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { coinsDpSpaceComplex, coinsDpTimeComplex, coinsDynCode, coinsRecCode, coinsRecSpaceComplex, coinsRecTimeComplex } from 'src/dp/helpers/coins/CoinsStrings';

import BottomMarginDiv from 'src/hoc/BottomMarginDiv';
import Complexity from 'src/components/dpComponents/Complexity';
import CustomTitle from 'src/hoc/CustomTitle';
import FlexOne from 'src/hoc/FlexOne';
import PaddingDiv from 'src/hoc/PaddingDiv';
import PaddingImage from 'src/hoc/PaddingImage';
import SourceCode from 'src/components/dpComponents/SourceCode';
import Table1En from 'src/resources/coins/coinsTable1En.svg';
import Table1Sk from 'src/resources/coins/coinsTable1Sk.svg';
import Table2En from 'src/resources/coins/coinsTable2En.svg';
import Table2Sk from 'src/resources/coins/coinsTable2Sk.svg';
import Tree from 'src/resources/coins/coinsTree.svg';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/languages';

type AllProps =
    WithStyles<typeof globalStyles>;

class CoinsTheory extends React.Component<AllProps> {
    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.coins.theory.title}
                </CustomTitle>
                {/* What is minimum number of coins problem */}
                <BottomMarginDiv>
                    <Markdown source={strings.coins.theory.brief.b1} />

                    {strings.theoryGlobal.eg}
                    <ul className={classes.simpleList}>
                        <li>C = {'{ 2, 3, 5 }'}</li>
                        <li>V = 7</li>
                    </ul>

                    {strings.coins.theory.brief.b2}
                    <ul className={classes.simpleList}>
                        <li>7 = 2 + 2 + 3</li>
                        <li>7 = 2 + 5</li>
                    </ul>
                    <Markdown source={strings.coins.theory.brief.b3} />
                </BottomMarginDiv>
                <hr />
                <Grid container={true} direction='row'>
                    {/* Recursive solution */}
                    <FlexOne>
                        <PaddingDiv>
                            <Typography variant={'h5'} align={'center'} >
                                {strings.global.recursiveSolution}
                            </Typography>

                            <BottomMarginDiv>
                                <Markdown source={strings.coins.theory.recursion} />
                                <Markdown source={strings.coins.theory.recTime} />
                                <Markdown source={strings.coins.theory.recSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={coinsRecTimeComplex} space={coinsRecSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.recusionTree}
                            </Typography>
                            <PaddingImage>
                                <img src={Tree} alt="MinimumCoinsRecTree" />
                            </PaddingImage>
                            <SourceCode code={coinsRecCode} />
                        </PaddingDiv>
                    </FlexOne>

                    {/* Dynamic programming */}
                    <FlexOne>
                        <PaddingDiv>
                            <Typography variant={'h5'} align={'center'}>
                                {strings.global.dynProgSolution}
                            </Typography>

                            <BottomMarginDiv>
                                <Markdown source={strings.coins.theory.dynProg} />
                                <Markdown source={strings.coins.theory.dpTime} />
                                <Markdown source={strings.coins.theory.dpSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={coinsDpTimeComplex} space={coinsDpSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Table examples */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.tables}
                            </Typography>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>C = {'{ 1, 2, 5 }'}</li>
                                        <li>V = 4</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            <PaddingImage>
                                {strings.getLanguage() === 'en' &&
                                    <img src={Table1En} width='500' />
                                }
                                {strings.getLanguage() === 'sk' &&
                                    <img src={Table1Sk} width='500' />
                                }
                            </PaddingImage>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'} >
                                    <ul className={classes.simpleList}>
                                        <li>C = {'{ 1, 2, 4 }'}</li>
                                        <li>V = 4</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            <PaddingImage>
                                {strings.getLanguage() === 'en' &&
                                    <img src={Table2En}width='500' />
                                }
                                {strings.getLanguage() === 'sk' &&
                                    <img src={Table2Sk} width='500' />
                                }
                            </PaddingImage>

                            <SourceCode code={coinsDynCode} />
                        </PaddingDiv>
                    </FlexOne>
                </Grid>
                <CustomTitle variant='h5'>
                    {strings.global.similarProblems}
                </CustomTitle>
                <ul>
                    <li><b>{strings.coins.theory.rod}</b> ({strings.global.partOfApp})</li>
                    <li>{strings.coins.theory.knapsack}</li>  
                </ul>
            </div>
        );
    }
}

export default withStyles(globalStyles)(CoinsTheory);
