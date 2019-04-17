import * as Markdown from 'react-markdown';
import * as Prism from 'prismjs';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { TreeDynCode, TreeRecCode, treeDpSpaceComplex, treeDpTimeComplex, treeFormula, treeRecSpaceComplex, treeRecTimeComplex } from 'src/dp/helpers/tree/TreeStrings';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import BottomMarginDiv from 'src/hoc/BottomMarginDiv';
import Complexity from 'src/components/dpComponents/Complexity';
import CustomTitle from 'src/hoc/CustomTitle';
import FlexOne from 'src/hoc/FlexOne';
import FlexTwo from 'src/hoc/FlexTwo';
import Formula from 'src/hoc/Formula';
import PaddingDiv from 'src/hoc/PaddingDiv';
import PaddingImage from 'src/hoc/PaddingImage';
import SourceCode from 'src/components/dpComponents/SourceCode';
import Table1En from 'src/resources/tree/treeTable1En.svg';
import Table1Sk from 'src/resources/tree/treeTable1Sk.svg';
import Table2En from 'src/resources/tree/treeTable2En.svg';
import Table2Sk from 'src/resources/tree/treeTable2Sk.svg';
import Tree from 'src/resources/tree/treeTree.svg';
import TreeExample1 from 'src/resources/tree/treeExample1.svg';
import TreeExample2 from 'src/resources/tree/treeExample2.svg';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/languages';

type AllProps =
    WithStyles<typeof globalStyles>;

class TreeTheory extends React.Component<AllProps> {
    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.tree.theory.title}
                </CustomTitle>
                {/* What is edit distance problem */}
                <BottomMarginDiv>
                    <Markdown source={strings.tree.theory.brief.b1} />
                    <ul className={classes.simpleList}>
                        <li>K = {strings.tree.keysExample}</li>
                        <li>F = {strings.tree.freqsExample}</li>
                    </ul>
                    <BottomMarginDiv>
                        {strings.tree.theory.brief.b2}
                    </BottomMarginDiv>

                    {/* Tree examples */}
                    <Grid container={true} direction='row'>
                        <FlexOne>
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.tree.tree} 1
                            </Typography>
                            <PaddingImage>
                                <img src={TreeExample1} width='350' />
                            </PaddingImage>
                        </FlexOne>
                        <FlexTwo>
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.tree.tree} 2
                            </Typography>
                            <PaddingImage>
                                <img src={TreeExample2} width='280' />
                            </PaddingImage>
                        </FlexTwo>
                    </Grid>
                    <Markdown source={strings.tree.theory.brief.b3} />
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
                                <Markdown source={strings.tree.theory.recursion1} />
                                <Markdown source={strings.tree.theory.recTime} />
                                <Markdown source={strings.tree.theory.recSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={treeRecTimeComplex} space={treeRecSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.recusionTree}
                            </Typography>
                            <PaddingImage>
                                <img src={Tree} alt="optimalTreeRecTree" width='90%'/>
                            </PaddingImage>
                            <SourceCode code={TreeRecCode} />
                        </PaddingDiv>
                    </FlexOne>

                    {/* Dynamic programming */}
                    <FlexOne>
                        <PaddingDiv>
                            <Typography variant={'h5'} align={'center'}>
                                {strings.global.dynProgSolution}
                            </Typography>

                            <BottomMarginDiv>
                                <Markdown source={strings.tree.theory.dynProg} />
                                <Formula>
                                    {treeFormula}
                                </Formula>
                                <Markdown source={strings.tree.theory.dpTime} />
                                <Markdown source={strings.tree.theory.dpSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={treeDpTimeComplex} space={treeDpSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Table examples */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.tables}
                            </Typography>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>K = {strings.tree.keysExample}</li>
                                        <li>F = {strings.tree.freqsExample}</li>
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
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>K = {strings.tree.keysExample2}</li>
                                        <li>F = {strings.tree.freqsExample2}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            <PaddingImage>
                                {strings.getLanguage() === 'en' &&
                                    <img src={Table2En} width='650' />
                                }
                                {strings.getLanguage() === 'sk' &&
                                    <img src={Table2Sk} width='650' />
                                }
                            </PaddingImage>
                            <SourceCode code={TreeDynCode} />
                        </PaddingDiv>
                    </FlexOne>
                </Grid>
            </div>
        );
    }
}

export default withStyles(globalStyles)(TreeTheory);
