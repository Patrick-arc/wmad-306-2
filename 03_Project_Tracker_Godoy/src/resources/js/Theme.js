import { createTheme } from '@mui/material/styles';

// Light theme with professional gradient blue palette
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 25%, #90CAF9 50%, #64B5F6 75%, #42A5F5 100%)', // Professional gradient blue
            paper: '#FFFFFF', // Clean white
        },
        primary: {
            main: '#1976D2', // Professional blue
            light: '#42A5F5',
            dark: '#1565C0',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#5C6BC0', // Soft indigo
            light: '#7986CB',
            dark: '#3949AB',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#1A237E', // Deep blue text
            secondary: '#424242',
        },
        success: {
            main: '#4CAF50',
            light: '#81C784',
            dark: '#388E3C',
        },
        warning: {
            main: '#FF9800',
            light: '#FFB74D',
            dark: '#F57C00',
        },
        error: {
            main: '#F44336',
            light: '#E57373',
            dark: '#D32F2F',
        },
        info: {
            main: '#2196F3',
            light: '#64B5F6',
            dark: '#1976D2',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.4,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    borderRadius: 12,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

// Dark theme with professional blue gradient palette
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 25%, #1976D2 50%, #1E88E5 75%, #2196F3 100%)', // Professional dark blue gradient
            paper: '#1A237E', // Deep blue paper
        },
        primary: {
            main: '#90CAF9', // Light blue accent
            light: '#BBDEFB',
            dark: '#64B5F6',
            contrastText: '#0D47A1',
        },
        secondary: {
            main: '#7986CB', // Soft indigo
            light: '#9FA8DA',
            dark: '#5C6BC0',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#E3F2FD', // Light blue text
            secondary: '#BBDEFB',
        },
        success: {
            main: '#66BB6A',
            light: '#81C784',
            dark: '#4CAF50',
        },
        warning: {
            main: '#FFB74D',
            light: '#FFCC80',
            dark: '#FF9800',
        },
        error: {
            main: '#EF5350',
            light: '#E57373',
            dark: '#F44336',
        },
        info: {
            main: '#64B5F6',
            light: '#90CAF9',
            dark: '#2196F3',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.4,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                    borderRadius: 12,
                    backgroundImage: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export { lightTheme, darkTheme };
