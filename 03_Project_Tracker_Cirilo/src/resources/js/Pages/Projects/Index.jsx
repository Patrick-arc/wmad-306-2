import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    TextField,
    ThemeProvider,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import darkTheme from '@/theme';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ProjectsIndex({ projects }) {
    const { auth } = usePage().props;
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleDeleteClick = (project) => {
        setSelectedProject(project);
        setDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedProject) {
            router.delete(route('projects.destroy', selectedProject.id));
        }
        setDeleteDialog(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <AuthenticatedLayout
                header={
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Projects
                    </Typography>
                }
            >
                <Head title="Projects" />

                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                        }}
                    >
                        <Typography variant="h5" sx={{ color: '#b0bec5' }}>
                            {projects.length} projects
                        </Typography>
                        <Link href={route('projects.create')}>
                            <Button variant="contained" color="primary">
                                + New Project
                            </Button>
                        </Link>
                    </Box>

                    {projects && projects.length > 0 ? (
                        <Grid container spacing={3}>
                            {projects.map((project) => (
                                <Grid item xs={12} sm={6} md={4} key={project.id}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow:
                                                    '0 12px 20px rgba(100, 181, 246, 0.2)',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    mb: 1,
                                                    fontWeight: 600,
                                                    color: '#64b5f6',
                                                }}
                                            >
                                                {project.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#b0bec5',
                                                    mb: 2,
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {project.description}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: 1,
                                                    mt: 3,
                                                }}
                                            >
                                                <Link
                                                    href={route(
                                                        'projects.show',
                                                        project.id,
                                                    )}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        color="primary"
                                                        fullWidth
                                                    >
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link
                                                    href={route(
                                                        'projects.edit',
                                                        project.id,
                                                    )}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        title="Edit project"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            project,
                                                        )
                                                    }
                                                    title="Delete project"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Card sx={{ textAlign: 'center', py: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{ color: '#b0bec5', mb: 2 }}
                            >
                                No projects yet
                            </Typography>
                            <Link href={route('projects.create')}>
                                <Button variant="contained" color="primary">
                                    Create Your First Project
                                </Button>
                            </Link>
                        </Card>
                    )}

                    <Dialog
                        open={deleteDialog}
                        onClose={() => setDeleteDialog(false)}
                    >
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete "
                                {selectedProject?.title}"? This action cannot be
                                undone.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setDeleteDialog(false)}
                                color="inherit"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDeleteConfirm}
                                color="error"
                                variant="contained"
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </AuthenticatedLayout>
        </ThemeProvider>
    );
}
