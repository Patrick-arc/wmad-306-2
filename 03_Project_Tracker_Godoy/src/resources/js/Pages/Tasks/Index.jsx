import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { Add, ToggleOn } from '@mui/icons-material';
import TaskCard from '@/Components/TaskCard';
import { useThemeContext } from '@/Components/ThemeProvider';

export default function Index({ tasks, projects }) {
    const { theme } = useThemeContext();
    const { flash } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        project_id: projects[0]?.id || '',
        title: '',
        description: '',
        priority: 'important',
        status: 'pending',
        due_date: '',
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Handle flash messages from backend
    useEffect(() => {
        if (flash?.success) {
            setSnackbar({
                open: true,
                message: flash.success,
                severity: 'success'
            });
        }
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset('title', 'description', 'due_date');
                setSnackbar({
                    open: true,
                    message: 'Task successfully saved',
                    severity: 'success'
                });
            },
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Error creating task. Please check form.',
                    severity: 'error'
                });
            }
        });
    };

    const handleDelete = (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', taskId), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setSnackbar({
                        open: true,
                        message: 'Task deleted successfully!',
                        severity: 'success'
                    });
                },
                onError: () => {
                    setSnackbar({
                        open: true,
                        message: 'Error deleting task.',
                        severity: 'error'
                    });
                }
            });
        }
    };

    const handleUpdate = (taskId, updateData) => {
        router.patch(route('tasks.update', taskId), updateData, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setSnackbar({
                    open: true,
                    message: 'Task successfully updated',
                    severity: 'success'
                });
            },
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Error updating task.',
                    severity: 'error'
                });
            }
        });
    };

    // Toggle status functionality
    const handleToggleStatus = (task) => {
        router.post(route('tasks.toggle-status', task.id), {}, {
            onSuccess: () => {
                setSnackbar({
                    open: true,
                    message: 'Task status updated',
                    severity: 'success'
                });
            },
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Error updating task status.',
                    severity: 'error'
                });
            }
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    Tasks
                </Typography>
            }
        >
            <Head title="Tasks" />

            <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                {/* Create Task Form */}
                <Paper sx={{ p: 4, mb: 3, borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.text.primary }}>
                        Create New Task
                    </Typography>
                    
                    <form onSubmit={submit}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                            <FormControl size="small" sx={{ minWidth: 200 }} error={!!errors.project_id}>
                                <InputLabel>Project</InputLabel>
                                <Select
                                    value={data.project_id}
                                    label="Project"
                                    onChange={(e) => setData('project_id', e.target.value)}
                                    required
                                >
                                    {projects.map((project) => (
                                        <MenuItem key={project.id} value={project.id}>
                                            {project.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.project_id && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                        {errors.project_id}
                                    </Typography>
                                )}
                            </FormControl>
                            
                            <TextField
                                label="Task Title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                error={!!errors.title}
                                helperText={errors.title}
                                required
                                sx={{ minWidth: 250 }}
                            />
                            
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    value={data.priority}
                                    label="Priority"
                                    onChange={(e) => setData('priority', e.target.value)}
                                >
                                    <MenuItem value="less important">Less Important</MenuItem>
                                    <MenuItem value="important">Important</MenuItem>
                                    <MenuItem value="very important">Very Important</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={data.status}
                                    label="Status"
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="on going">On Going</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <TextField
                                label="Due Date"
                                type="date"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ minWidth: 150 }}
                            />
                        </Box>
                        
                        <TextField
                            label="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            multiline
                            rows={2}
                            fullWidth
                            sx={{ mb: 2 }}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            startIcon={processing ? <CircularProgress size={20} /> : <Add />}
                            sx={{
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                padding: '10px 24px',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    background: theme.palette.primary.dark,
                                }
                            }}
                        >
                            {processing ? 'Creating...' : 'Create Task'}
                        </Button>
                    </form>
                </Paper>

                {/* Tasks List */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.text.primary }}>
                        All Tasks ({tasks.length})
                    </Typography>
                    
                    {tasks.length > 0 ? (
                        <Box>
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    projects={projects}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                    onToggleStatus={handleToggleStatus}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Paper
                            sx={{
                                p: 6,
                                textAlign: 'center',
                                borderRadius: 3,
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
                                No tasks yet
                            </Typography>
                            <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mb: 3 }}>
                                Create your first task using form above
                            </Typography>
                        </Paper>
                    )}
                </Box>

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </AuthenticatedLayout>
    );
}
