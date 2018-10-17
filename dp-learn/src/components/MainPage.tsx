import * as React from 'react';
// tslint:disable-next-line:ordered-imports
import { Theme, WithStyles, withStyles, Grow } from '@material-ui/core';

export interface IProps {
    visible: boolean
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundColor: '#263238',
        display: 'flex',
    },
    grid: {
        marginTop: 100,
    },
    brief: {
        fontSize: 24,
        color: 'green'
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: 100,
        color: 'white',
        borderColor: 'white',
        borderWidth: 2
    },
});

type AllProps =
    IProps &
    WithStyles<typeof styles>;

class MainPage extends React.Component<AllProps> {
    public static defaultProps: IProps = {
        visible: true
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Grow
                    in={this.props.visible}
                    timeout={5000}
                >
                <div className={classes.brief}>Main Page</div>
                </Grow>
                <Grow
                    in={this.props.visible}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(this.props.visible ? { timeout: 5000 } : {})}
                >
                <div className={classes.brief}>Main Page</div>
                </Grow>
                
            </div>



        );
    }

}

// helpers

export default withStyles(styles)(MainPage);
