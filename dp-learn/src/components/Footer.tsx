// author: Tomáš Nereča, 2019

import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { strings } from 'src/strings/translations/strings';
import { Typography } from '@material-ui/core';
import FooterItem from './hoc/FooterItem';
import { darkColor } from 'src/styles/globalStyles';
import MailLink from './customStyled/MailLink';
import BoldLink from './customStyled/CustomLink';

type AllProps =
    WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
    footer: {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: darkColor,
        color: 'white',
        textAlign: "center",
        zIndex: 1,
        display: 'flex',
        variant: 'row',
        alignContent: 'right'
    },
});

// Intro page
class Footer extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.footer}>
                <FooterItem>
                    <Typography variant='h6' color='inherit' align='left'>
                        {strings.global.writeUs}
                    </Typography>
                    <MailLink>{strings.global.mail}</MailLink>
                </FooterItem>
                <FooterItem>
                    <Typography variant='h6' color='inherit' align='left'>
                        {strings.global.github}
                    </Typography>
                    <BoldLink>{strings.global.githubLink}</BoldLink>
                </FooterItem>
                
            </div>
        );
    }
}

export default withStyles(styles)(Footer);
