'use client';
import {createTheme} from "@mui/material/styles";
import '@fontsource/rajdhani/300.css';
import '@fontsource/rajdhani/400.css';
import '@fontsource/rajdhani/500.css';
import '@fontsource/rajdhani/600.css';
import '@fontsource/rajdhani/700.css';
import '@fontsource/exo-2/300.css';
import '@fontsource/exo-2/400.css';
import '@fontsource/exo-2/500.css';
import '@fontsource/exo-2/600.css';
import '@fontsource/exo-2/700.css';
import '@fontsource/lobster';

// @ts-ignore
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#c8c8c8',
        },
        info: {
            main: '#4765fa',
        },
        success: {
            main: '#4caf50',
            'contrastText': '#fff'
        },
        warning: {
            main: '#ff9800',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#2c2c2c',
        },
        text: {
            primary: '#dadada',
            secondary: '#ffffff',
        }
    },
    typography: {
        fontFamily: [
            "'Exo 2'",
            "'Rajdhani'",
            "'Lobster'",
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
                }
            }
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
                    '& .MuiListItemButton-root.Mui-selected': {
                        backgroundColor: '#2c2c2c',
                    },

                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    }
})

export default theme