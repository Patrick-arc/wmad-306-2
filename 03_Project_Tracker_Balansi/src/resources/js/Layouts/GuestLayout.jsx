import { Link } from '@inertiajs/react';
import { Box, Paper, Typography, Container } from '@mui/material';
import { AutoAwesome as TaskFlowIcon } from '@mui/icons-material';

// --- Apple-Inspired Design System ---
const styles = {
    root: {
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 0%, #f0f2f5 0%, #eef2f3 100%)', // Matches Welcome.jsx
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    glassCard: {
        width: '100%',
        maxWidth: '450px', // Standard width for auth forms
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(24px)', 
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
        padding: '40px',
        marginTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    logoContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 1.5, 
        mb: 1,
        textDecoration: 'none' 
    }
};

export default function Guest({ children }) {
    return (
        <Box sx={styles.root}>
            {/* Brand Logo Link */}
            <Link href="/" style={styles.logoContainer}>
                <Box 
                    sx={{ 
                        width: 48, 
                        height: 48, 
                        borderRadius: '14px', 
                        background: 'linear-gradient(135deg, #0071e3 0%, #00c6fb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 113, 227, 0.2)'
                    }}
                >
                    <TaskFlowIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Typography 
                    variant="h4" 
                    fontWeight="700" 
                    sx={{ 
                        color: '#1d1d1f', 
                        letterSpacing: '-0.5px' 
                    }}
                >
                    TaskFlow
                </Typography>
            </Link>

            {/* Form Container */}
            <Paper elevation={0} sx={styles.glassCard}>
                {children}
            </Paper>
        </Box>
    );
}