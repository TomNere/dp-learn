import * as React from 'react';

import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import myTheme from 'src/styles/index';

type AllProps =
    ISimpleSourceCodeProps &
    WithStyles<typeof styles>;

interface ISimpleSourceCodeProps {
    code: string,
}

const styles = () => createStyles({
    code: {
        background: myTheme.palette.primary.main,
        marginLeft: 20,
        color: 'white',
    }
});

// Simple Source code without expanding etc.
class SimpleSourceCode extends React.Component<AllProps> {
    public static defaultProps: ISimpleSourceCodeProps = {
        code: "",
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.code}>
                <pre >
                    <code className="language-clike">
                        {this.props.code}
                    </code>
                </pre>
            </div>
        );
    }
}

export default withStyles(styles)(SimpleSourceCode);
