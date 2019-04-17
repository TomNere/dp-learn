import * as Markdown from 'react-markdown';
import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import CustomTitle from 'src/hoc/CustomTitle';
import LeftMarginDiv from 'src/hoc/LeftMarginDiv';
import { strings } from 'src/strings/languages';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    parent: {
        padding: theme.spacing.unit * 2,
    },
});

class Intro extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.parent}>
                <CustomTitle variant='h5'>
                    {strings.global.dpLearn}
                </CustomTitle>
                <Markdown source={strings.home.dpLearn} />

                <CustomTitle variant='h5'>
                    {strings.home.whatIsDpTitle}
                </CustomTitle>

                <Markdown source={strings.home.whatIsDpText1} />
                <ul>
                    <li>
                        <b>{strings.home.optSubstructTitle}</b> - {strings.home.optSubstructText}
                    </li>
                    <li>
                        <b>{strings.home.repeatingTitle}</b> - {strings.home.repeatingText}
                    </li>
                </ul>
                <Markdown source={strings.home.whatIsDpText2} />

                <CustomTitle variant='h5'>
                    {strings.home.partsTitle}
                </CustomTitle>
                <Markdown source={strings.home.partsText} />

                <LeftMarginDiv>
                    <CustomTitle variant='h6'>
                        {strings.home.theoryTitle}
                    </CustomTitle>
                    <Markdown source={strings.home.theoryText} />
                    <CustomTitle variant='h6'>
                        {strings.home.demoTitle}
                    </CustomTitle>
                    <Markdown source={strings.home.demoText} />
                    <CustomTitle variant='h6'>
                        {strings.home.statsTitle}
                    </CustomTitle>
                    <Markdown source={strings.home.statsText} />
                </LeftMarginDiv>
                <CustomTitle variant='h5'>
                    {strings.home.references}
                </CustomTitle>
                <ul>
                    <li>
                        <b><a href={strings.home.geeksHref}>{strings.home.geeksTitle}</a></b> - {strings.home.geeksText}
                    </li>
                    <li>
                        <b><a href={strings.home.algorithmsHref}>{strings.home.algorithmsTitle}</a></b> - {strings.home.algorithmsText}
                    </li>
                </ul>
            </div>
        );
    }
}

export default withStyles(styles)(Intro);
