import { Head, Link } from '@inertiajs/react';
import {
    Box,
    Container,
    Button,
    Typography,
    Stack,
    Card,
    CardContent,
    Grid,
    AppBar,
    Toolbar,
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    FolderOpen as FolderIcon,
    Speed as SpeedIcon,
} from '@mui/icons-material';

export default function Welcome({ auth }) {
    const features = [
        {
            icon: <FolderIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Project Management',
            description: 'Organize your work into projects and manage tasks efficiently.',
        },
        {
            icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />,
            title: 'Task Tracking',
            description: 'Track task status with priorities and completion tracking.',
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40, color: 'info.main' }} />,
            title: 'Fast & Reliable',
            description: 'Built with modern technologies for optimal performance.',
        },
    ];

    return (
        <>
            <Head title="Welcome" />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
                {/* AppBar */}
                <AppBar
                    position="static"
                    sx={{
                        bgcolor: 'white',
                        color: 'text.primary',
                        boxShadow: 'none',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                flexGrow: 1,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            📊 Task Tracker
                        </Typography>

                        {auth.user ? (
                            <Button
                                component={Link}
                                href={route('dashboard')}
                                variant="contained"
                                color="primary"
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <Stack direction="row" spacing={2}>
                                <Button
                                    component={Link}
                                    href={route('login')}
                                    variant="text"
                                    color="primary"
                                >
                                    Log In
                                </Button>
                                <Button
                                    component={Link}
                                    href={route('register')}
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign Up
                                </Button>
                            </Stack>
                        )}
                    </Toolbar>
                </AppBar>

                {/* Hero Section */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 8,
                    }}
                >
                    <Container maxWidth="md">
                        <Stack spacing={4} alignItems="center" textAlign="center">
                            {/* Hero Title */}
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Project Tracker System
                            </Typography>

                            {/* Hero Subtitle */}
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                sx={{
                                    fontSize: { xs: '1.1rem', sm: '1.3rem' },
                                    maxWidth: 600,
                                    lineHeight: 1.6,
                                }}
                            >
                                Organize your projects, track your tasks, and achieve your goals with our modern
                                project management system.
                            </Typography>

                            {/* CTA Buttons */}
                            {!auth.user && (
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                                    <Button
                                        component={Link}
                                        href={route('register')}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                                            '&:hover': {
                                                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.6)',
                                            },
                                        }}
                                    >
                                        Get Started Free
                                    </Button>
                                    <Button
                                        component={Link}
                                        href={route('login')}
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Stack>
                            )}
                        </Stack>

                        {/* Features Section */}
                        <Grid container spacing={3} sx={{ mt: 8 }}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            p: 3,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Footer */}
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        textAlign: 'center',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'white',
                    }}
                >
                    <Typography variant="body2" color="textSecondary">
                        © 2026 Task Tracker. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
