import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Container, Typography, Button, Grid, Card, CardContent,
    IconButton, Box, Chip, Checkbox, FormControl, InputLabel, Select, MenuItem, Grow
} from '@mui/material';
import {
    Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
    EventNote as TaskIcon
} from '@mui/icons-material';

const cardStyle = (status) => ({
    borderRadius: '24px',
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.3s ease',
    opacity: status === 'completed' ? 0.7 : 1,
    
    // --- THE FIX: STRICT UNIFORM SIZE ---
    width: '100%',
    maxWidth: '350px', // Stops the card from stretching horizontally
    height: '320px',    // Forces every card to be the same height
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',   // Centers the card within its grid space

    '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
    },
});

export default function Index({ auth, tasks, projects, filters }) {
    const [selectedProject, setSelectedProject] = useState(filters?.project_id || '');

    const handleFilterChange = (e) => {
        const projectId = e.target.value;
        setSelectedProject(projectId);
        router.get(route('tasks.index'), { project_id: projectId }, { preserveState: true });
    };

    const toggleStatus = (task) => {
        const newStatus = task.status === 'pending' ? 'completed' : 'pending';
        router.put(route('tasks.update', task.id), { status: newStatus }, { preserveScroll: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this task?')) {
            router.delete(route('tasks.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" fontWeight="700">Tasks</Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        href={route('tasks.create')}
                        startIcon={<AddIcon />}
                        sx={{
                            borderRadius: '30px', textTransform: 'none', backgroundColor: '#0071e3',
                            fontWeight: 600, px: 3
                        }}
                    >
                        New Task
                    </Button>
                </Box>
            }
        >
            <Head title="Tasks" />

            <Container maxWidth={false} sx={{ py: 6 }}>
                {/* Filter Bar */}
                <Box mb={6} display="flex" justifyContent="center">
                    <FormControl size="small" sx={{ minWidth: 300, backgroundColor: 'white', borderRadius: '12px' }}>
                        <InputLabel>Filter by Project</InputLabel>
                        <Select
                            value={selectedProject}
                            label="Filter by Project"
                            onChange={handleFilterChange}
                            sx={{ borderRadius: '12px' }}
                        >
                            <MenuItem value=""><em>All Projects</em></MenuItem>
                            {projects.map((p) => (
                                <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* The Grid - justifyContent="center" keeps the tiles centered */}
                <Grid container spacing={3} justifyContent="center">
                    {tasks.map((task, index) => (
                        <Grid item key={task.id}>
                            <Grow in={true} timeout={(index + 1) * 100}>
                                <Card sx={cardStyle(task.status)}>
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Box display="flex" justifyContent="space-between" mb={2}>
                                            <Chip
                                                label={task.priority}
                                                color={task.priority === 'high' ? 'error' : 'default'}
                                                size="small"
                                                sx={{ fontWeight: 800, borderRadius: '8px', fontSize: '0.7rem' }}
                                            />
                                            <Checkbox
                                                checked={task.status === 'completed'}
                                                onChange={() => toggleStatus(task)}
                                                color="success"
                                                sx={{ p: 0 }}
                                            />
                                        </Box>
                                        <Typography variant="h6" fontWeight="700" sx={{ mb: 1.5, lineHeight: 1.2 }}>
                                            {task.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ 
                                            display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
                                        }}>
                                            {task.description || 'No description provided.'}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ p: 3, borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="caption" fontWeight="700" color="primary">
                                            {task.project?.title || 'General'}
                                        </Typography>
                                        <Box>
                                            <IconButton component={Link} href={route('tasks.edit', task.id)} size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(task.id)} size="small" color="error">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grow>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </AuthenticatedLayout>
    );
}