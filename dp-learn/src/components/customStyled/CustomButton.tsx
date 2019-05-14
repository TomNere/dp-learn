import * as React from 'react';

import { Button, Theme } from "@material-ui/core";
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { blueColor, darkColor } from 'src/styles/globalStyles';

type AllProps =
    ICustomButtonProps &
    WithStyles<typeof styles>;

interface ICustomButtonProps {
    disabled: boolean,
    onClick: (e: any) => any,
    label: string
}

export const styles = (theme: Theme) => createStyles({
    buttonBlue: {
        margin: theme.spacing.unit,
        color: 'white',
        backgroundColor: blueColor,
        "&:hover": {
            backgroundColor: darkColor
        }
    },
});

// Blue colored material Button
class CustomButton extends React.Component<AllProps> {
    public static defaultProps: any = {
        disabled: false,
    }

    public render() {
        const { classes } = this.props;
        return (
            <Button
                variant='contained'
                color='primary'
                disabled={this.props.disabled}
                className={classes.buttonBlue}
                onClick={this.props.onClick}
            >
                {this.props.label}
            </Button>
        )
    }
}

export default withStyles(styles)(CustomButton);
