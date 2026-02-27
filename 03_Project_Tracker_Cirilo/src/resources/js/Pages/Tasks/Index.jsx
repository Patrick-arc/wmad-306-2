import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
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
    Select,
    MenuItem,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import darkTheme from '@/theme';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function TasksIndex({ tasks }) {
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

    const handleStatusToggle = (task) => {
        const statusCycle = {
            pending: 'in_progress',
            in_progress: 'completed',
            completed: 'pending',
        };
        const newStatus = statusCycle[task.status] || 'pending';
        router.patch(
            route('tasks.update', task.id),
            {
                ...task,
                status: newStatus,
            },
            { preserveScroll: true },
        );
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
                        Tasks
                    </Typography>
                }
            >
                <Head title="Tasks" />

                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                        }}
                    >
                        <Typography variant="h5" sx={{ color: '#b0bec5' }}>
                            {tasks.length} tasks
                        </Typography>
                        <Link href={route('tasks.create')}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                            >
                                + New Task
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
                                                    gap: 2,
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
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: '#757575',
                                                            display: 'block',
                                                            mb: 2,
                                                        }}
                                                    >
                                                        Project ID: {task.project_id}
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
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                        <Chip
                                                            label={task.status.replace(
                                                                '_',
                                                                ' ',
                                                            )}
                                                            size="small"
                                                            onClick={() =>
                                                                handleStatusToggle(
                                                                    task,
                                                                )
                                                            }
                                                            sx={{
                                                                backgroundColor:
                                                                    getStatusColor(
                                                                        task.status,
                                                                    ),
                                                                color: '#000',
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                transition:
                                                                    'all 0.2s ease',
                                                                '&:hover': {
                                                                    opacity: 0.8,
                                                                    transform:
                                                                        'scale(1.05)',
                                                                },
                                                            }}
                                                            title="Click to change status"
                                                        />
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
                            <Link href={route('tasks.create')}>
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
