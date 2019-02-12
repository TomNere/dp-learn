import * as React from 'react';

import { AccessTime, Storage } from '@material-ui/icons';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { strings } from 'src/translations/languages';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    time: string,
    space: string
}

const styles = (theme: Theme) => createStyles({
    complexityParent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    complexity: {
        margin: theme.spacing.unit * 3,
        border: '1px solid black',
        padding: '8px 4px',
        marginRight: '20px',
        display: 'inline-block',
        '& svg': {
            display: 'inline-block',
            verticalAlign: 'middle'
        }
    },
})

class Complexity extends React.Component<AllProps> {
    public static defaultProps: any = {
        time: "",
        space: ""
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.complexityParent}>
                <div className={classes.complexity}>
                    {(this.props.time !== "") &&
                        <div>
                            <AccessTime />
                            <span>
                                {strings.components.timeComplex} <b>{this.props.time}</b>
                            </span>
                            <br />
                        </div>
                    }
                    {(this.props.space !== "") &&
                        <div>
                            <Storage />
                            <span>{strings.components.spaceComplex} <b>{this.props.space}</b></span>
                            <br />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Complexity);
