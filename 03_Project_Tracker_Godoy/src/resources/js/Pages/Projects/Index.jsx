import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Container,
    Typography,
    Grid,
    Button,
    Box,
    Paper,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link } from '@inertiajs/react';
import ProjectCard from '@/Components/ProjectCard';
import { useThemeContext } from '@/Components/ThemeProvider';

export default function Index({ projects }) {
    const { theme } = useThemeContext();

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    Projects
                </Typography>
            }
        >
            <Head title="Projects" />

            <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                {/* Header with Create Button */}
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
                            All Projects
                        </Typography>
                        <Typography variant="body2" color={theme.palette.text.secondary}>
                            Manage your projects and track their progress
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        component={Link}
                        href={route('projects.create')}
                        sx={{
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            padding: '10px 24px',
                            fontWeight: 'bold',
                            borderRadius: 2,
                            textTransform: 'none',
                            '&:hover': {
                                background: theme.palette.primary.dark,
                                transform: 'scale(1.02)',
                            }
                        }}
                    >
                        New Project
                    </Button>
                </Box>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <Grid container spacing={3}>
                        {projects.map((project) => (
                            <Grid item xs={12} sm={6} md={4} key={project.id}>
                                <ProjectCard project={project} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 3,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
                            No projects yet
                        </Typography>
                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mb: 3 }}>
                            Create your first project to get started with task management
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            component={Link}
                            href="/projects/create"
                            sx={{
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                padding: '10px 24px',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                textTransform: 'none',
                            }}
                        >
                            Create Your First Project
                        </Button>
                    </Paper>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
