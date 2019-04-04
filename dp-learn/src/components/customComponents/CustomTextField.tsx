import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { TextField } from '@material-ui/core';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    onChange: (e: any) => any,
    value: string,
    label: string
}

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 300,
    },
});

// Custom styled editable textfield 
class CustomTextField extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { classes } = this.props;
        return (
            <form autoComplete='off'>
                <TextField
                    label={this.props.label}
                    className={classes.textField}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    margin='normal'
                />
            </form>
        );
    }
}

export default withStyles(styles)(CustomTextField);
