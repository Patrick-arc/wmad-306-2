import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Box, 
    TextField,
    Grid,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { 
    ArrowBack as ArrowBackIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as PendingIcon
} from '@mui/icons-material';

/** @type {{ low: 'success', medium: 'warning', high: 'error' }} */
const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'error'
};

export default function Show({ auth, project }) {
    const [openDialog, setOpenDialog] = useState(false);
    const { data, setData, post, errors, processing, reset } = useForm({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending'
    });

    const handleOpenDialog = () => { reset(); setOpenDialog(true); };
    const handleCloseDialog = () => { reset(); setOpenDialog(false); };

    const handleSubmitTask = (e) => {
        e.preventDefault();
        post(route('projects.tasks.store', project.id), {
            onSuccess: handleCloseDialog
        });
    };

    const handleDeleteTask = (taskId) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('projects.tasks.destroy', { project: project.id, task: taskId }));
        }
    };

    const handleToggleStatus = (taskId) => {
        router.post(route('projects.tasks.toggle-status', { project: project.id, task: taskId }));
    };

    // glowing chip style for priorities
    const glowingChip = (color) => ({
        background: `linear-gradient(135deg, ${color} 0%, ${color} 100%)`,
        color: '#fff',
        fontWeight: 'bold',
        boxShadow: `0 0 10px ${color}`
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box display="flex" alignItems="center" gap={2}>
                    <Link href={route('projects.index')}>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                    <Typography variant="h5" component="h2" sx={{ color: '#FFFFFF' }}>
                        {project.title}
                    </Typography>
                </Box>
            }
        >
            <Head title={project.title} />

            <Box sx={{ p: 3, background: 'linear-gradient(135deg,#1e1b4b,#312e81,#6366F1)', minHeight: '100vh' }}>

                {/* Project Details Card */}
                <Card sx={{ mb: 3, borderRadius: 3, background: '#F3F4F6' }}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Box>
                                <Typography variant="h4" gutterBottom sx={{ color: '#4C1D95' }}>
                                    {project.title}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#6B7280', mb: 1 }}>
                                    {project.description || 'No description'}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                    Created: {new Date(project.created_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Link href={route('projects.edit', project.id)}>
                                    <Button 
                                        variant="outlined" 
                                        startIcon={<EditIcon />}
                                        sx={{ textTransform: 'none', borderColor: '#8B5CF6', color: '#8B5CF6', '&:hover': { background: 'rgba(139,92,246,0.1)' } }}
                                    >
                                        Edit Project
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Tasks Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        Tasks ({project.tasks?.length || 0})
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                        sx={{
                            textTransform: 'none',
                            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                            boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                            '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' }
                        }}
                    >
                        Add Task
                    </Button>
                </Box>

                {/* Task List */}
                {project.tasks && project.tasks.length > 0 ? (
                    <Grid container spacing={2}>
                        {project.tasks.map(task => (
                            <Grid item xs={12} key={task.id}>
                                <Card sx={{
                                    borderRadius: 3,
                                    background: '#F3F4F6',
                                    opacity: task.status === 'completed' ? 0.7 : 1,
                                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(139,92,246,0.2)' },
                                    transition: '0.3s'
                                }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <IconButton
                                                    onClick={() => handleToggleStatus(task.id)}
                                                    color={task.status === 'completed' ? 'success' : 'default'}
                                                >
                                                    {task.status === 'completed' ? <CheckCircleIcon /> : <PendingIcon />}
                                                </IconButton>

                                                <Box>
                                                    <Typography variant="h6" sx={{ color: '#4C1D95' }}>{task.title}</Typography>
                                                    {task.description && (
                                                        <Typography variant="body2" sx={{ color: '#6B7280' }}>{task.description}</Typography>
                                                    )}
                                                    <Box display="flex" gap={1} mt={1}>
                                                        <Chip label={task.priority || 'medium'} size="small" sx={glowingChip('#6366F1')} />
                                                        <Chip label={task.status || 'pending'} size="small" variant="outlined" />
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Link href={route('projects.tasks.edit', { project: project.id, task: task.id })}>
                                                    <IconButton size="small" sx={{ color: '#6366F1', '&:hover': { color: '#8B5CF6' } }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton size="small" color="error" onClick={() => handleDeleteTask(task.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Card sx={{ borderRadius: 3, background: '#F3F4F6', textAlign: 'center', py: 4 }}>
                        <CardContent>
                            <Typography sx={{ color: '#6B7280' }}>No tasks yet. Create your first task!</Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleOpenDialog}
                                sx={{
                                    mt: 2,
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                                    boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                                    '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' }
                                }}
                            >
                                Add Task
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Add Task Dialog */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <form onSubmit={handleSubmitTask}>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Task Title" value={data.title} onChange={e => setData('title', e.target.value)} error={!!errors.title} helperText={errors.title} required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Description" value={data.description} onChange={e => setData('description', e.target.value)} multiline rows={3} error={!!errors.description} helperText={errors.description} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Priority</InputLabel>
                                        <Select value={data.priority} onChange={e => setData('priority', e.target.value)} label="Priority">
                                            <MenuItem value="low">Low</MenuItem>
                                            <MenuItem value="medium">Medium</MenuItem>
                                            <MenuItem value="high">High</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select value={data.status} onChange={e => setData('status', e.target.value)} label="Status">
                                            <MenuItem value="pending">Pending</MenuItem>
                                            <MenuItem value="completed">Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button type="submit" variant="contained" disabled={processing} sx={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' } }}>Add Task</Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </Box>
        </AuthenticatedLayout>
    );
}
