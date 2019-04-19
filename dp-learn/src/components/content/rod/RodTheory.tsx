import * as Markdown from 'react-markdown';
import * as Prism from 'prismjs';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { rodDpSpaceComplex, rodDpTimeComplex, rodDynCode, rodRecCode, rodRecSpaceComplex, rodRecTimeComplex } from 'src/strings/dpProblemsStrings/RodStrings';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import Complexity from 'src/components/specialized/Complexity';
import CustomTitle from 'src/components/customStyled/CustomTitle';
import FlexOne from 'src/components/hoc/FlexOne';
import PaddingDiv from 'src/components/hoc/PaddingDiv';
import PaddingImage from 'src/components/hoc/PaddingImage';
import SourceCode from 'src/components/specialized/SourceCode';
import Table1En from 'src/resources/rod/rodTable1En.svg';
import Table1Sk from 'src/resources/rod/rodTable1Sk.svg';
import Table2En from 'src/resources/rod/rodTable2En.svg';
import Table2Sk from 'src/resources/rod/rodTable2Sk.svg';
import Tree from 'src/resources/rod/rodTree.svg';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/languages';

type AllProps =
    WithStyles<typeof globalStyles>;

class RodTheory extends React.Component<AllProps> {
    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.rod.theory.title}
                </CustomTitle>
                {/* What is cutting a rod problem */}
                <BottomMarginDiv>
                    <Markdown source={strings.rod.theory.brief.b1} />

                    {strings.theoryGlobal.eg}
                    <ul className={classes.simpleList}>
                        <li>P = {'{ 1, 3, 5 }'}</li>
                    </ul>

                    {strings.rod.theory.brief.b2}
                    <ul className={classes.simpleList}>
                        <li>3 = 1 + 1 + 1 => 1 + 1 + 1 = 3</li>
                        <li>3 = 1 + 2 => 1 + 3 = 4</li>
                        <li>3 = 3 => 5 = 5</li>
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
                                <Markdown source={strings.rod.theory.recursion} />
                                <Markdown source={strings.rod.theory.recTime} />
                                <Markdown source={strings.rod.theory.recSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={rodRecTimeComplex} space={rodRecSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.recusionTree}
                            </Typography>
                            <PaddingImage>
                                <img src={Tree} alt="RodRecTree" />
                            </PaddingImage>
                            <SourceCode code={rodRecCode} />
                        </PaddingDiv>
                    </FlexOne>

                    {/* Dynamic programming */}
                    <FlexOne>
                        <PaddingDiv>
                            <Typography variant={'h5'} align={'center'}>
                                {strings.global.dynProgSolution}
                            </Typography>

                            <BottomMarginDiv>
                                <Markdown source={strings.rod.theory.dynProg} />
                                <Markdown source={strings.rod.theory.dpTime} />
                                <Markdown source={strings.rod.theory.dpSpace} />
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
                                        <li>P = {'{ 1, 5, 6, 6, 9 }'}</li>
                                        <li>{strings.rod.theory.outerCycle} i = 3</li>
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
                                        <li>P = {'{ 1, 5, 6, 6, 9 }'}</li>
                                        <li>{strings.rod.theory.outerCycle} i = 4</li>
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

                            <SourceCode code={rodDynCode} />
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


export default withStyles(globalStyles)(RodTheory);
