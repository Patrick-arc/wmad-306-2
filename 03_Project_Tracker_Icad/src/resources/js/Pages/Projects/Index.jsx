import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { 
    Button, Card, CardContent, Grid, TextField, 
    Typography, IconButton, Box, Container, Stack 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Index({ projects }) {
    // --- Logic Functions ---
    const [form, setForm] = useState({ title: '', description: '' });
    const [editing, setEditing] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post('/projects', form, {
            onSuccess: () => setForm({ title: '', description: '' })
        });
    };

    const startEdit = (project) => {
        setEditing(project.id);
        setForm({ title: project.title || '', description: project.description || '' });
    };

    const submitEdit = (id) => {
        Inertia.patch(`/projects/${id}`, form, {
            onSuccess: () => {
                setEditing(null);
                setForm({ title: '', description: '' });
            }
        });
    };

    const destroy = (id) => {
        if (!confirm('Delete this project?')) return;
        Inertia.delete(`/projects/${id}`);
    };

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Project Tracker</Typography>

                <Card sx={{ mb: 4, borderRadius: 3 }}>
                    <CardContent>
                        <form onSubmit={submit}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth label="Title" name="title" size="small" value={form.title} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <TextField fullWidth label="Description" name="description" size="small" value={form.description} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Button fullWidth type="submit" variant="contained" startIcon={<AddIcon />}>Add Project</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                <Grid container spacing={3}>
                    {projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <Card sx={{ borderRadius: 3, '&:hover': { boxShadow: 4 } }}>
                                <CardContent>
                                    {editing === project.id ? (
                                        <Stack spacing={2}>
                                            <TextField fullWidth size="small" name="title" value={form.title} onChange={handleChange} />
                                            <TextField fullWidth size="small" name="description" value={form.description} onChange={handleChange} />
                                            <Button variant="contained" onClick={() => submitEdit(project.id)}>Save</Button>
                                        </Stack>
                                    ) : (
                                        <>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>{project.title}</Typography>
                                            <Typography color="text.secondary" sx={{ mb: 2 }}>{project.description}</Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <IconButton color="primary" onClick={() => startEdit(project)}><EditIcon /></IconButton>
                                                    <IconButton color="error" onClick={() => destroy(project.id)}><DeleteIcon /></IconButton>
                                                </Box>
                                                <Button variant="outlined" href={`/projects/${project.id}`}>Open</Button>
                                            </Box>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}