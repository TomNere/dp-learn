import * as React from 'react';

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Theme, WithStyles, createStyles, withStyles } from "@material-ui/core";

import { strings } from 'src/strings/languages';

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
                        {strings.global.speed}
                    </FormLabel>
                    <RadioGroup
                        aria-label="speed"
                        name="speed"
                        value={this.props.speed}
                        onChange={this.props.onClick}
                        row={true}
                    >
                        <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="1x"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio color="primary" />}
                            label="2x"
                        />
                        <FormControlLabel
                            value="5"
                            control={<Radio color="primary" />}
                            label="5x"
                        />
                        <FormControlLabel
                            value="10"
                            control={<Radio color="primary" />}
                            label="10x"
                        />
                        <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label={strings.global.stepping}
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }
}

export default withStyles(styles)(SpeedSelector);
