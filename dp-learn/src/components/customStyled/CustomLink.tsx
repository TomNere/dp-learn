// author: Tomáš Nereča, 2019

import * as React from 'react';

import { Link } from "@material-ui/core";
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';
import { blueColor } from 'src/styles/globalStyles';

type AllProps =
    ICustomLinkProps &
    WithStyles<typeof styles>;

interface ICustomLinkProps {
    href: string,
    children: ReactNode
}

export const styles = () => createStyles({
    color: {
        color: blueColor
    },
});

// Blue colored material Button
class BoldLink extends React.Component<AllProps> {
    public static defaultProps: any = {
        disabled: false,
    }

    public render() {
        return (
            <b className={this.props.classes.color}>
                <Link color='inherit' href={`${this.props.href}`}>{this.props.children}</Link>
            </b>
        )
    }
}

export default withStyles(styles)(BoldLink);
