// author: Tomáš Nereča, 2019

import * as React from 'react';

import { Link } from "@material-ui/core";
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

type AllProps =
    IMailLinkProps &
    WithStyles<typeof styles>;

interface IMailLinkProps {
    children: ReactNode
}

export const styles = () => createStyles({
    color: {
        color: 'black'
    },
});

// Blue colored material Button
class MailLink extends React.Component<AllProps> {
    public static defaultProps: any = {
        disabled: false,
    }

    public render() {
        return (
            <div className={this.props.classes.color}>
                <Link color='inherit' href={`mailto:${this.props.children}`}>{this.props.children}</Link>
            </div>
        )
    }
}

export default withStyles(styles)(MailLink);
