import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Box, 
    Chip,
    IconButton,
    Grid,
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
    RadioButtonUnchecked as PendingIcon,
    Folder as FolderIcon
} from '@mui/icons-material';

const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'error'
};

// Custom glowing chip styles
const glowingChip = (color) => ({
    background: `linear-gradient(135deg, ${color} 0%, ${color} 100%)`,
    color: '#fff',
    fontWeight: 'bold',
    boxShadow: `0 0 10px ${color}`,
    animation: 'glow 2s ease-in-out infinite alternate',
    '@keyframes glow': {
        '0%': { boxShadow: `0 0 5px ${color}` },
        '100%': { boxShadow: `0 0 20px ${color}` }
    }
});

export default function TasksIndex({ auth, project, tasks, showAll = false, projects = [] }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');

    const handleDeleteTask = (taskId) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('projects.tasks.destroy', {
                project: project?.id,
                task: taskId
            }));
        }
    };

    const handleToggleStatus = (taskId) => {
        router.post(route('projects.tasks.toggle-status', {
            project: project?.id,
            task: taskId
        }));
    };

    const handleOpenDialog = () => {
        setSelectedProject(projects.length > 0 ? projects[0].id : '');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProject('');
    };

    const handleCreateTask = () => {
        if (selectedProject) {
            router.visit(route('projects.tasks.create', selectedProject));
        }
    };

    // Helper for priority glow color
    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'low': return '#22C55E'; // green
            case 'medium': return '#FACC15'; // yellow
            case 'high': return '#EF4444'; // red
            default: return '#9CA3AF'; // gray
        }
    };

    // Helper for status glow color
    const getStatusColor = (status) => {
        return status === 'completed' ? '#22C55E' : '#6366F1';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box display="flex" alignItems="center" gap={2}>
                    {showAll ? (
                        <Typography variant="h5" sx={{ color: '#FFFFFF' }}>
                            All Tasks
                        </Typography>
                    ) : (
                        <>
                            <Link href={route('projects.show', project.id)}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{ 
                                        textTransform: 'none', 
                                        color: '#8B5CF6',
                                        borderColor: '#8B5CF6',
                                        '&:hover': { borderColor: '#6366F1', color: '#FFFFFF' }
                                    }}
                                >
                                    <ArrowBackIcon />
                                </Button>
                            </Link>
                            <Typography variant="h5" sx={{ color: '#FFFFFF' }}>
                                Tasks - {project.title}
                            </Typography>
                        </>
                    )}
                </Box>
            }
        >
            <Head title={showAll ? 'All Tasks' : `Tasks - ${project?.title}`} />

            {/* Full page background */}
            <Box sx={{
                minHeight: '100vh',
                p: 3,
                background: 'linear-gradient(135deg,#1e1b4b,#312e81,#6366F1)',
            }}>

                {/* Header Section */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Typography variant="h6" sx={{ color: '#E2E8F0' }}>
                        All Tasks ({tasks.length})
                    </Typography>

                    {showAll ? (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenDialog}
                            disabled={projects.length === 0}
                            sx={{
                                textTransform: 'none',
                                background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                                boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                                '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' }
                            }}
                        >
                            Add Task
                        </Button>
                    ) : (
                        <Link href={route('projects.tasks.create', project.id)}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                                    boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                                    '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' }
                                }}
                            >
                                Add Task
                            </Button>
                        </Link>
                    )}
                </Box>

                {/* Task List */}
                {tasks.length > 0 ? (
                    <Grid container spacing={2}>
                        {tasks.map((task) => (
                            <Grid item xs={12} key={task.id}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        background: '#F3F4F6', // light card
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(139,92,246,0.2)'
                                        },
                                        opacity: task.status === 'completed' ? 0.7 : 1,
                                        textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >

                                            {/* Left Section */}
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <IconButton
                                                    onClick={() => handleToggleStatus(task.id)}
                                                    sx={{
                                                        color: getStatusColor(task.status),
                                                        '&:hover': { backgroundColor: 'rgba(139,92,246,0.1)' }
                                                    }}
                                                >
                                                    {task.status === 'completed'
                                                        ? <CheckCircleIcon />
                                                        : <PendingIcon />}
                                                </IconButton>

                                                <Box>
                                                    <Typography variant="h6" sx={{ color: '#4C1D95' }}>
                                                        {task.title}
                                                    </Typography>

                                                    {task.description && (
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ color: '#6B7280' }}
                                                        >
                                                            {task.description}
                                                        </Typography>
                                                    )}

                                                    {/* Show project name when in showAll mode */}
                                                    {showAll && task.project && (
                                                        <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                                                            <FolderIcon sx={{ fontSize: 16, color: '#8B5CF6' }} />
                                                            <Typography variant="caption" sx={{ color: '#8B5CF6', fontWeight: 'bold' }}>
                                                                {task.project.title}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    <Box display="flex" gap={1} mt={1}>
                                                        <Chip
                                                            label={task.priority || 'medium'}
                                                            size="small"
                                                            sx={glowingChip(getPriorityColor(task.priority))}
                                                        />

                                                        <Chip
                                                            label={task.status || 'pending'}
                                                            size="small"
                                                            sx={glowingChip(getStatusColor(task.status))}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>

                                            {/* Right Section */}
                                            <Box>
                                                <Link
                                                    href={route('projects.tasks.edit', {
                                                        project: showAll ? task.project.id : project.id,
                                                        task: task.id
                                                    })}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: '#6366F1',
                                                            '&:hover': { color: '#8B5CF6' }
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>

                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    sx={{
                                                        color: '#EF4444',
                                                        '&:hover': { color: '#DC2626' }
                                                    }}
                                                >
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
                    <Card sx={{ background: '#F3F4F6', textAlign: 'center', py: 4 }}>
                        <CardContent>
                            <Typography variant="body1" sx={{ color: '#6B7280' }}>
                                No tasks yet. {showAll ? 'Create a project and add some tasks!' : 'Create your first task!'}
                            </Typography>
                        </CardContent>
                    </Card>
                )}

            </Box>

            {/* Project Selection Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ color: '#4C1D95' }}>
                    Select Project for New Task
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel>Project</InputLabel>
                        <Select
                            value={selectedProject}
                            label="Project"
                            onChange={(e) => setSelectedProject(e.target.value)}
                        >
                            {projects.map((proj) => (
                                <MenuItem key={proj.id} value={proj.id}>
                                    {proj.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: '#6B7280' }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleCreateTask} 
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                            '&:hover': { background: 'linear-gradient(135deg,#8B5CF6,#A78BFA)' }
                        }}
                    >
                        Create Task
                    </Button>
                </DialogActions>
            </Dialog>

        </AuthenticatedLayout>
    );
}
