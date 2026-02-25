import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Container, Typography, Button, Grid, Card as MuiCard, CardContent, CardActions,
    IconButton, Box, Dialog, DialogTitle, DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, FolderSpecial as ProjectIcon } from '@mui/icons-material';

const Card = styled(MuiCard)(({ theme }) => ({
    borderRadius: '16px',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    transition: 'all 0.3s ease',
    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(255, 49, 49, 0.2)' },
}));

export default function Index({ auth, projects }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleDelete = () => {
        router.delete(route('projects.destroy', selectedProjectId), {
            onSuccess: () => setDeleteDialogOpen(false),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Projects" />
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" fontWeight="900" sx={{ color: '#FF3131' }}>My Projects</Typography>
                    <Button
                        variant="contained" component={Link} href={route('projects.create')}
                        startIcon={<AddIcon />}
                        sx={{ borderRadius: '12px', backgroundColor: '#FF3131', '&:hover': { backgroundColor: '#D62828' } }}
                    >
                        New Project
                    </Button>
                </Box>
                <Grid container spacing={3}>
                    {projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <Card variant="outlined">
                                <CardContent sx={{ p: 3 }}>
                                    <ProjectIcon sx={{ color: '#FF3131', mb: 1 }} />
                                    <Typography variant="h6" fontWeight="bold">{project.title}</Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1, minHeight: '50px' }}>
                                        {project.description || "Manage your project tasks here."}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
                                    <Typography variant="caption" sx={{ color: '#FF3131', fontWeight: 'bold' }}>
                                        {project.tasks?.length || 0} Tasks
                                    </Typography>
                                    <Box>
                                        <IconButton component={Link} href={route('projects.edit', project.id)} sx={{ color: '#fff' }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={() => { setSelectedProjectId(project.id); setDeleteDialogOpen(true); }} color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} PaperProps={{ sx: { backgroundColor: '#0f172a', color: '#fff' } }}>
                <DialogTitle>Delete Project?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: '#fff' }}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
}