import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import {
    Box,
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Typography,
    IconButton,
    Alert,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Stack,
    Fab,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Add as AddIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';

const statusColors = {
    pending: 'default',
    in_progress: 'warning',
    completed: 'success',
};

const priorityColors = {
    low: 'success',      // green
    medium: 'warning',   // orange
    high: 'error',       // red
};

export default function Projects() {
    const { projects } = usePage().props;
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [taskDialogOpen, setTaskDialogOpen] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [projectFormData, setProjectFormData] = useState({ title: '', description: '' });
    const [taskFormData, setTaskFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
    });
    const [errors, setErrors] = useState({});

    const handleOpenProjectDialog = (project = null) => {
        if (project) {
            setEditingProjectId(project.id);
            setProjectFormData({ title: project.title, description: project.description || '' });
        } else {
            setEditingProjectId(null);
            setProjectFormData({ title: '', description: '' });
        }
        setErrors({});
        setProjectDialogOpen(true);
    };

    const handleCloseProjectDialog = () => {
        setProjectDialogOpen(false);
        setEditingProjectId(null);
        setProjectFormData({ title: '', description: '' });
        setErrors({});
    };

    const handleOpenTaskDialog = (projectId, task = null) => {
        setSelectedProjectId(projectId);
        if (task) {
            setEditingTaskId(task.id);
            setTaskFormData({
                title: task.title,
                description: task.description || '',
                priority: task.priority,
                status: task.status,
            });
        } else {
            setEditingTaskId(null);
            setTaskFormData({
                title: '',
                description: '',
                priority: 'medium',
                status: 'pending',
            });
        }
        setErrors({});
        setTaskDialogOpen(true);
    };

    const handleCloseTaskDialog = () => {
        setTaskDialogOpen(false);
        setEditingTaskId(null);
        setSelectedProjectId(null);
        setTaskFormData({
            title: '',
            description: '',
            priority: 'medium',
            status: 'pending',
        });
        setErrors({});
    };

    const handleSubmitProject = () => {
        if (!projectFormData.title.trim()) {
            setErrors({ title: 'Title is required' });
            return;
        }

        if (editingProjectId) {
            router.patch(`/projects/${editingProjectId}`, projectFormData, {
                onError: (errors) => setErrors(errors),
                onSuccess: handleCloseProjectDialog,
            });
        } else {
            router.post('/projects', projectFormData, {
                onError: (errors) => setErrors(errors),
                onSuccess: handleCloseProjectDialog,
            });
        }
    };

    const handleSubmitTask = () => {
        if (!taskFormData.title.trim()) {
            setErrors({ title: 'Title is required' });
            return;
        }

        const data = { ...taskFormData };

        if (editingTaskId) {
            router.patch(`/projects/${selectedProjectId}/tasks/${editingTaskId}`, data, {
                onError: (errors) => setErrors(errors),
                onSuccess: handleCloseTaskDialog,
            });
        } else {
            router.post(`/projects/${selectedProjectId}/tasks`, data, {
                onError: (errors) => setErrors(errors),
                onSuccess: handleCloseTaskDialog,
            });
        }
    };

    const handleDeleteProject = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(`/projects/${id}`);
        }
    };

    const handleDeleteTask = (projectId, taskId) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/projects/${projectId}/tasks/${taskId}`);
        }
    };

    const handleToggleStatus = (task) => {
        const nextStatus = task.status === 'pending' ? 'in_progress' : task.status === 'in_progress' ? 'completed' : 'pending';
        router.patch(`/projects/${task.project_id}/tasks/${task.id}`, {
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: nextStatus,
        });
    };

    const projectsWithTasks = !projects || !projects.data 
        ? [] 
        : projects.data.filter(p => p.tasks && p.tasks.length > 0);

    return (
        <Box sx={{ pb: 4 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Projects
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {projectsWithTasks.length} project{projectsWithTasks.length !== 1 ? 's' : ''} with tasks
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenProjectDialog()}
                    size="medium"
                    sx={{
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                        '&:hover': {
                            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                        },
                    }}
                >
                    New Project
                </Button>
            </Box>

            {projectsWithTasks.length === 0 ? (
                <Card
                    sx={{
                        textAlign: 'center',
                        py: 6,
                        bgcolor: '#f9f9f9',
                        border: '2px dashed #e0e0e0',
                    }}
                >
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                        No projects yet 📭
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Create your first project to get started managing tasks!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenProjectDialog()}
                    >
                        Create Project
                    </Button>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {projectsWithTasks.map((project) => (
                        <Grid item xs={12} key={project.id}>
                            <Card
                                sx={{
                                    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'visible',
                                    borderRadius: 2,
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                {/* Project Header Card */}
                                <Card
                                    sx={{
                                        m: 2,
                                        bgcolor: 'white',
                                        color: 'text.primary',
                                        boxShadow: 'none',
                                        border: '1px solid #e0e0e0',
                                    }}
                                >
                                    <CardContent sx={{ pb: 1.5 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                mb: 2,
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 700,
                                                        mb: 0.5,
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                    }}
                                                >
                                                    {project.title}
                                                </Typography>
                                                {project.description && (
                                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                        {project.description}
                                                    </Typography>
                                                )}
                                                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                                    <Chip
                                                        label={`${project.tasks.length} task${project.tasks.length !== 1 ? 's' : ''}`}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: '#667eea',
                                                            color: '#667eea',
                                                        }}
                                                    />
                                                    <Chip
                                                        label={`${project.tasks.filter(t => t.status === 'completed').length} completed`}
                                                        size="small"
                                                        color="success"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            </Box>
                                            <Stack direction="row" spacing={0.5}>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleOpenProjectDialog(project)}
                                                    sx={{
                                                        '&:hover': {
                                                            bgcolor: 'primary.light',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    sx={{
                                                        '&:hover': {
                                                            bgcolor: 'error.light',
                                                        },
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </Box>

                                        {/* Tasks Section */}
                                        <Box sx={{ mt: 3 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    mb: 2,
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    Tasks
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<AddIcon />}
                                                    onClick={() => handleOpenTaskDialog(project.id)}
                                                    sx={{
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    Add Task
                                                </Button>
                                            </Box>

                                            {!project.tasks || project.tasks.length === 0 ? (
                                                <Typography variant="caption" color="textSecondary">
                                                    No tasks yet
                                                </Typography>
                                            ) : (
                                                <Paper sx={{ overflowX: 'auto', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                                                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                                                <TableCell align="right" sx={{ fontWeight: 600 }}>
                                                                    Actions
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {project.tasks.map((task) => (
                                                                <TableRow
                                                                    key={task.id}
                                                                    hover
                                                                    sx={{
                                                                        opacity: task.status === 'completed' ? 0.65 : 1,
                                                                        transition: 'all 0.2s ease',
                                                                        '&:hover': {
                                                                            bgcolor: 'action.hover',
                                                                        },
                                                                    }}
                                                                >
                                                                    <TableCell
                                                                        sx={{
                                                                            textDecoration:
                                                                                task.status === 'completed'
                                                                                    ? 'line-through'
                                                                                    : 'none',
                                                                        }}
                                                                    >
                                                                        {task.title}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Chip
                                                                            label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                                            color={priorityColors[task.priority]}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            sx={{
                                                                                fontWeight: 500,
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Box
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: 1,
                                                                            }}
                                                                        >
                                                                            <Chip
                                                                                label={task.status === 'in_progress'
                                                                                    ? 'In Progress'
                                                                                    : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                                                                color={statusColors[task.status]}
                                                                                size="small"
                                                                                sx={{
                                                                                    fontWeight: 500,
                                                                                }}
                                                                            />
                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() => handleToggleStatus(task)}
                                                                                title="Toggle status"
                                                                                sx={{
                                                                                    p: 0.25,
                                                                                    '&:hover': {
                                                                                        bgcolor: 'action.hover',
                                                                                    },
                                                                                }}
                                                                            >
                                                                                {task.status === 'completed' ? (
                                                                                    <CheckCircleIcon
                                                                                        fontSize="small"
                                                                                        sx={{
                                                                                            color: 'success.main',
                                                                                        }}
                                                                                    />
                                                                                ) : (
                                                                                    <RadioButtonUncheckedIcon
                                                                                        fontSize="small"
                                                                                        sx={{
                                                                                            color: 'text.secondary',
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </IconButton>
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <IconButton
                                                                            size="small"
                                                                            color="primary"
                                                                            onClick={() => handleOpenTaskDialog(project.id, task)}
                                                                            sx={{
                                                                                '&:hover': {
                                                                                    bgcolor: 'primary.light',
                                                                                },
                                                                            }}
                                                                        >
                                                                            <EditIcon fontSize="small" />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={() => handleDeleteTask(project.id, task.id)}
                                                                            sx={{
                                                                                '&:hover': {
                                                                                    bgcolor: 'error.light',
                                                                                },
                                                                            }}
                                                                        >
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Paper>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Project Dialog */}
            <Dialog open={projectDialogOpen} onClose={handleCloseProjectDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                    {editingProjectId ? '✏️ Edit Project' : '➕ Create New Project'}
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    {errors.message && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.message}
                        </Alert>
                    )}
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="Project Title"
                            value={projectFormData.title}
                            onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                            error={!!errors.title}
                            helperText={errors.title}
                            variant="outlined"
                            autoFocus
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={projectFormData.description}
                            onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                            error={!!errors.description}
                            helperText={errors.description}
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseProjectDialog} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitProject} variant="contained" color="primary">
                        {editingProjectId ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Task Dialog */}
            <Dialog open={taskDialogOpen} onClose={handleCloseTaskDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                    {editingTaskId ? '✏️ Edit Task' : '➕ Add New Task'}
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    {errors.message && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.message}
                        </Alert>
                    )}
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="Task Title"
                            value={taskFormData.title}
                            onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                            error={!!errors.title}
                            helperText={errors.title}
                            variant="outlined"
                            autoFocus
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={taskFormData.description}
                            onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                            error={!!errors.description}
                            helperText={errors.description}
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={taskFormData.priority}
                                label="Priority"
                                onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                            >
                                <MenuItem value="low">🟢 Low</MenuItem>
                                <MenuItem value="medium">🟡 Medium</MenuItem>
                                <MenuItem value="high">🔴 High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={taskFormData.status}
                                label="Status"
                                onChange={(e) => setTaskFormData({ ...taskFormData, status: e.target.value })}
                            >
                                <MenuItem value="pending">⏳ Pending</MenuItem>
                                <MenuItem value="in_progress">⚡ In Progress</MenuItem>
                                <MenuItem value="completed">✅ Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseTaskDialog} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitTask} variant="contained" color="primary">
                        {editingTaskId ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
