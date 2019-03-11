import * as React from 'react';

import { Button, Theme } from "@material-ui/core";
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import myTheme from 'src/styles/index';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    visible: boolean,
    color: 'light' | 'dark',
    onClick: (e: any) => any,
    label: string
}

export const styles = (theme: Theme) => createStyles({
    buttonLight: {
        margin: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.secondary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.primary.main
        }
    },
    buttonDark: {
        margin: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.primary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.secondary.main
        }
    },
});

class MyButton extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div>
                {(this.props.visible) &&
                    <Button 
                        variant='contained' 
                        color='primary'
                        className={this.props.color === 'light' ? classes.buttonLight : classes.buttonDark} 
                        onClick={this.props.onClick}
                    >
                        {this.props.label}
                    </Button>
                }
            </div>
        )
    }
}

export default withStyles(styles)(MyButton);
