import * as React from 'react';

import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import BottomMarginDiv from 'src/components/hoc/BottomMarginDiv';
import { globalStyles } from 'src/styles/globalStyles';
import { strings } from 'src/strings/translations/strings';

type AllProps =
    IStatsTableProps &
    WithStyles<typeof globalStyles>;

interface IStatsTableProps {
    data: IStatsTableData[]
}

export interface IStatsTableData {
    name: string,
    recTheorTime: number,
    recTime: number,
    dpTime: number,
    dpTheorTime: number,
    dpSpace: number,
    recSpace: number
}

// Table showing stats about algorithm
class StatsTable extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;
        return (
            <BottomMarginDiv>
                <Table className={classes.table}>
                    <TableBody>
                        {this.getTimeAndSpace()}
                        {this.getColsBrief()}
                        {this.getValues()}
                    </TableBody>
                </Table>
            </BottomMarginDiv>
        );
    }

    // Get table header 1
    private getTimeAndSpace = () => {
        const { classes } = this.props;
        const columnCaption = [classes.columnCaption, classes.caption].join(' ');

        return (
            <TableRow>
                {/* Table brief */}
                <TableCell rowSpan={2} className={classes.tableHeading}>
                    {strings.statsGlobal.tableComparison}
                </TableCell>

                {/* Time complexity */}
                <TableCell colSpan={4} className={columnCaption}>
                    {strings.global.timeComplex}
                </TableCell>

                {/* Space complexity */}
                <TableCell colSpan={2} className={columnCaption}>
                    {strings.global.spaceComplex}
                </TableCell>
            </TableRow>
        );
    }

    // Get table header 2
    private getColsBrief = () => {
        const { classes } = this.props;
        return (
            <TableRow>
                {/* recTheorTime */}
                <TableCell className={[classes.columnCaption, classes.recTheorBackground].join(' ')} >
                    {`${strings.global.recursion} (${strings.statsGlobal.theoreticalValueShort})`}
                </TableCell>

                {/* recTime */}
                <TableCell className={[classes.columnCaption, classes.recBackground].join(' ')} >
                    {`${strings.global.recursion}`}
                </TableCell>

                {/* dpTheorTime */}
                <TableCell className={[classes.columnCaption, classes.dpTheorBackground].join(' ')} >
                    {`${strings.global.dp} (${strings.statsGlobal.theoreticalValueShort})`}
                </TableCell>

                {/* dpTime */}
                <TableCell className={[classes.columnCaption, classes.dpBackground].join(' ')} >
                    {`${strings.global.dp}`}
                </TableCell>

                {/* recSpace */}
                <TableCell className={[classes.columnCaption, classes.recBackground].join(' ')} >
                    {`${strings.global.recursion}`}
                </TableCell>

                {/* dpSpace */}
                <TableCell className={[classes.columnCaption, classes.dpBackground].join(' ')} >
                    {`${strings.global.dp}`}
                </TableCell>
            </TableRow>
        )
    }

    // Get table body
    private getValues = () => {
        const { classes, data } = this.props;
        const body = [];

        for (const item of data) {
            body.push(
                <TableRow key={`row ${data.indexOf(item)}`}>
                    {/* Row name */}
                    <TableCell className={[classes.rowCaption, classes.caption].join(' ')}>
                        {item.name}
                    </TableCell>

                    {/* recTheorTime */}
                    <TableCell className={classes.tableCell}>
                        {item.recTheorTime}
                    </TableCell>

                    {/* recTime */}
                    <TableCell className={classes.tableCell}>
                        {item.recTime}
                    </TableCell>

                    {/* dpTheorTime */}
                    <TableCell className={classes.tableCell}>
                        {item.dpTheorTime}
                    </TableCell>

                    {/* dpTime */}
                    <TableCell className={classes.tableCell}>
                        {item.dpTime}
                    </TableCell>

                    {/* recSpace */}
                    <TableCell className={classes.tableCell}>
                        {item.recSpace}
                    </TableCell>

                    {/* dpSpace */}
                    <TableCell className={classes.tableCell}>
                        {item.dpSpace}
                    </TableCell>
                </TableRow>
            );
        }

        return body;
    }
}

export default withStyles(globalStyles)(StatsTable);
