'use client';
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#121212',
        },
        text: {
            primary: '#fff',
            secondary: '#fff',
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    mixins: {
        toolbar: {
            minHeight:65,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    zIndex: 1201,
                },
},
            },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1a1919',
                    color: '#fff',
                    borderRight: 'none',
                    width: 240,
                    zIndex: 1200,
                },

            },
        },

        MuiListItem: {
            styleOverrides: {
                root: {
                    color: '#fff',

                },
            },
        }

    }
})

export default theme