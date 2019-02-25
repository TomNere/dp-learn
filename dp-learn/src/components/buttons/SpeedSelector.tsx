import * as React from 'react';

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";

import { strings } from 'src/strings/languages';

interface IStateProps {
    speed: string,
    onClick: (e: any) => any
}

class SpeedSelector extends React.Component<IStateProps> {

    public render() {
        return (
            <div>
                <FormControl component={"fieldset" as "div"}>
                    <FormLabel component="label">
                        {strings.components.speed}
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
                            label={strings.components.step}
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }
}

export default (SpeedSelector);
