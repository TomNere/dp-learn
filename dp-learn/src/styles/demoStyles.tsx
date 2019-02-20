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
    buttonDark: {
        margin: theme.spacing.unit,
        color: 'white',
        backgroundColor: myTheme.palette.primary.main,
        "&:hover": {
            backgroundColor: myTheme.palette.secondary.main
        }
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
    },
    highlitedCell: {
        backgroundColor: myTheme.palette.secondary.main
    },
    greenCell: {
        backgroundColor: 'green'
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
});
