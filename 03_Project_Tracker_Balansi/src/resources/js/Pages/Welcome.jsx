import { Head, Link } from '@inertiajs/react';
import { 
    Container, Box, Typography, Grid, Paper, Button, Stack, Fade, Chip
} from '@mui/material';
import { 
    CheckCircle as TaskIcon, 
    FolderCopy as ProjectIcon, 
    Security as SecurityIcon, 
    ArrowForward as ArrowIcon,
    AutoAwesome as SparkleIcon
} from '@mui/icons-material';

// --- Apple-Inspired Design System ---
const styles = {
    root: {
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 0%, #f0f2f5 0%, #eef2f3 100%)', 
        position: 'relative',
        overflowX: 'hidden',
    },
    // --- THE FIXED UNIFORM SIZE FOR TILES ---
    glassCard: {
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(24px)', 
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        
        // --- THE FIX: FORCED DIMENSIONS ---
        height: '340px',      
        width: '100%',
        maxWidth: '360px',    
        margin: '0 auto',     
        
        padding: '32px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',     
        textAlign: 'center',      
        overflow: 'hidden',
        
        '&:hover': {
            transform: 'translateY(-12px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }
    },
    heroButton: {
        borderRadius: '30px',
        textTransform: 'none',
        fontSize: '1.1rem',
        fontWeight: 600,
        px: 4,
        py: 1.5,
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    },
    iconBox: (color) => ({
        width: 64, 
        height: 64,
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
        color: '#fff',
        marginBottom: '24px', 
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)', 
        flexShrink: 0 
    })
};

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <Box sx={styles.root}>
            <Head title="Welcome" />

            {/* Navigation Bar */}
            <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                        <SparkleIcon sx={{ color: '#0071e3' }} />
                        <Typography variant="h6" fontWeight="700" color="#1d1d1f">
                            TaskFlow
                        </Typography>
                    </Box>

                    <Box>
                        {auth.user ? (
                            <Button 
                                component={Link} 
                                href={route('dashboard')}
                                variant="contained"
                                sx={{ ...styles.heroButton, backgroundColor: '#0071e3' }}
                            >
                                Go to Dashboard
                            </Button>
                        ) : (
                            <Stack direction="row" spacing={2}>
                                <Button 
                                    component={Link} 
                                    href={route('login')} 
                                    variant="text"
                                    sx={{ textTransform: 'none', color: '#1d1d1f', fontWeight: 600 }}
                                >
                                    Log in
                                </Button>
                                <Button 
                                    component={Link} 
                                    href={route('register')} 
                                    variant="contained"
                                    sx={{ ...styles.heroButton, backgroundColor: '#1d1d1f', color: '#fff' }}
                                >
                                    Register
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Box>
            </Container>

            {/* Hero Section */}
            <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10, mb: 12 }}>
                <Fade in={true} timeout={1000}>
                    <Box>
                        <Chip 
                            label="v1.0 Release" 
                            size="small" 
                            sx={{ mb: 3, backgroundColor: 'rgba(0, 113, 227, 0.1)', color: '#0071e3', fontWeight: 600 }} 
                        />
                        <Typography variant="h1" fontWeight="800" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, letterSpacing: '-0.03em', color: '#1d1d1f', lineHeight: 1.1 }}>
                            Organize your work.<br />
                            <Box component="span" sx={{ background: 'linear-gradient(90deg, #0071e3, #40a9ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Amplify your output.
                            </Box>
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ mt: 3, mb: 5, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
                            The simple, elegant way to manage projects and track tasks. 
                        </Typography>
                        
                        {!auth.user && (
                            <Button 
                                component={Link} 
                                href={route('register')} 
                                variant="contained"
                                endIcon={<ArrowIcon />}
                                sx={{ ...styles.heroButton, backgroundColor: '#0071e3', fontSize: '1.2rem' }}
                            >
                                Start for Free
                            </Button>
                        )}
                    </Box>
                </Fade>
            </Container>

            {/* Feature Grid */}
            <Container maxWidth="lg" sx={{ pb: 10 }}>
                <Grid container spacing={4} justifyContent="center">
                    
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.glassCard} elevation={0}>
                            <Box sx={styles.iconBox('#5856D6')}>
                                <ProjectIcon fontSize="large" />
                            </Box>
                            <Typography variant="h6" fontWeight="700" gutterBottom>
                                Project Spaces
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Create dedicated workspaces for every initiative. Keep your ideas organized.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.glassCard} elevation={0}>
                            <Box sx={styles.iconBox('#FF9500')}>
                                <TaskIcon fontSize="large" />
                            </Box>
                            <Typography variant="h6" fontWeight="700" gutterBottom>
                                Smart Tasks
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Track priorities with ease. Filter by status and assign urgency levels.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.glassCard} elevation={0}>
                            <Box sx={styles.iconBox('#34C759')}>
                                <SecurityIcon fontSize="large" />
                            </Box>
                            <Typography variant="h6" fontWeight="700" gutterBottom>
                                Secure by Default
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Your data is yours. Built with industry-standard authentication.
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>

            {/* Footer with Copyright */}
            <Box sx={{ py: 6, textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.06)', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                <Typography variant="body2" color="text.primary" fontWeight="600">
                    © {new Date().getFullYear()} Rhys Alecksie B. Balansi. All rights reserved.
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Powered by Laravel v{laravelVersion} & PHP v{phpVersion}
                </Typography>
            </Box>
        </Box>
    );
}