import * as React from 'react';

import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Code } from '@material-ui/icons';
import myTheme from 'src/styles/index';
import { strings } from 'src/strings/languages';

type AllProps =
    ISourceCodeProps &
    WithStyles<typeof styles>;

interface ISourceCodeProps {
    code: string,
    expanded: boolean
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

// Source code component with expanding etc.
class SourceCode extends React.Component<AllProps> {
    public static defaultProps: ISourceCodeProps = {
        code: "",
        expanded: false
    }
    public render() {
        const { classes } = this.props;
        return (
            <ExpansionPanel className={classes.expPanel} defaultExpanded={this.props.expanded}>
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
