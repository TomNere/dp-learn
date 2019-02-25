import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import myTheme from 'src/styles/index';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    code: string,
}

const styles = (theme: Theme) => createStyles({
    typography: {
        background: myTheme.palette.primary.main,
        marginLeft: 20,
        color: 'white',
    }
})

class SimpleSourceCode extends React.Component<AllProps> {
    public static defaultProps: IStateProps = {
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
