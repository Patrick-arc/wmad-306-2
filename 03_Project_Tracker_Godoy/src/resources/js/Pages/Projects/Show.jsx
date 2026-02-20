import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, Card, CardContent, Typography, Box, Grid, IconButton, Snackbar, Alert } from '@mui/material';
import { router } from '@inertiajs/react';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';
import { useThemeContext } from '@/Components/ThemeProvider';
import { useState } from 'react';

export default function Show({ project }) {
    const { theme } = useThemeContext();
    const [confirmDialog, setConfirmDialog] = useState({ open: false });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    function destroy() {
        setConfirmDialog({ open: true });
    }

    const confirmDelete = () => {
        router.delete(route('projects.destroy', project.id), {
            onSuccess: () => {
                setConfirmDialog({ open: false });
                setSnackbar({
                    open: true,
                    message: 'Project deleted successfully!',
                    severity: 'success'
                });
                // Redirect to projects index after successful deletion
                setTimeout(() => {
                    router.visit(route('projects.index'));
                }, 1500);
            },
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Error deleting project.',
                    severity: 'error'
                });
            }
        });
    };

    const cancelDelete = () => {
        setConfirmDialog({ open: false });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    {project.title}
                </Typography>
            }
        >
            <Head title={project.title} />

            <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                {/* Action Buttons */}
                <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                    <Button
                        onClick={() => router.visit(route('projects.index'))}
                        startIcon={<ArrowBack />}
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                        }}
                    >
                        Back to Projects
                    </Button>
                    <Button
                        onClick={() => router.visit(route('projects.edit', project.id))}
                        startIcon={<Edit />}
                        variant="contained"
                        sx={{
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            fontWeight: 'bold',
                            borderRadius: 2,
                            textTransform: 'none',
                            '&:hover': {
                                background: theme.palette.primary.dark,
                            }
                        }}
                    >
                        Edit Project
                    </Button>
                    <Button
                        onClick={destroy}
                        startIcon={<Delete />}
                        variant="outlined"
                        color="error"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                        }}
                    >
                        Delete Project
                    </Button>
                </Box>

                {/* Project Details */}
                <Card sx={{ borderRadius: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.text.primary }}>
                            {project.title}
                        </Typography>
                        
                        <Typography variant="body1" color={theme.palette.text.secondary} sx={{ mb: 4, lineHeight: 1.6 }}>
                            {project.description || 'No description provided'}
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    Project Information
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2" color={theme.palette.text.secondary}>
                                        Created: {new Date(project.created_at).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color={theme.palette.text.secondary}>
                                        Last Updated: {new Date(project.updated_at).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    Tasks Summary
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2" color={theme.palette.text.secondary}>
                                        Total Tasks: {project.tasks?.length || 0}
                                    </Typography>
                                    <Typography variant="body2" color={theme.palette.text.secondary}>
                                        Completed: {project.tasks?.filter(t => t.status === 'completed').length || 0}
                                    </Typography>
                                    <Typography variant="body2" color={theme.palette.text.secondary}>
                                        Pending: {project.tasks?.filter(t => t.status === 'pending').length || 0}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        
                        {project.tasks && project.tasks.length > 0 && (
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    Recent Tasks
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {project.tasks.slice(0, 5).map((task) => (
                                        <Box key={task.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                                                {task.title}
                                            </Typography>
                                            <Typography variant="body2" color={theme.palette.text.secondary}>
                                                Status: {task.status} | Priority: {task.priority}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                                {project.tasks.length > 5 && (
                                    <Button
                                        onClick={() => router.visit(route('tasks.index'))}
                                        sx={{ mt: 2 }}
                                    >
                                        View All Tasks
                                    </Button>
                                )}
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Container>

            {/* Confirmation Dialog */}
            {confirmDialog.open && (
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                }}>
                    <Card sx={{ p: 4, maxWidth: 400 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
                                Delete Project
                            </Typography>
                            <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mb: 3 }}>
                                Are you sure you want to delete this project? This action cannot be undone and will also delete all associated tasks.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={cancelDelete}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={confirmDelete}
                                    variant="contained"
                                    color="error"
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                    }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            )}

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </AuthenticatedLayout>
    );
}
