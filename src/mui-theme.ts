import { createTheme, Theme } from "@mui/material";

const muiTheme: Theme = createTheme({
    typography: {
        fontFamily: 'Ubuntu',
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: {
            main: '#178841',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#FFFFFF',
            contrastText: '#178841'
        }
    }
})

export default muiTheme;