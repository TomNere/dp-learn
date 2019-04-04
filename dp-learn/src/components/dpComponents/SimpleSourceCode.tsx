import * as React from 'react';

import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import myTheme from 'src/styles/index';

type AllProps =
    ISimpleSourceCodeProps &
    WithStyles<typeof styles>;

interface ISimpleSourceCodeProps {
    code: string,
}

const styles = () => createStyles({
    typography: {
        background: myTheme.palette.primary.main,
        marginLeft: 20,
        color: 'white',
    }
})

// Simple Source code without expanding etc.
class SimpleSourceCode extends React.Component<AllProps> {
    public static defaultProps: ISimpleSourceCodeProps = {
        code: "",
    }
    
    public render() {
        const { classes } = this.props;
        return (
            <Typography className={classes.typography}>
                <pre>
                    <code className="language-clike">
                        {this.props.code}
                    </code>
                </pre>
            </Typography>
        );
    }
}

export default withStyles(styles)(SimpleSourceCode);
