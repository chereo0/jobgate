import { createTheme } from '@mui/material/styles';

const companyTheme = createTheme({
    palette: {
        primary: {
            main: '#0a66c2', // LinkedIn blue
            light: '#3b82f6',
            dark: '#004182',
        },
        secondary: {
            main: '#0f172a', // Dark navy
            light: '#1e293b',
        },
        background: {
            default: '#f8f9fb',
            paper: '#ffffff',
        },
        success: {
            main: '#10b981',
            light: '#d1fae5',
        },
        warning: {
            main: '#f59e0b',
        },
        error: {
            main: '#ef4444',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
            fontSize: '1.875rem',
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                },
            },
        },
    },
});

export default companyTheme;
