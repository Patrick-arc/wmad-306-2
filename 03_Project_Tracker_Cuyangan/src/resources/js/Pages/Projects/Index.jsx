import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    Box, 
    Chip,
    IconButton,
    Grid
} from '@mui/material';
import { 
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon
} from '@mui/icons-material';

export default function ProjectsIndex({ auth, projects }) {
    const handleDelete = (projectId) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(`/projects/${projectId}`);
        }
    };

    // glowing chip style
    const glowingChip = (color) => ({
        background: `linear-gradient(135deg, ${color} 0%, ${color} 100%)`,
        color: '#fff',
        fontWeight: 'bold',
        boxShadow: `0 0 10px ${color}`,
        animation: 'glow 2s ease-in-out infinite alternate',
        '@keyframes glow': {
            '0%': { boxShadow: `0 0 5px ${color}` },
            '100%': { boxShadow: `0 0 20px ${color}` }
        }
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="h1" sx={{ color: '#FFFFFF' }}>
                        Projects
                    </Typography>
                    <Link href={route('projects.create')}>
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />}
                            sx={{
                                textTransform: 'none',
                                background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                                boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                                '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' }
                            }}
                        >
                            Add Project
                        </Button>
                    </Link>
                </Box>
            }
        >
            <Head title="Projects" />

            {/* Full page background */}
            <Box sx={{
                minHeight: '100vh',
                p: 3,
                background: 'linear-gradient(135deg,#1e1b4b,#312e81,#6366F1)',
            }}>
                <Grid container spacing={3}>
                    {projects.map((project) => (
                        <Grid item xs={12} md={6} lg={4} key={project.id}>
                            <Card 
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    background: '#F3F4F6',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 10px 25px rgba(139,92,246,0.2)'
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#4C1D95' }}>
                                        {project.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ color: '#6B7280', mb: 2 }}
                                    >
                                        {project.description || 'No description'}
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                                        <Chip 
                                            label={`${project.tasks?.length || 0} tasks`}
                                            size="small"
                                            sx={glowingChip('#6366F1')}
                                        />
                                    </Box>
                                    <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                        Created: {new Date(project.created_at).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={route('projects.show', project.id)}>
                                        <IconButton 
                                            size="small" 
                                            sx={{
                                                color: '#6366F1',
                                                '&:hover': { color: '#8B5CF6' }
                                            }}
                                            title="View"
                                        >
                                            <ViewIcon />
                                        </IconButton>
                                    </Link>
                                    <Link href={route('projects.edit', project.id)}>
                                        <IconButton 
                                            size="small" 
                                            sx={{
                                                color: '#6366F1',
                                                '&:hover': { color: '#8B5CF6' }
                                            }}
                                            title="Edit"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton 
                                        size="small" 
                                        title="Delete"
                                        onClick={() => handleDelete(project.id)}
                                        sx={{
                                            color: '#EF4444',
                                            '&:hover': { color: '#DC2626' }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {projects.length === 0 && (
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        alignItems="center" 
                        justifyContent="center"
                        minHeight={200}
                    >
                        <Typography variant="h6" sx={{ color: '#E2E8F0' }} gutterBottom>
                            No projects found
                        </Typography>
                        <Link href={route('projects.create')}>
                            <Button 
                                variant="contained" 
                                startIcon={<AddIcon />}
                                sx={{
                                    mt: 2,
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                                    boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                                    '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' }
                                }}
                            >
                                Create your first project
                            </Button>
                        </Link>
                    </Box>
                )}
            </Box>
        </AuthenticatedLayout>
    );
}
