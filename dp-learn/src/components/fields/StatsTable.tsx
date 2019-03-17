import * as React from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import { IStatsTableData } from 'src/types';
import { demoStyles } from 'src/styles/demoStyles';
import { strings } from 'src/strings/languages';

type AllProps =
    IStateProps &
    WithStyles<typeof demoStyles>;

interface IStateProps {
    data: IStatsTableData[]
}


class StatsTable extends React.Component<AllProps> {
    public render() {
        const { classes } = this.props;

        return (
            <Table className={[classes.table, classes.bottomMargin].join(' ')}>
                <TableHead>
                    <TableRow>
                        {this.tableHead()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.tableBody()}
                </TableBody>
            </Table>
        );
    }

    private tableHead = () => {
        const { classes } = this.props;

        const heading = [];

        heading.push(<TableCell key='tableHeading' className={[classes.columnCaption, classes.caption].join(' ')} />)

        heading.push(
            <TableCell key='dpTime' className={[classes.columnCaption, classes.caption].join(' ')} >
                {`${strings.global.dp} - ${strings.components.timeComplex}`}
            </TableCell>)

        heading.push(
            <TableCell key='recTime' className={[classes.columnCaption, classes.caption].join(' ')} >
                {`${strings.global.recursion} - ${strings.components.timeComplex}`}
            </TableCell>)

        heading.push(
            <TableCell key='dpSpace' className={[classes.columnCaption, classes.caption].join(' ')} >
                {`${strings.global.dp} - ${strings.components.spaceComplex}`}
            </TableCell>)

        heading.push(
            <TableCell key='recSpace' className={[classes.columnCaption, classes.caption].join(' ')} >
                {`${strings.global.recursion} - ${strings.components.spaceComplex}`}
            </TableCell>)

        return heading;
    }

    private tableBody = () => {
        const { classes, data } = this.props;

        const body = [];
        let classNames = [];

        for (let i = 0; i < data.length; i++) {
            const row = [];

            classNames = [classes.rowCaption, classes.caption];

            // Row name
            row.push(
                <TableCell key={`rowName ${i.toString()}`} className={classNames.join(' ')}>
                    {data[i].name}
                </TableCell>
            );

            classNames = [classes.tableCell];

            row.push(
                <TableCell key={`dpTime${i}`} className={classNames.join(' ')}>
                    {data[i].dpTime}
                </TableCell>
            );

            row.push(
                <TableCell key={`recTime${i}`} className={classNames.join(' ')}>
                    {data[i].recTime}
                </TableCell>
            );

            row.push(
                <TableCell key={`dpSpace${i}`} className={classNames.join(' ')}>
                    {data[i].dpSpace}
                </TableCell>
            );

            row.push(
                <TableCell key={`recSpace${i}`} className={classNames.join(' ')}>
                    {data[i].recSpace}
                </TableCell>
            );

            // Push row to the table
            body.push(
                <TableRow key={`row ${i}`}>
                    {row}
                </TableRow>
            );
        }

        return body;
    }
}

export default withStyles(demoStyles)(StatsTable);
