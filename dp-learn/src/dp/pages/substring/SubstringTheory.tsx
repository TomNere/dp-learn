import '../../../styles/prism.css';

import * as Markdown from 'react-markdown';
import * as Prism from 'prismjs';
import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { substrDynCode, substrRecCode, substringDpSpaceComplex, substringDpTimeComplex, substringRecSpaceComplex, substringRecTimeComplex } from 'src/dp/helpers/substring/SubstringStrings';

import BottomMarginDiv from 'src/hoc/BottomMarginDiv';
import Complexity from 'src/components/dpComponents/Complexity';
import CustomTitle from 'src/hoc/CustomTitle';
import FlexOne from 'src/hoc/FlexOne';
import PaddingDiv from 'src/hoc/PaddingDiv';
import PaddingImage from 'src/hoc/PaddingImage';
import SourceCode from 'src/components/dpComponents/SourceCode';
import Table1 from 'src/resources/substring/substringTable1.svg';
import Table2 from 'src/resources/substring/substringTable2.svg';
import Table3 from 'src/resources/substring/substringTable3.svg';
import Tree from 'src/resources/substring/substringTree.svg';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/languages';

type AllProps =
    WithStyles<typeof globalStyles>;

class SubstringTheory extends React.Component<AllProps> {
    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <CustomTitle variant='h5'>
                    {strings.substring.theory.title}
                </CustomTitle>
                {/* What is longest common substring problem */}
                <BottomMarginDiv>
                    <Markdown source={strings.rod.theory.brief.b1} />

                    {strings.theoryGlobal.eg}
                    <ul className={classes.simpleList}>
                        <li>X = {"'Unicasting'"}</li>
                        <li>Y = {"'unitTesting'"}</li>
                    </ul>

                    {strings.rod.theory.brief.b2}
                    <ul className={classes.simpleList}>
                        <li><Markdown source={strings.substring.theory.brief.strX} /></li>
                        <li><Markdown source={strings.substring.theory.brief.strY} /></li>
                    </ul>
                    <Markdown source={strings.substring.theory.brief.b3} />
                    <Markdown source={strings.substring.theory.brief.b4} />
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
                                <Markdown source={strings.substring.theory.recursion} />
                                <Markdown source={strings.substring.theory.recTime} />
                                <Markdown source={strings.substring.theory.recSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={substringRecTimeComplex} space={substringRecSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Recursion Tree */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.recusionTree}
                            </Typography>
                            <PaddingImage>
                                <img src={Tree} alt="SubstringRecTree" />
                            </PaddingImage>
                            <SourceCode code={substrRecCode} />
                        </PaddingDiv>
                    </FlexOne>

                    {/* Dynamic programming */}
                    <FlexOne>
                        <PaddingDiv>
                            <Typography variant={'h5'} align={'center'}>
                                {strings.global.dynProgSolution}
                            </Typography>

                            <BottomMarginDiv>
                                <Markdown source={strings.substring.theory.dynProg} />
                                <Markdown source={strings.substring.theory.dpTime} />
                                <Markdown source={strings.substring.theory.dpSpace} />
                            </BottomMarginDiv>

                            <BottomMarginDiv>
                                <Complexity time={substringDpTimeComplex} space={substringDpSpaceComplex} />
                            </BottomMarginDiv>

                            {/* Table examples */}
                            <Typography variant={'h6'} className={classes.bottomMargin}>
                                {strings.global.tables}
                            </Typography>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'}>
                                    <ul className={classes.simpleList}>
                                        <li>X = {"'dog'"}</li>
                                        <li>Y = {"'frog'"}</li>
                                        <li>{strings.substring.theory.zero}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            <PaddingImage>
                                <img src={Table1} width='350' />
                            </PaddingImage>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'} >
                                    <ul className={classes.simpleList}>
                                        <li>X = {"'dog'"}</li>
                                        <li>Y = {"'frog'"}</li>
                                        <li>{strings.substring.theory.increment}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            <PaddingImage>
                                <img src={Table2} width='350' />
                            </PaddingImage>

                            <BottomMarginDiv>
                                <Typography variant={'subtitle1'} >
                                    <ul className={classes.simpleList}>
                                        <li>X = {"'dog'"}</li>
                                        <li>Y = {"'dig'"}</li>
                                        <li>{strings.substring.theory.one}</li>
                                    </ul>
                                </Typography>
                            </BottomMarginDiv>

                            <PaddingImage>
                                <img src={Table3} width='350' />
                            </PaddingImage>

                            <SourceCode code={substrDynCode} />
                        </PaddingDiv>
                    </FlexOne>
                </Grid>
            </div>
        );
    }
}

export default withStyles(globalStyles)(SubstringTheory);
