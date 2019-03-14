import * as React from 'react';

import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import myTheme from 'src/styles/index';

type AllProps =
    IStateProps &
    WithStyles<typeof styles>;

interface IStateProps {
    visible: boolean,
    result: string,
    subRes: string,
    cols: number,
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
            paddingRight: 4
        },
    },
    subRes: {
        color: 'white',
        backgroundColor: myTheme.palette.primary.main,
        padding: '4px 24px 4px 14px',
    }
})

class DemoTable extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;

        return (
            <div>
                {(this.props.visible) &&
                    <div>
                        {this.props.result !== "" && <div className={classes.centeredContent}>
                            <span>
                                {this.props.result}
                            </span>
                        </div>
                        }
                        <Table className={classes.table}>
                            <TableBody>
                                {this.props.subRes !== "" &&
                                    <TableRow >
                                        <TableCell className={classes.subRes} colSpan={this.props.cols}>
                                            {this.props.subRes}
                                        </TableCell>
                                    </TableRow>
                                }
                                <TableRow>{this.props.head()}</TableRow>
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
