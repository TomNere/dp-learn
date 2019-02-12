import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import { Fab } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import myTheme from '../../../../styles/index';
import { strings } from 'src/translations/languages';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    variant: 'small' | 'floating',
    onClick: () => any
}

const styles = (theme: Theme) => createStyles({
    floating: {
        position: 'fixed',
        zIndex: 9,
        bottom: '2rem',
        right: '2rem',
        color: 'white',
        borderColor: myTheme.palette.primary.main,
        background: myTheme.palette.secondary.main,
        fontSize: 24,
    },
    small: {
        marginBottom: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.secondary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.primary.main
        }
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
})

class FloatingButton extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;

        return (
            <Fab size={this.props.variant === 'floating' ? 'large' : 'small'} variant='extended' aria-label="demo" className={this.props.variant === 'floating' ? classes.floating : classes.small} onClick={this.props.onClick}>
                <PlayArrow className={classes.extendedIcon} />
                {strings.components.tryDemo}
            </Fab>
        );
    }
}

export default withStyles(styles)(FloatingButton);
