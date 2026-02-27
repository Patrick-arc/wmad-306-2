import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { 
    Button, Card, CardContent, Grid, TextField, Typography, 
    IconButton, Box, Container, Stack, Chip, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

export default function Show({ project, tasks = [] }) { // Default to empty array to fix 'map' error
    const [form, setForm] = useState({ title: '', description: '', priority: 3, status: 'to_do' });

    const getStatusColor = (status) => {
        const colors = { to_do: 'default', in_progress: 'warning', completed: 'success' };
        return colors[status] || 'default';
    };

    const submitTask = (e) => {
        e.preventDefault();
        Inertia.post(`/projects/${project.id}/tasks`, form, {
            onSuccess: () => setForm({ title: '', description: '', priority: 3, status: 'to_do' })
        });
    };

    return (
        <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Button startIcon={<ArrowBackIcon />} href="/projects" sx={{ mb: 3, fontWeight: 600 }}>
                    All Projects
                </Button>
                
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a2027', mb: 1 }}>{project.title}</Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>{project.description}</Typography>
                </Box>

                {/* Task Creation Form */}
                <Card sx={{ mb: 6, borderRadius: 4, boxShadow: '0 8px 24px rgba(149, 157, 165, 0.1)' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Quick Add Task</Typography>
                        <form onSubmit={submitTask}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth label="Task Name" size="small" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth label="Description" size="small" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <TextField select fullWidth label="Status" size="small" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                                        <MenuItem value="to_do">To Do</MenuItem>
                                        <MenuItem value="in_progress">In Progress</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Button fullWidth type="submit" variant="contained" startIcon={<AddIcon />} sx={{ height: '40px', borderRadius: 2 }}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                {/* Tasks List */}
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Project Tasks ({tasks?.length || 0})</Typography>
                <Grid container spacing={3}>
                    {tasks?.map((task) => (
                        <Grid item xs={12} key={task.id}>
                            <Card sx={{ borderRadius: 3, borderLeft: '6px solid', borderColor: task.status === 'completed' ? '#4caf50' : '#1976d2' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 0.5 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{task.title}</Typography>
                                            <Chip label={task.status.replace('_', ' ')} size="small" color={getStatusColor(task.status)} sx={{ fontWeight: 600, textTransform: 'capitalize' }} />
                                            <Chip label={`Priority ${task.priority}`} size="small" variant="outlined" />
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton color="primary" size="small"><EditIcon fontSize="small" /></IconButton>
                                        <IconButton color="error" size="small"><DeleteIcon fontSize="small" /></IconButton>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}