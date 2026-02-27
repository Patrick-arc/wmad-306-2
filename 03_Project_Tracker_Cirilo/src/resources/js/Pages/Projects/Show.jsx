import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    ThemeProvider,
    Typography,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import darkTheme from '@/theme';
import { useState } from 'react';

export default function ShowProject({ project, tasks }) {
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleDeleteClick = (task) => {
        setSelectedTask(task);
        setDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedTask) {
            router.delete(route('tasks.destroy', selectedTask.id));
        }
        setDeleteDialog(false);
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: '#66bb6a',
            medium: '#ffa726',
            high: '#ef5350',
        };
        return colors[priority] || '#b0bec5';
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#90caf9',
            in_progress: '#ffa726',
            completed: '#66bb6a',
        };
        return colors[status] || '#b0bec5';
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <AuthenticatedLayout
                header={
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {project.title}
                    </Typography>
                }
            >
                <Head title={project.title} />

                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Link href={route('projects.index')}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            sx={{ mb: 3 }}
                            color="inherit"
                        >
                            Back to Projects
                        </Button>
                    </Link>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                            color: '#64b5f6',
                                        }}
                                    >
                                        Project Details
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#b0bec5',
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {project.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Link
                                            href={route(
                                                'projects.edit',
                                                project.id,
                                            )}
                                        >
                                            <IconButton
                                                color="primary"
                                                title="Edit project"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        {/* Add delete button if needed */}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            Tasks ({tasks.length})
                        </Typography>
                        <Link href={route('tasks.create', { project_id: project.id })}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                            >
                                Add Task
                            </Button>
                        </Link>
                    </Box>

                    {tasks && tasks.length > 0 ? (
                        <Grid container spacing={2}>
                            {tasks.map((task) => (
                                <Grid item xs={12} key={task.id}>
                                    <Card
                                        sx={{
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow:
                                                    '0 8px 16px rgba(100, 181, 246, 0.15)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'start',
                                                }}
                                            >
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            mb: 1,
                                                            fontWeight: 600,
                                                            color: '#64b5f6',
                                                        }}
                                                    >
                                                        {task.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#b0bec5',
                                                            mb: 2,
                                                        }}
                                                    >
                                                        {task.description}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            gap: 1,
                                                            flexWrap: 'wrap',
                                                        }}
                                                    >
                                                        <Chip
                                                            label={task.priority}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor:
                                                                    getPriorityColor(
                                                                        task.priority,
                                                                    ),
                                                                color: '#000',
                                                            }}
                                                        />
                                                        {/* Status as radio buttons */}
                                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                            {[{label: 'Pending', value: 'pending'}, {label: 'Ongoing', value: 'in_progress'}, {label: 'Completed', value: 'completed'}].map(opt => (
                                                                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                                    <input
                                                                        type="radio"
                                                                        name={`status-${task.id}`}
                                                                        value={opt.value}
                                                                        checked={task.status === opt.value}
                                                                        disabled
                                                                        style={{ accentColor: getStatusColor(opt.value) }}
                                                                    />
                                                                    <span style={{ color: getStatusColor(opt.value), fontWeight: 500 }}>{opt.label}</span>
                                                                </label>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Link
                                                        href={route(
                                                            'tasks.edit',
                                                            task.id,
                                                        )}
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            color="primary"
                                                            title="Edit task"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                task,
                                                            )
                                                        }
                                                        title="Delete task"
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
                        <Card sx={{ textAlign: 'center', py: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{ color: '#b0bec5', mb: 2 }}
                            >
                                No tasks yet
                            </Typography>
                            <Link href={route('tasks.create', { project_id: project.id })}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                >
                                    Create First Task
                                </Button>
                            </Link>
                        </Card>
                    )}

                    <Dialog
                        open={deleteDialog}
                        onClose={() => setDeleteDialog(false)}
                    >
                        <DialogTitle>Delete Task</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete "
                                {selectedTask?.title}"? This action cannot be
                                undone.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setDeleteDialog(false)}
                                color="inherit"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDeleteConfirm}
                                color="error"
                                variant="contained"
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </AuthenticatedLayout>
        </ThemeProvider>
    );
}
