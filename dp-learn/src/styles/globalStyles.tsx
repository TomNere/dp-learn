import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

// Color definitions
export const darkColor = '#263238';
export const blueColor = '#0069c0';
export const recTheorColor = '#42a5f5';
export const recColor = '#ff7043';
export const dpTheorColor = '#ffca28';
export const dpColor = '#9ccc65';

// Style definition for all "Demo" components
export const globalStyles = (theme: Theme) => createStyles({
    bottomMargin: {
        marginBottom: theme.spacing.unit * 2,
    },
    tableHeading: {
        fontSize: theme.typography.pxToRem(18),
        textAlign: 'center',
        padding: theme.spacing.unit,
        color: 'white',
        backgroundColor: darkColor,
        borderRight: 'solid 1px gray',
    },
    blueCaption: {
        borderRight: 'solid 1px gray',
        backgroundColor: '#1dd8ff',
        padding: '4px 24px 4px 14px',
    },
    caption: {
        color: 'white',
        borderRight: 'solid 1px gray',
        backgroundColor: darkColor,
        padding: '4px 24px 4px 14px',
    },
    recTheorBackground: {
        backgroundColor: recTheorColor
    },
    recBackground: {
        backgroundColor: recColor
    },
    dpTheorBackground: {
        backgroundColor: dpTheorColor
    },
    dpBackground: {
        backgroundColor: dpColor
    },
    columnCaption: {
        fontSize: theme.typography.pxToRem(14),
        textAlign: 'center',
        padding: theme.spacing.unit,
    },
    rowCaption: {
        fontSize: theme.typography.pxToRem(14),
    },
    tableCell: {
        textAlign: 'center',
        padding: 0,
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        minWidth: 64
    },
    statsTableCell: {
        textAlign: 'center',
        padding: 0,
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        minWidth: 250
    },
    yellowCell: {
        backgroundColor: '#ffef25'
    },
    greenCell: {
        backgroundColor: 'green'
    },
    blueCell: {
        backgroundColor: '#1dd8ff'
    },
    redCell: {
        backgroundColor: 'red'
    },
    sign: {
        fontSize: 30,
        margin: theme.spacing.unit
    },
    table: {
        width: 'auto',
        "& td:last-child, th:last-child": {
            paddingRight: 4
        },
    },
    subRes: {
        color: 'white',
        backgroundColor: darkColor,
        padding: '4px 24px 4px 14px',
    },
    emptyCell: {
        border: 'none'
    },
    container: {
        display: 'flex'
    },
    center: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    },
    simpleList: {
        listStyleType: 'none'
    },
});
