import * as Markdown from 'react-markdown';
import * as Prism from 'prismjs';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { editDistDpSpaceComplex, editDistDpTimeComplex, editDistDynCode, editDistRecCode, editDistRecSpaceComplex, editDistRecTimeComplex } from 'src/strings/dpProblemsStrings/EditDistanceStrings';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import Complexity from 'src/components/specialized/Complexity';
import CustomTitle from 'src/components/customStyled/CustomTitle';
import FlexOne from 'src/components/hoc/FlexOne';
import PaddingDiv from 'src/components/hoc/PaddingDiv';
import PaddingImage from 'src/components/hoc/PaddingImage';
import SourceCode from 'src/components/specialized/SourceCode';
import Table1En from 'src/resources/editDistance/editDistTable1En.svg';
import Table1Sk from 'src/resources/editDistance/editDistTable1Sk.svg';
import Table2En from 'src/resources/editDistance/editDistTable2En.svg';
import Table2Sk from 'src/resources/editDistance/editDistTable2Sk.svg';
import Tree from 'src/resources/editDistance/editDistTree.svg';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/languages';

type AllProps =
    WithStyles<typeof globalStyles>;

class EditDistanceTheory extends React.Component<AllProps> {
    public componentDidMount() {
        Prism.highlightAll();
    }

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
                    <ul className={classes.simpleList}>
                        <li>X = {"'AdRemovee'"}</li>
                        <li>Y = {"'AddRemove'"}</li>
                    </ul>
                    {strings.editDistance.theory.brief.b2}
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
                                <Markdown source={strings.editDistance.theory.recursion1} />
                                <ul>
                                    <li><Markdown source={strings.editDistance.theory.op1} /></li>
                                    <li><Markdown source={strings.editDistance.theory.op2} /></li>
                                    <li><Markdown source={strings.editDistance.theory.op3} /></li>
                                </ul>
                                <Markdown source={strings.editDistance.theory.recTime} />
                                <Markdown source={strings.editDistance.theory.recSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={editDistRecTimeComplex} space={editDistRecSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.recusionTree}
                            </Typography>
                            <PaddingImage>
                                <img src={Tree} alt="EditDistanceRecTree" />
                            </PaddingImage>
                            <SourceCode code={editDistRecCode} />
                        </PaddingDiv>
                    </FlexOne>

                    {/* Dynamic programming */}
                    <FlexOne>
                        <PaddingDiv>
                            <Typography variant={'h5'} align={'center'}>
                                {strings.global.dynProgSolution}
                            </Typography>

                            <BottomMarginDiv>
                                <Markdown source={strings.editDistance.theory.dynProg} />
                                <ul>
                                    <li><Markdown source={strings.editDistance.theory.dpOp1} /></li>
                                    <li><Markdown source={strings.editDistance.theory.dpOp2} /></li>
                                    <li><Markdown source={strings.editDistance.theory.dpOp3} /></li>
                                </ul>
                                <Markdown source={strings.editDistance.theory.dpTime} />
                                <Markdown source={strings.editDistance.theory.dpSpace} />
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
                                        <li>X = {"'AdRemovee'"}</li>
                                        <li>Y = {"'AddRemove'"}</li>
                                        <li>{strings.editDistance.theory.match}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            <PaddingImage>
                                {strings.getLanguage() === 'en' &&
                                    <img src={Table1En} width='450' />
                                }
                                {strings.getLanguage() === 'sk' &&
                                    <img src={Table1Sk} width='450' />
                                }
                            </PaddingImage>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'} >
                                    <ul className={classes.simpleList}>
                                        <li>X = {"'AdRemovee'"}</li>
                                        <li>Y = {"'AddRemove'"}</li>
                                        <li>{strings.editDistance.theory.noMatch}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            <PaddingImage>
                                {strings.getLanguage() === 'en' &&
                                    <img src={Table2En} width='450' />
                                }
                                {strings.getLanguage() === 'sk' &&
                                    <img src={Table2Sk} width='450' />
                                }
                            </PaddingImage>

                            <SourceCode code={editDistDynCode} />
                        </PaddingDiv>
                    </FlexOne>
                </Grid>
            </div>
        );
    }
}

export default withStyles(globalStyles)(EditDistanceTheory);
