import { Head, Link } from '@inertiajs/react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Grid,
    Avatar,
    Card,
    CardContent,
    useTheme,
} from '@mui/material';
import {
    Assignment,
    CheckCircle,
    TrendingUp,
    Speed,
    Security,
    Groups,
} from '@mui/icons-material';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const theme = useTheme();

    return (
        <>
            <Head title="Project Tracker - Professional Project Management" />
            
            {/* Hero Section with Professional Gradient Background - Properly Centered */}
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Navigation - Centered and Responsive */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        zIndex: 10,
                    }}
                >
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    <Assignment />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: theme.palette.mode === 'light' ? '#1A237E' : '#E3F2FD',
                                    }}
                                >
                                    Project Tracker
                                </Typography>
                            </Box>
                            
                            {auth.user ? (
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href={route('dashboard')}
                                    sx={{
                                        background: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        '&:hover': {
                                            background: theme.palette.primary.dark,
                                        }
                                    }}
                                >
                                    Dashboard
                                </Button>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        href={route('login')}
                                        sx={{
                                            borderColor: theme.palette.mode === 'light' ? '#1A237E' : '#E3F2FD',
                                            color: theme.palette.mode === 'light' ? '#1A237E' : '#E3F2FD',
                                            '&:hover': {
                                                borderColor: theme.palette.mode === 'light' ? '#1565C0' : '#BBDEFB',
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            }
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href={route('register')}
                                        sx={{
                                            background: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            '&:hover': {
                                                background: theme.palette.primary.dark,
                                            }
                                        }}
                                    >
                                        Register
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Container>
                </Box>

                {/* Hero Content - Properly Centered and Responsive */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={8} lg={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h1"
                                    component="h1"
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
                                        color: theme.palette.mode === 'light' ? '#1A237E' : '#FFFFFF',
                                        mb: 2,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Project Tracker
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 300,
                                        color: theme.palette.mode === 'light' ? '#424242' : '#BBDEFB',
                                        mb: 4,
                                        lineHeight: 1.4,
                                        fontSize: { xs: '1.2rem', md: '1.3rem' },
                                    }}
                                >
                                    Professional Project Management Made Simple
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.mode === 'light' ? '#616161' : '#E3F2FD',
                                        mb: 4,
                                        fontSize: '1.1rem',
                                        lineHeight: 1.6,
                                        maxWidth: '600px',
                                        mx: 'auto',
                                    }}
                                >
                                    Streamline your workflow with our intuitive project management system. 
                                    Track projects, manage tasks, monitor progress, and collaborate 
                                    effectively with your team - all in one powerful platform.
                                </Typography>
                                
                                {!auth.user && (
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            component={Link}
                                            href={route('register')}
                                            sx={{
                                                background: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                px: 4,
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    background: theme.palette.primary.dark,
                                                    transform: 'translateY(-2px)',
                                                }
                                            }}
                                        >
                                            Get Started Free
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            component={Link}
                                            href={route('login')}
                                            sx={{
                                                borderColor: theme.palette.mode === 'light' ? '#1A237E' : '#E3F2FD',
                                                color: theme.palette.mode === 'light' ? '#1A237E' : '#E3F2FD',
                                                px: 4,
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    borderColor: theme.palette.mode === 'light' ? '#1565C0' : '#BBDEFB',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                }
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={8} lg={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Paper
                                    elevation={10}
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        background: theme.palette.mode === 'light' 
                                            ? 'rgba(255, 255, 255, 0.9)' 
                                            : 'rgba(26, 35, 126, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        maxWidth: 400,
                                        width: '100%',
                                    }}
                                >
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                                        Key Features
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                                <Assignment />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Project Management
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Create and organize projects efficiently
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                                                <CheckCircle />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Task Tracking
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Monitor task progress and completion
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                                                <TrendingUp />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Progress Analytics
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Real-time insights and statistics
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                                                <Groups />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Team Collaboration
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Work together seamlessly
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                {/* Background Pattern */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 8, backgroundColor: theme.palette.mode === 'light' ? '#F5F5F5' : '#0D47A1' }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
                        Why Choose Project Tracker?
                    </Typography>
                    
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        width: 60,
                                        height: 60,
                                        mx: 'auto',
                                        mb: 2,
                                    }}
                                >
                                    <Speed sx={{ fontSize: 30 }} />
                                </Avatar>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Fast & Efficient
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Built with performance in mind. Experience lightning-fast project management 
                                    with our optimized interface and responsive design.
                                </Typography>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.success.main,
                                        width: 60,
                                        height: 60,
                                        mx: 'auto',
                                        mb: 2,
                                    }}
                                >
                                    <Security sx={{ fontSize: 30 }} />
                                </Avatar>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Secure & Reliable
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Your data is protected with enterprise-grade security. 
                                    Regular backups and secure authentication keep your projects safe.
                                </Typography>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.secondary.main,
                                        width: 60,
                                        height: 60,
                                        mx: 'auto',
                                        mb: 2,
                                    }}
                                >
                                    <Groups sx={{ fontSize: 30 }} />
                                </Avatar>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Team Collaboration
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Work together seamlessly with your team. Share projects, 
                                    assign tasks, and track progress in real-time.
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    py: 4,
                    backgroundColor: theme.palette.mode === 'light' ? '#1A237E' : '#000051',
                    color: theme.palette.mode === 'light' ? '#FFFFFF' : '#BBDEFB',
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            © 2024 Project Tracker. Professional project management solution.
                        </Typography>
                        <Typography variant="caption">
                            Built with Laravel v{laravelVersion} & PHP v{phpVersion}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
