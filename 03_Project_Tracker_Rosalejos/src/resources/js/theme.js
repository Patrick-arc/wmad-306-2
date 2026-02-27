import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6E56F9',
            light: '#EDEBFF',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#9F8CFF',
            light: '#F3EEFF',
        },
        background: {
            default: '#F4F1FF',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0F172A',
            secondary: '#6B7280',
        },
    },
    typography: {
        fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    background: 'linear-gradient(90deg, #7C62FF 0%, #5E3BFF 100%)',
                    boxShadow: '0 6px 20px rgba(110,86,249,0.18)',
                    color: '#fff',
                },
            },
        },
    },
});

export default theme;
