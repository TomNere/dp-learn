// author: Tomáš Nereča, 2019

import 'src/styles/prism.css';

import * as Prism from 'prismjs';
import * as React from 'react';

import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Code } from '@material-ui/icons';
import { ReactNode } from 'react';
import { darkColor } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/strings';

type AllProps =
    ISourceCodeProps &
    WithStyles<typeof styles>;

interface ISourceCodeProps {
    children: ReactNode,
}

const styles = (theme: Theme) => createStyles({
    expPanel: {
        background: darkColor,
    },
    whiteText: {
        color: 'white'
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: 0
    },
    pre: {
        marginLeft: 20,
        paddingTop: 0
    }
})

// Source code component with expanding etc.
class SourceCode extends React.Component<AllProps> {
    public componentDidMount() {
        Prism.highlightAll();
    }

    public render() {
        const { classes } = this.props;
        return (
            <ExpansionPanel className={classes.expPanel} defaultExpanded={false}>
                <ExpansionPanelSummary expandIcon={<Code className={classes.whiteText} />}>
                    <Typography className={[classes.heading, classes.whiteText].join(' ')}>{strings.theoryGlobal.srcCode}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <pre>
                        <code className="language-clike">
                            {this.props.children}
                        </code>
                    </pre>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(SourceCode);
