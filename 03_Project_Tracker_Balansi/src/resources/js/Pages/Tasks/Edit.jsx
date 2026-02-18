import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    Container, TextField, Button, Box, Typography, Paper, MenuItem, IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default function Edit({ auth, task, projects }) {
    const { data, setData, put, processing, errors } = useForm({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        project_id: task.project_id,
        status: task.status
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tasks.update', task.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Task" />
            <Container maxWidth="sm" sx={{ py: 6 }}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>
                    <Box display="flex" alignItems="center" mb={4}>
                        <IconButton component={Link} href={route('tasks.index')} sx={{ mr: 1 }}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h5" fontWeight="700">Edit Task</Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            select fullWidth label="Project"
                            value={data.project_id}
                            onChange={(e) => setData('project_id', e.target.value)}
                            sx={{ mb: 3 }}
                        >
                            {projects.map((option) => (
                                <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth label="Title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={!!errors.title}
                            sx={{ mb: 3 }}
                        />

                        <Grid container spacing={2} mb={3}>
                            <Grid item xs={6}>
                                <TextField
                                    select fullWidth label="Priority"
                                    value={data.priority}
                                    onChange={(e) => setData('priority', e.target.value)}
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select fullWidth label="Status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <TextField
                            fullWidth multiline rows={3} label="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            sx={{ mb: 4 }}
                        />

                        <Button
                            type="submit" variant="contained" fullWidth disabled={processing}
                            sx={{
                                borderRadius: '12px', py: 1.5, backgroundColor: '#0071e3',
                                '&:hover': { backgroundColor: '#0077ed' }
                            }}
                        >
                            Update Task
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </AuthenticatedLayout>
    );
}