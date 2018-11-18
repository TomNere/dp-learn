import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#263238',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated from palette.primary.main,
        }
    },
    overrides: {
        MuiButton: {
          root: {
            color: 'red',
            '&:hover': {
              backgroundColor: 'purple'
            }
          }
        }
      },
    shape: {
        borderRadius: 2
    },
    typography: {
        fontSize: 13,
        useNextVariants: true
    },
})