import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Button,
} from '@mui/material';
import {
    Assignment,
    TrendingUp,
} from '@mui/icons-material';
import { Link } from '@inertiajs/react';
import { useThemeContext } from '@/Components/ThemeProvider';

export default function Dashboard({ projectsCount, tasksCount, completedTasksCount, pendingTasksCount, upcomingDeadlines }) {
    const { theme } = useThemeContext();

    return (
        <AuthenticatedLayout header={
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                Dashboard
            </Typography>
        }>
            <Head title="Dashboard" />

            <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                {/* 
                    REMOVED: Large dark brown header section with:
                    - "Project Tracker" title
                    - Welcome message
                    - View Stats button
                    - Dark Mode button
                    
                    The entire AppBar component (lines 30-97) has been removed
                    to create a clean, professional layout.
                */}

                {/* 
                    Stats Cards Section - PRESERVED
                    Dynamic stats are still fetched from Inertia props:
                    - stats?.total_projects || projects?.length || 0
                    - stats?.total_tasks || tasks?.length || 0  
                    - stats?.completed_tasks || tasks?.filter(t => t.status === 'completed').length || 0
                    - stats?.pending_tasks || tasks?.filter(t => t.status === 'pending').length || 0
                */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: theme.palette.background.paper,
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                }
                            }}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                <Assignment sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    {projectsCount || 0}
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Total Projects
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: theme.palette.background.paper,
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                }
                            }}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                <TrendingUp sx={{ fontSize: 40, color: theme.palette.success.main, mb: 2 }} />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    {tasksCount || 0}
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Total Tasks
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: theme.palette.background.paper,
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                }
                            }}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                <TrendingUp sx={{ fontSize: 40, color: theme.palette.warning.main, mb: 2 }} />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    {completedTasksCount || 0}
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Completed Tasks
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: theme.palette.background.paper,
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                }
                            }}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                <TrendingUp sx={{ fontSize: 40, color: theme.palette.error.main, mb: 2 }} />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    {pendingTasksCount || 0}
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Pending Tasks
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Quick Actions Section - PRESERVED */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    Quick Actions
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href={route('projects.create')}
                                        startIcon={<Assignment />}
                                        sx={{
                                            background: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: theme.palette.primary.dark,
                                            }
                                        }}
                                    >
                                        New Project
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href={route('tasks.create')}
                                        startIcon={<Assignment />}
                                        sx={{
                                            background: theme.palette.success.main,
                                            color: 'white',
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: theme.palette.success.dark,
                                            }
                                        }}
                                    >
                                        New Task
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    Recent Activity
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Your most recent projects and tasks will appear here.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </AuthenticatedLayout>
    );
}
