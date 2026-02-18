import React from 'react' 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Box, 
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip
} from '@mui/material';
import { 
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon
} from '@mui/icons-material';

const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'error'
};

export default function Edit({ auth, project, task }) {
    const { data, setData, put, errors, processing } = useForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'pending'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('projects.tasks.update', { project: project.id, task: task.id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box display="flex" alignItems="center" gap={2}>
                    <Link href={route('projects.tasks.index', project.id)}>
                        <Button 
                            variant="outlined" 
                            size="small"
                            sx={{ textTransform: 'none', color: '#8B5CF6', borderColor: '#8B5CF6' }}
                        >
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                    <Typography variant="h5" component="h2" sx={{ color: '#0c0c0c' }}>
                        Edit Task - {project.title}
                    </Typography>
                </Box>
            }
        >
            <Head title={`Edit Task - ${project.title}`} />

            {/* Full page background */}
            <Box sx={{
                minHeight: '100vh',
                p: 3,
                background: 'linear-gradient(135deg,#1e1b4b,#312e81,#6366F1)',
            }}>
                <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
                    {/* LIGHT CARD */}
                    <Card sx={{
                        borderRadius: 4,
                        background: '#F3F4F6', // light card color
                        p: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}>
                        {/* Gradient header */}
                        <Box sx={{
                            p: 2,
                            borderRadius: '8px 8px 0 0',
                            mb: 2,
                            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                            color: '#FFFFFF',
                            fontWeight: 'bold', 
                            textAlign: 'center'
                        }}>
                            Task Details
                        </Box>

                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    {/* Task Title */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Task Title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            error={!!errors.title}
                                            helperText={errors.title}
                                            required
                                            variant="outlined"
                                            sx={{
                                                input: { color: '#1F2937' },
                                                label: { color: '#4C1D95' },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: 'rgba(0,0,0,0.2)' },
                                                    '&:hover fieldset': { borderColor: '#8B5CF6' },
                                                    '&.Mui-focused fieldset': { borderColor: '#8B5CF6' }
                                                }
                                            }}
                                        />
                                    </Grid>

                                    {/* Description */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            error={!!errors.description}
                                            helperText={errors.description}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            sx={{
                                                input: { color: '#1F2937' },
                                                label: { color: '#4C1D95' },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: 'rgba(0,0,0,0.2)' },
                                                    '&:hover fieldset': { borderColor: '#8B5CF6' },
                                                    '&.Mui-focused fieldset': { borderColor: '#8B5CF6' }
                                                }
                                            }}
                                        />
                                    </Grid>

                                    {/* Priority */}
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel sx={{ color: '#4C1D95' }}>Priority</InputLabel>
                                            <Select
                                                value={data.priority}
                                                onChange={(e) => setData('priority', e.target.value)}
                                                label="Priority"
                                                sx={{
                                                    color: '#1F2937',
                                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.2)' },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#8B5CF6' },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#8B5CF6' }
                                                }}
                                            >
                                                <MenuItem value="low">
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <Chip label="Low" size="small" color="success" />
                                                        Low
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="medium">
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <Chip label="Medium" size="small" color="warning" />
                                                        Medium
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="high">
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <Chip label="High" size="small" color="error" />
                                                        High
                                                    </Box>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Status */}
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel sx={{ color: '#4C1D95' }}>Status</InputLabel>
                                            <Select
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                label="Status"
                                                sx={{
                                                    color: '#1F2937',
                                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.2)' },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#8B5CF6' },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#8B5CF6' }
                                                }}
                                            >
                                                <MenuItem value="pending">Pending</MenuItem>
                                                <MenuItem value="in_progress">In Progress</MenuItem>
                                                <MenuItem value="completed">Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Buttons */}
                                    <Grid item xs={12}>
                                        <Box display="flex" gap={2} justifyContent="flex-end">
                                            <Link href={route('projects.tasks.index', project.id)}>
                                                <Button 
                                                    variant="outlined"
                                                    sx={{
                                                        textTransform: 'none',
                                                        color: '#8B5CF6',
                                                        borderColor: '#8B5CF6',
                                                        '&:hover': { borderColor: '#6366F1', color: '#FFFFFF' }
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Link>
                                            <Button 
                                                type="submit"
                                                variant="contained"
                                                startIcon={<SaveIcon />}
                                                disabled={processing}
                                                sx={{
                                                    textTransform: 'none',
                                                    background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                                                    boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                                                    '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' }
                                                }}
                                            >
                                                Update Task
                                            </Button>
                                        </Box>
                                    </Grid>

                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
