import { createTheme, Theme } from "@mui/material";

const matuiTheme: Theme = createTheme({
    typography: {
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

export default matuiTheme;