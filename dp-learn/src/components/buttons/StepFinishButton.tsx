import * as React from 'react';

import { Button, Theme } from "@material-ui/core";
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import myTheme from 'src/styles/index';
import { strings } from 'src/strings/languages';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    visible: boolean,    
    speed: number,
    onStepClick: (e: any) => any,
    onFinishClick: (e: any) => any
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
});

class StepFinishButton extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div>
                {(this.props.visible) &&
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.buttonLight} 
                        onClick={this.props.speed === 0 ? this.props.onStepClick : this.props.onFinishClick}
                    >
                        {this.props.speed !== 0 ? strings.global.finish : strings.global.step}
                    </Button>
                }
            </div>
        )
    }
}

export default withStyles(styles)(StepFinishButton);
