import { Box, Paper, Container } from '@mui/material';
import { Link } from '@inertiajs/react';
import { Typography } from '@mui/material';

export default function Guest({ children }) {
    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#0f172a', // Matches your Welcome page
                backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(255, 45, 32, 0.1) 0%, transparent 50%)',
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Link href="/">
                    {/* You can place your logo here */}
                    <Typography variant="h4" fontWeight="bold" color="#FF2D20">
                        Project Tracker
                    </Typography>
                </Link>
            </Box>

            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    width: '100%', 
                    maxWidth: '400px', 
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                {children}
            </Paper>
        </Box>
    );
}