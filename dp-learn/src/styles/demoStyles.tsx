import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import myTheme from './index';

export const demoStyles = (theme: Theme) => createStyles({
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
        marginBottom: 15,
    },
    tableHeading: {
        backgroundColor: 'green',
        color: 'white',
        borderRight: 'solid 1px gray',
        fontSize: theme.typography.pxToRem(14),
        padding: '4px 24px 4px 14px',
    },
    caption: {
        color: 'white',
        borderRight: 'solid 1px gray',
        backgroundColor: myTheme.palette.primary.main,
        padding: '4px 24px 4px 14px',
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
    yellowCell: {
        backgroundColor: '#ffef25'
    },
    greenCell: {
        backgroundColor: 'green'
    },
    blueCell: {
        backgroundColor: '#1dd8ff'
    },
    avatar: {
        margin: 10,
        height: 70,
        width: 70,
        display: 'flex',
        color: '#fff',
        fontSize: 30
    },
    avatars: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultAvatar: {
        backgroundColor: myTheme.palette.secondary.main
    },
    greenAvatar: {
        backgroundColor: 'green'
    },
    redAvatar: {
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
        width: 'auto',
        "& td:last-child, th:last-child": {
            paddingRight: theme.spacing.unit
        },
    },
    subRes: {
        color: 'white',
        backgroundColor: myTheme.palette.primary.main,
        padding: '4px 24px 4px 14px',
    }
});
