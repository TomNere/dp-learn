// author: Tomáš Nereča, 2019

import * as React from 'react';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

type AllProps =
    ITableImgProps &
    WithStyles<typeof styles>;

interface ITableImgProps {
    src: string,
    alt: string,
    width: string,
    padding: 'big' | 'small'
}

const styles = (theme: Theme) => createStyles({
    big: {
        paddingLeft: 40,    // Same as ul list padding
        paddingRight: 40,    // Same as left
        marginBottom: theme.spacing.unit * 3,
    },
    small: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: theme.spacing.unit * 3,
    },
    maxWidth: {
        maxWidth: '98%'
    }
});

// Special container showing image
class Img extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.padding === 'small' &&
                    <div className={classes.small}>
                        <img className={classes.maxWidth} src={this.props.src} alt={this.props.alt} width={this.props.width} />
                    </div>
                }
                {/* Big is default */}
                {this.props.padding === 'big' &&
                    <div className={classes.big}>
                        <img className={classes.maxWidth} src={this.props.src} alt={this.props.alt} width={this.props.width} />
                    </div>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Img);
