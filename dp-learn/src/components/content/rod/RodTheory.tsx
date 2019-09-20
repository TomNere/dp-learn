// author: Tomáš Nereča, 2019

import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { rodDpSpaceComplex, rodDpTimeComplex, rodDynCode, rodRecCode, rodRecSpaceComplex, rodRecTimeComplex } from 'src/strings/dpProblemsStrings/RodStrings';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import Complexity from 'src/components/specialized/Complexity';
import CustomTitle from 'src/components/hoc/CustomTitle';
import FlexOne from 'src/components/hoc/FlexOne';
import Img from 'src/components/hoc/PaddingImage';
import PaddingDiv from 'src/components/hoc/PaddingDiv';
import SourceCode from 'src/components/hoc/SourceCode';
import Table1En from 'src/resources/rod/rodTable1En.svg';
import Table1Sk from 'src/resources/rod/rodTable1Sk.svg';
import Table2En from 'src/resources/rod/rodTable2En.svg';
import Table2Sk from 'src/resources/rod/rodTable2Sk.svg';
import Tree from 'src/resources/rod/rodTree.svg';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/strings';

type AllProps =
    WithStyles<typeof globalStyles>;

// Rod cutting problem theory
class RodTheory extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div>
                <CustomTitle variant='h2'>
                    {strings.rod.theory.title}
                </CustomTitle>
                {/* What is cutting a rod problem */}
                <BottomMarginDiv>
                    <Markdown source={strings.rod.theory.brief.b1} />

                    <b>{strings.theoryGlobal.eg}</b>
                    <ul className={classes.simpleList}>
                        <li>{strings.rod.theory.brief.input}</li>
                    </ul>

                    <b>{strings.rod.theory.brief.b2}</b>
                    <ul className={classes.simpleList}>
                        <li>{strings.rod.theory.brief.output1}</li>
                        <li>{strings.rod.theory.brief.output2}</li>
                        <li>{strings.rod.theory.brief.output3}</li>
                    </ul>
                    <Markdown source={strings.rod.theory.brief.b3} />
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
                                <Markdown source={strings.rod.theory.recursion.brief} />
                                <Markdown source={strings.rod.theory.recursion.recTime} />
                                <Markdown source={strings.rod.theory.recursion.recSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={rodRecTimeComplex} space={rodRecSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.theoryGlobal.recusionTree}
                            </Typography>
                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>{strings.rod.theory.recursion.input}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>
                            <Img src={Tree} alt="RodRecTree" width='600' padding='small' />
                            <SourceCode>
                                {rodRecCode}
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
                                <Markdown source={strings.rod.theory.dp.brief} />
                                <Markdown source={strings.rod.theory.dp.dpTime} />
                                <Markdown source={strings.rod.theory.dp.dpSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={rodDpTimeComplex} space={rodDpSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Table examples */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.tables}
                            </Typography>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>{strings.rod.theory.dp.input}</li>
                                        <li>{strings.rod.theory.dp.outerLoop} {strings.rod.theory.dp.i3}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            {strings.getLanguage() === 'en' &&
                                <Img src={Table1En} alt="RodRecTable1" width='600' padding='big' />
                            }
                            {strings.getLanguage() === 'sk' &&
                                <Img src={Table1Sk} alt="RodRecTable1" width='600' padding='big' />
                            }

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'} >
                                    <ul className={classes.simpleList}>
                                        <li>{strings.rod.theory.dp.input}</li>
                                        <li>{strings.rod.theory.dp.outerLoop} {strings.rod.theory.dp.i4}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            {strings.getLanguage() === 'en' &&
                                <Img src={Table2En} alt="RodRecTable2" width='600' padding='big' />

                            }
                            {strings.getLanguage() === 'sk' &&
                                <Img src={Table2Sk} alt="RodRecTable2" width='600' padding='big' />
                            }

                            <SourceCode>
                                {rodDynCode}
                            </SourceCode>
                        </PaddingDiv>
                    </FlexOne>
                </Grid>
                <CustomTitle variant='h5'>
                    {strings.theoryGlobal.similarProblems}
                </CustomTitle>
                <ul>
                    <li><b>{strings.rod.theory.coins}</b> ({strings.theoryGlobal.partOfApp})</li>
                    <li><b><a href={strings.theoryGlobal.knapsackHref}>{strings.theoryGlobal.knapsackTitle}</a></b></li>
                    <li><b><a href={strings.theoryGlobal.longestIncSubseqHref}>{strings.theoryGlobal.longestIncSubseqTitle}</a></b></li>
                </ul>
            </div>
        );
    }
}

export default withStyles(globalStyles)(RodTheory);
