// author: Tomáš Nereča, 2019

import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { coinsDpSpaceComplex, coinsDpTimeComplex, coinsDynCode, coinsRecCode, coinsRecSpaceComplex, coinsRecTimeComplex } from 'src/strings/dpProblemsStrings/CoinsStrings';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import Complexity from 'src/components/specialized/Complexity';
import CustomTitle from 'src/components/hoc/CustomTitle';
import FlexOne from 'src/components/hoc/FlexOne';
import Img from 'src/components/hoc/PaddingImage';
import PaddingDiv from 'src/components/hoc/PaddingDiv';
import SourceCode from 'src/components/hoc/SourceCode';
import Table1En from 'src/resources/coins/coinsTable1En.svg';
import Table1Sk from 'src/resources/coins/coinsTable1Sk.svg';
import Table2En from 'src/resources/coins/coinsTable2En.svg';
import Table2Sk from 'src/resources/coins/coinsTable2Sk.svg';
import Tree from 'src/resources/coins/coinsTree.svg';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/strings';

type AllProps =
    WithStyles<typeof globalStyles>;

// Minimum number of coins problem theory
class CoinsTheory extends React.Component<AllProps> {
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

                    <b>{strings.theoryGlobal.eg}</b>
                    <ul className={classes.simpleList}>
                        <li>{strings.coins.theory.brief.input1}</li>
                        <li>{strings.coins.theory.brief.input2}</li>
                    </ul>

                    <b>{strings.coins.theory.brief.b2}</b>
                    <ul className={classes.simpleList}>
                        <li>{strings.coins.theory.brief.output1}</li>
                        <li>{strings.coins.theory.brief.output2}</li>
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
                                <Markdown source={strings.coins.theory.recursion.brief} />
                                <Markdown source={strings.coins.theory.recursion.recTime} />
                                <Markdown source={strings.coins.theory.recursion.recSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={coinsRecTimeComplex} space={coinsRecSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.theoryGlobal.recusionTree}
                            </Typography>
                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>{strings.coins.theory.brief.input1}</li>
                                        <li>{strings.coins.theory.brief.input2}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>
                            <Img src={Tree} alt="MinimumCoinsRecTree" width='700' padding='small' />
                            <SourceCode>
                                {coinsRecCode}
                            </SourceCode>
                        </PaddingDiv>
                    </FlexOne>

                    {/* Dynamic programming */}
                    <FlexOne>
                        <PaddingDiv>
                            <Typography variant={'h5'} align={'center'}>
                                {strings.global.dynProgSolution}
                            </Typography>

                            <BottomMarginDiv>
                                <Markdown source={strings.coins.theory.dp.brief} />
                                <Markdown source={strings.coins.theory.dp.dpTime} />
                                <Markdown source={strings.coins.theory.dp.dpSpace} />
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
                                        <li>{strings.coins.theory.dp.input11}</li>
                                        <li>{strings.coins.theory.dp.input12}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            {strings.getLanguage() === 'en' &&
                                <Img src={Table1En} alt="MinimumCoinsTab1" width='500' padding='big' />

                            }
                            {strings.getLanguage() === 'sk' &&
                                <Img src={Table1Sk} alt="MinimumCoinsTab1" width='500' padding='big' />
                            }

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'} >
                                    <ul className={classes.simpleList}>
                                        <li>{strings.coins.theory.dp.input21}</li>
                                        <li>{strings.coins.theory.dp.input22}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            {strings.getLanguage() === 'en' &&
                                <Img src={Table2En} alt="MinimumCoinsTab1" width='500' padding='big' />
                            }
                            {strings.getLanguage() === 'sk' &&
                                <Img src={Table2Sk} alt="MinimumCoinsTab1" width='500' padding='big' />
                            }

                            <SourceCode>
                                {coinsDynCode}
                            </SourceCode>
                        </PaddingDiv>
                    </FlexOne>
                </Grid>
                <CustomTitle variant='h5'>
                    {strings.theoryGlobal.similarProblems}
                </CustomTitle>
                <ul>
                    <li><b>{strings.coins.theory.rod}</b> ({strings.theoryGlobal.partOfApp})</li>
                    <li><b><a href={strings.theoryGlobal.knapsackHref}>{strings.theoryGlobal.knapsackTitle}</a></b></li>
                    <li><b><a href={strings.theoryGlobal.longestIncSubseqHref}>{strings.theoryGlobal.longestIncSubseqTitle}</a></b></li>
                </ul>
            </div>
        );
    }
}

export default withStyles(globalStyles)(CoinsTheory);
