import * as React from 'react';

import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Code } from '@material-ui/icons';
import myTheme from '../../../../styles/index';
import { strings } from 'src/translations/languages';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    code: string
}

const styles = (theme: Theme) => createStyles({
    expPanel: {
        background: myTheme.palette.primary.main,
    },
    whiteText: {
        color: 'white'
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    leftMargin: {
        marginLeft: 20
    },
})

class SourceCode extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;

        return (
            <ExpansionPanel className={classes.expPanel}>
                <ExpansionPanelSummary expandIcon={<Code className={classes.whiteText} />}>
                    <Typography className={[classes.heading, classes.whiteText].join(' ')}>{strings.components.srcCode}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.leftMargin}>
                        <pre>
                            <code className="language-clike">
                                {this.props.code}
                            </code>
                        </pre>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(SourceCode);
