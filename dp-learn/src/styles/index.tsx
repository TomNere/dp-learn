import { createMuiTheme } from "@material-ui/core";

// Custom Mui theme definition
export default createMuiTheme({
    palette: {
        primary: {
            main: '#263238',
        },
        secondary: {
            light: '#c8b900',
            main: '#0069c0',
        }
    },
    // overrides: {
    //     MuiButton: {
    //       root: {
    //         color: 'red',
    //         '&:hover': {
    //           backgroundColor: 'purple'
    //         }
    //       }
    //     }
    //   },
    shape: {
        borderRadius: 2
    },
    typography: {
        fontSize: 13,
        fontFamily: [
            'Roboto',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        useNextVariants: true,
    },
})
