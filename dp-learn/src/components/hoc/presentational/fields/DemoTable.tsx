import * as React from 'react';

import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import myTheme from '../../../../styles/index';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    visible: boolean,
    result: string,
    head: () => any,
    body: () => any
}

const styles = (theme: Theme) => createStyles({
    centeredContent: {
        textAlign: 'center',
        margin: theme.spacing.unit * 2,
        "& span": {
            fontSize: theme.typography.pxToRem(24),
            color: 'white',
            backgroundColor: myTheme.palette.secondary.main,
            padding: theme.spacing.unit,
            borderRadius: theme.spacing.unit * 2,
        }
    },
    table: {
        width: 'auto',
        "& td:last-child, th:last-child": {
            paddingRight: theme.spacing.unit
        },
    },
})

class DemoTable extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;

        return (
            <div>
            {(this.props.visible) &&
                <div>
                    <div className={classes.centeredContent}>
                        <span>
                            {this.props.result}
                        </span>
                    </div>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {this.props.head()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.body()}
                        </TableBody>
                    </Table>
                </div>
            }
            </div>
        );
    }
}

export default withStyles(styles)(DemoTable);
