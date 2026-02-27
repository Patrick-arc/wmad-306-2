import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Container,
    Stack,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

// Dashboard Stats Component
function ProjectsDashboard({ projects = [] }) {
    const totalProjects = projects.length;

    return (
        <Stack direction="row" spacing={3} mb={4}>
            <Card
                sx={{
                    flex: 1,
                    borderRadius: 4,
                    boxShadow: '0 6px 20px rgba(67,97,238,0.15)',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                }}
            >
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">Total Projects</Typography>
                    <Typography variant="h3" fontWeight="bold">{totalProjects}</Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}

export default function Projects({ projects = [] }) {
    const { data, setData, post, put, delete: destroy, reset } = useForm({
        title: '',
        description: '',
    });

    const [editing, setEditing] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (project = null) => {
        if (project) {
            setEditing(project);
            setData(project);
        } else {
            setEditing(null);
            reset();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditing(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(`/projects/${editing.id}`, {
                data,
                onSuccess: handleClose,
            });
        } else {
            post('/projects', {
                data,
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(`/projects/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Projects" />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fb', py: 6 }}>
                <Container>
                    {/* Dashboard */}
                    <ProjectsDashboard projects={projects} />

                    {/* Header */}
                    <Stack direction="row" justifyContent="space-between" mb={4} alignItems="center">
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="#2c3e50"
                            sx={{ letterSpacing: 0.5 }}
                        >
                            Projects
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            sx={{
                                borderRadius: 3,
                                px: 3,
                                py: 1.2,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                background: 'linear-gradient(90deg, #4361ee 0%, #3a50c0 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #3a50c0 0%, #2c3e50 100%)',
                                },
                            }}
                            onClick={() => handleOpen()}
                        >
                            Add Project
                        </Button>
                    </Stack>

                    {/* Projects Grid */}
                    <Grid container spacing={3}>
                        {projects.length === 0 && (
                            <Typography color="text.secondary" sx={{ mt: 2 }}>
                                No projects yet. Click "Add Project" to get started!
                            </Typography>
                        )}
                        {projects.map(project => (
                            <Grid item xs={12} md={4} key={project.id}>
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        boxShadow: '0 6px 20px rgba(67,97,238,0.15)',
                                        background: 'linear-gradient(135deg, #ffffff 0%, #f9faff 100%)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 24px rgba(67,97,238,0.25)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                color="#2c3e50"
                                                sx={{ letterSpacing: 0.5 }}
                                            >
                                                {project.title}
                                            </Typography>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton sx={{ color: '#4361ee' }} onClick={() => handleOpen(project)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton sx={{ color: '#ff4d4d' }} onClick={() => handleDelete(project.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </Stack>
                                        </Stack>

                                        <Typography variant="body2" color="#555" sx={{ mt: 1 }}>
                                            {project.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Add/Edit Project Dialog */}
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                        <DialogTitle
                            sx={{
                                fontWeight: 'bold',
                                color: '#2c3e50',
                                borderBottom: '1px solid #eee',
                                backgroundColor: '#f9faff',
                            }}
                        >
                            {editing ? 'Edit Project' : 'Add Project'}
                        </DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ style: { color: '#555' } }}
                                    inputProps={{ style: { color: '#2c3e50' } }}
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    multiline
                                    rows={4}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ style: { color: '#555' } }}
                                    inputProps={{ style: { color: '#2c3e50' } }}
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button sx={{ color: '#4361ee', fontWeight: 'bold' }} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 2,
                                    px: 3,
                                    background: 'linear-gradient(90deg, #4361ee 0%, #3a50c0 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #3a50c0 0%, #2c3e50 100%)',
                                    },
                                }}
                                onClick={submit}
                            >
                                {editing ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}
