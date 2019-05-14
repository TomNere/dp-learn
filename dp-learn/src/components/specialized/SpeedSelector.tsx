import * as React from 'react';

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Theme, WithStyles, createStyles, withStyles } from "@material-ui/core";

import { strings } from 'src/strings/translations/strings';

type AllProps =
    ISpeedSelectorProps &
    WithStyles<typeof styles>;

interface ISpeedSelectorProps {
    speed: string,
    onClick: (e: any) => any
}

const styles = (theme: Theme) => createStyles({
    leftMargin: {
        marginLeft: theme.spacing.unit
    }
})

// Speed selector with predefined values
class SpeedSelector extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.leftMargin}>
                <FormControl component={"fieldset" as "div"} margin='normal'>
                    <FormLabel component="label">
                        {strings.demoGlobal.speed}
                    </FormLabel>
                    <RadioGroup
                        aria-label="speed"
                        name="speed"
                        value={this.props.speed}
                        onChange={this.props.onClick}
                        row={true}
                    >
                        <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label={strings.demoGlobal.speed1}
                        />
                        <FormControlLabel
                            value="4.5"
                            control={<Radio color="primary" />}
                            label={strings.demoGlobal.speed2}
                        />
                        <FormControlLabel
                            value="9"
                            control={<Radio color="primary" />}
                            label={strings.demoGlobal.speed3}
                        />
                        <FormControlLabel
                            value="18"
                            control={<Radio color="primary" />}
                            label={strings.demoGlobal.speed4}
                        />
                        <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label={strings.demoGlobal.stepping}
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }
}

export default withStyles(styles)(SpeedSelector);
