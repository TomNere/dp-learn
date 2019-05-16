// author: Tomáš Nereča, 2019

import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { editDistDpSpaceComplex, editDistDpTimeComplex, editDistDynCode, editDistRecCode, editDistRecSpaceComplex, editDistRecTimeComplex } from 'src/strings/dpProblemsStrings/EditDistanceStrings';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import Complexity from 'src/components/specialized/Complexity';
import CustomTitle from 'src/components/hoc/CustomTitle';
import FlexOne from 'src/components/hoc/FlexOne';
import Img from 'src/components/hoc/PaddingImage';
import PaddingDiv from 'src/components/hoc/PaddingDiv';
import SourceCode from 'src/components/hoc/SourceCode';
import Table1En from 'src/resources/editDistance/editDistTable1En.svg';
import Table1Sk from 'src/resources/editDistance/editDistTable1Sk.svg';
import Table2En from 'src/resources/editDistance/editDistTable2En.svg';
import Table2Sk from 'src/resources/editDistance/editDistTable2Sk.svg';
import Tree from 'src/resources/editDistance/editDistTree.svg';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/strings';

type AllProps =
    WithStyles<typeof globalStyles>;

// Edit distance problem theory
class EditDistanceTheory extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.editDistance.theory.title}
                </CustomTitle>
                {/* What is edit distance problem */}
                <BottomMarginDiv>
                    <Markdown source={strings.editDistance.theory.brief.b1} />

                    <b>{strings.theoryGlobal.eg}</b>
                    <ul className={classes.simpleList}>
                        <li>{strings.editDistance.theory.brief.input1}</li>
                        <li>{strings.editDistance.theory.brief.input2}</li>
                    </ul>
                    <b>{strings.editDistance.theory.brief.b2}</b>
                    <ul className={classes.simpleList}>
                        <li><Markdown source={strings.editDistance.theory.brief.strX} /></li>
                        <li><Markdown source={strings.editDistance.theory.brief.strY} /></li>
                    </ul>
                    <Markdown source={strings.editDistance.theory.brief.b3} />
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
                                <Markdown source={strings.editDistance.theory.recursion.brief1} />
                                <ul>
                                    <li><Markdown source={strings.editDistance.theory.recursion.op1} /></li>
                                    <li><Markdown source={strings.editDistance.theory.recursion.op2} /></li>
                                    <li><Markdown source={strings.editDistance.theory.recursion.op3} /></li>
                                </ul>
                                <Markdown source={strings.editDistance.theory.recursion.recTime} />
                                <Markdown source={strings.editDistance.theory.recursion.recSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={editDistRecTimeComplex} space={editDistRecSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.theoryGlobal.recusionTree}
                            </Typography>
                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>{strings.editDistance.theory.recursion.input1}</li>
                                        <li>{strings.editDistance.theory.recursion.input2}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>
                            <Img src={Tree} alt="EditDistanceRecTree" width='600' padding='big' />
                            <SourceCode>
                                {editDistRecCode}
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
                                <Markdown source={strings.editDistance.theory.dp.brief1} />
                                <ul>
                                    <li><Markdown source={strings.editDistance.theory.dp.dpOp1} /></li>
                                    <li><Markdown source={strings.editDistance.theory.dp.dpOp2} /></li>
                                    <li><Markdown source={strings.editDistance.theory.dp.dpOp3} /></li>
                                </ul>
                                <Markdown source={strings.editDistance.theory.dp.brief2} />

                                <Markdown source={strings.editDistance.theory.dp.dpTime} />
                                <Markdown source={strings.editDistance.theory.dp.dpSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={editDistDpTimeComplex} space={editDistDpSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Table examples */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.tables}
                            </Typography>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>{strings.editDistance.theory.dp.input1}</li>
                                        <li>{strings.editDistance.theory.dp.input2}</li>
                                        <li>{strings.editDistance.theory.dp.match}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            {strings.getLanguage() === 'en' &&
                                <Img src={Table1En} alt="EditDistanceTab1" width='450' padding='big' />
                            }
                            {strings.getLanguage() === 'sk' &&
                                <Img src={Table1Sk} alt="EditDistanceTab1" width='450' padding='big' />
                            }

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'} >
                                    <ul className={classes.simpleList}>
                                        <li>{strings.editDistance.theory.dp.input1}</li>
                                        <li>{strings.editDistance.theory.dp.input2}</li>
                                        <li>{strings.editDistance.theory.dp.noMatch}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            {strings.getLanguage() === 'en' &&
                                <Img src={Table2En} alt="EditDistanceTab2" width='450' padding='big' />
                            }
                            {strings.getLanguage() === 'sk' &&
                                <Img src={Table2Sk} alt="EditDistanceTab2" width='450' padding='big' />
                            }

                            <SourceCode>
                                {editDistDynCode}
                            </SourceCode>
                        </PaddingDiv>
                    </FlexOne>
                </Grid>
                <CustomTitle variant='h5'>
                    {strings.theoryGlobal.similarProblems}
                </CustomTitle>
                <ul>
                    <li><b><a href={strings.editDistance.theory.longestPalindromHref}>{strings.editDistance.theory.longestPalindromTitle}</a></b></li>
                    <li><b><a href={strings.editDistance.theory.longestCommonSubseqHref}>{strings.editDistance.theory.longestCommonSubseqTitle}</a></b></li>
                </ul>
            </div>
        );
    }
}

export default withStyles(globalStyles)(EditDistanceTheory);
