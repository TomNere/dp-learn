import { dpColor, recColor, recTheorColor } from './colors'

import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import myTheme from './index';

// Style definition for all "Demo" components
export const demoStyle = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 200,
    },
    bottomMargin: {
        marginBottom: theme.spacing.unit * 2,
    },
    tableHeading: {
        fontSize: theme.typography.pxToRem(18),
        textAlign: 'center',
        padding: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.primary.main,
        borderRight: 'solid 1px gray',
    },
    caption: {
        color: 'white',
        borderRight: 'solid 1px gray',
        backgroundColor: myTheme.palette.primary.main,
        padding: '4px 24px 4px 14px',
    },
    recTheorBackground: {
        backgroundColor: recTheorColor
    },
    recBackground: {
        backgroundColor: recColor
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
    incCell: {
        backgroundColor: myTheme.palette.secondary.light
    },
    sign: {
        fontSize: 30,
        margin: theme.spacing.unit
    },
    flexChild: {
        flex: 1,
    },
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
        "& td:last-child, th:last-child": {
            paddingRight: theme.spacing.unit
        },
    },
    subRes: {
        color: 'white',
        backgroundColor: myTheme.palette.primary.main,
        padding: '4px 24px 4px 14px',
    },
    emptyCell: {
        border: 'none'
    }
});
