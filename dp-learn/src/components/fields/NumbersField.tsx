import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { TextField } from '@material-ui/core';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    onChange: (e: any) => any,
    numbers: string,
    label: string
}

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 200,
    },
});

class NumbersField extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props)
    }

    public render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} autoComplete='off'>
                <TextField
                    label={this.props.label}
                    className={classes.textField}
                    value={this.props.numbers}
                    onChange={this.props.onChange}
                    margin='normal'
                />
            </form>
        );
    }
}

export default withStyles(styles)(NumbersField);
