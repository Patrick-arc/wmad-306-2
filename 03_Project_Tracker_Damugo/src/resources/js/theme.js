import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bfa76a', // Gold
            light: '#d6c491', // Lighter Gold
            dark: '#a08a4a', // Darker Gold
            contrastText: '#181a1d',
        },
        secondary: {
            main: '#bfa76a',
            light: '#d6c491',
            dark: '#a08a4a',
            contrastText: '#181a1d',
        },
        background: {
            default: '#232323', // Charcoal black
            paper: '#232323', // Charcoal black
        },
        text: {
            primary: '#f5f5f5',
            secondary: '#bfa76a',
        },
        divider: 'rgba(191, 167, 106, 0.2)',
        success: {
            main: '#90EE90', // Light green
        },
        warning: {
            main: '#bfa76a',
        },
        error: {
            main: '#FF6B6B', // Light red
        },
        info: {
            main: '#87CEEB', // Sky blue
        },
    },
    typography: {
        fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            color: '#bfa76a',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#bfa76a',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#bfa76a',
        },
        h6: {
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#bfa76a',
        },
        body1: {
            color: '#bfa76a',
        },
        body2: {
            color: '#bfa76a',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                },
                containedPrimary: {
                    background: '#bfa76a',
                    color: '#181a1d',
                    '&:hover': {
                        background: '#a08a4a',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(191, 167, 106, 0.4)',
                    },
                },
                outlined: {
                    borderColor: '#bfa76a',
                    color: '#bfa76a',
                    '&:hover': {
                        backgroundColor: 'rgba(191, 167, 106, 0.1)',
                        borderColor: '#bfa76a',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    backgroundColor: '#1a1410',
                    border: '1px solid rgba(191, 167, 106, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        borderColor: '#bfa76a',
                        boxShadow: '0 12px 48px rgba(191, 167, 106, 0.2)',
                    },
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(245, 222, 179, 0.05)',
                        borderRadius: '8px',
                        color: '#F5DEB3',
                        '& fieldset': {
                            borderColor: 'rgba(191, 167, 106, 0.3)',
                        },
                        '&:hover fieldset': {
                            borderColor: '#bfa76a',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#bfa76a',
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        color: '#F5DEB3',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: 'rgba(191, 167, 106, 0.5)',
                        opacity: 1,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#181a1d',
                    boxShadow: '0 4px 20px rgba(35, 35, 35, 0.5)',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: '70px',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    marginBottom: '8px',
                    backgroundColor: 'rgba(26, 20, 16, 0.6)',
                    border: '1px solid rgba(191, 167, 106, 0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(191, 167, 106, 0.1)',
                        borderColor: '#bfa76a',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: '20px',
                },
            },
        },
    },
});

export default theme;

