import { Head, Link, router } from '@inertiajs/react'
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    IconButton,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { colors } from '@/theme/colors'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

const PRIORITY_OPTIONS = ['low', 'medium', 'high']
const STATUS_PENDING = 'pending'
const STATUS_COMPLETED = 'completed'

export default function Show({ project }) {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
    })
    const [editProject, setEditProject] = useState(false)
    const [editProjectData, setEditProjectData] = useState({
        title: project.title,
        description: project.description ?? '',
    })
    const [editTask, setEditTask] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

    const completedTasks = project.tasks?.filter((task) => task.status === STATUS_COMPLETED).length || 0
    const totalTasks = project.tasks?.length || 0

    const createTask = () => {
        if (!newTask.title.trim()) return

        router.post(route('tasks.store'), {
            project_id: project.id,
            title: newTask.title.trim(),
            description: newTask.description,
            priority: newTask.priority,
            status: STATUS_PENDING,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setNewTask({ title: '', description: '', priority: 'medium' })
                setSnackbar({ open: true, message: 'Task created.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to create task.', severity: 'error' }),
        })
    }

    const updateProject = () => {
        router.put(route('projects.update', project.id), editProjectData, {
            preserveScroll: true,
            onSuccess: () => {
                setEditProject(false)
                setSnackbar({ open: true, message: 'Project updated.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to update project.', severity: 'error' }),
        })
    }

    const updateTask = () => {
        if (!editTask?.title?.trim()) return

        router.put(route('tasks.update', editTask.id), {
            title: editTask.title,
            description: editTask.description ?? '',
            priority: editTask.priority ?? 'medium',
            status: editTask.status ?? STATUS_PENDING,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditTask(null)
                setSnackbar({ open: true, message: 'Task updated.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to update task.', severity: 'error' }),
        })
    }

    const toggleTask = (taskId) => {
        router.patch(route('tasks.toggle', taskId), {}, { preserveScroll: true })
    }

    const deleteTask = (taskId) => {
        router.delete(route('tasks.destroy', taskId), {
            preserveScroll: true,
            onSuccess: () => setSnackbar({ open: true, message: 'Task deleted.', severity: 'success' }),
            onError: () => setSnackbar({ open: true, message: 'Failed to delete task.', severity: 'error' }),
        })
    }

    return (
        <>
            <Head title={project.title} />

            <Box sx={{ minHeight: '100vh', py: 6, background: colors.background.surfaceGradient }}>
                <Container maxWidth="md">
                    <Button
                        component={Link}
                        href={route('projects.index')}
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 3 }}
                    >
                        Back to projects
                    </Button>

                    <Card
                        sx={{
                            borderRadius: 4,
                            background: alpha(colors.white, 0.78),
                            backdropFilter: 'blur(12px)',
                            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h5" fontWeight={800}>{project.title}</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Chip label={`${completedTasks}/${totalTasks} completed`} color="success" variant="outlined" />
                                    <IconButton onClick={() => setEditProject(true)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>

                            <Typography color="text.secondary" mb={2}>
                                {project.description || 'No description available.'}
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            <Stack spacing={1.5}>
                                {project.tasks?.map((task) => (
                                    <Stack
                                        key={task.id}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ p: 1.5, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.05) }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <IconButton onClick={() => toggleTask(task.id)}>
                                                {task.status === STATUS_COMPLETED ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
                                            </IconButton>
                                            <Typography sx={{ textDecoration: task.status === STATUS_COMPLETED ? 'line-through' : 'none' }}>
                                                {task.title}
                                            </Typography>
                                            <Chip size="small" label={task.priority} variant="outlined" />
                                        </Stack>

                                        <Stack direction="row" spacing={0.5}>
                                            <IconButton onClick={() => setEditTask({
                                                id: task.id,
                                                title: task.title,
                                                description: task.description ?? '',
                                                priority: task.priority ?? 'medium',
                                                status: task.status ?? STATUS_PENDING,
                                            })}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => deleteTask(task.id)} sx={{ color: colors.feedback.danger }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                ))}

                                <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                                    <Stack spacing={1} sx={{ width: '100%' }}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="Add a task title"
                                            value={newTask.title}
                                            onChange={(event) => setNewTask((prev) => ({ ...prev, title: event.target.value }))}
                                        />
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="Description (optional)"
                                            value={newTask.description}
                                            onChange={(event) => setNewTask((prev) => ({ ...prev, description: event.target.value }))}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    createTask()
                                                }
                                            }}
                                        />
                                    </Stack>
                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                        <InputLabel id="show-task-priority-label">Priority</InputLabel>
                                        <Select
                                            labelId="show-task-priority-label"
                                            label="Priority"
                                            value={newTask.priority}
                                            onChange={(event) => setNewTask((prev) => ({ ...prev, priority: event.target.value }))}
                                        >
                                            {PRIORITY_OPTIONS.map((option) => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" onClick={createTask} startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>
                                        Add
                                    </Button>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Box>

            <Dialog open={editProject} onClose={() => setEditProject(false)} fullWidth maxWidth="sm">
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Title"
                            value={editProjectData.title}
                            onChange={(event) => setEditProjectData((prev) => ({ ...prev, title: event.target.value }))}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            multiline
                            minRows={3}
                            value={editProjectData.description}
                            onChange={(event) => setEditProjectData((prev) => ({ ...prev, description: event.target.value }))}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditProject(false)}>Cancel</Button>
                    <Button variant="contained" onClick={updateProject}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(editTask)} onClose={() => setEditTask(null)} fullWidth maxWidth="sm">
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Task title"
                            value={editTask?.title ?? ''}
                            onChange={(event) => setEditTask((prev) => ({ ...prev, title: event.target.value }))}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={editTask?.description ?? ''}
                            onChange={(event) => setEditTask((prev) => ({ ...prev, description: event.target.value }))}
                            multiline
                            minRows={2}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel id="show-edit-task-priority-label">Priority</InputLabel>
                            <Select
                                labelId="show-edit-task-priority-label"
                                label="Priority"
                                value={editTask?.priority ?? 'medium'}
                                onChange={(event) => setEditTask((prev) => ({ ...prev, priority: event.target.value }))}
                            >
                                {PRIORITY_OPTIONS.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="show-edit-task-status-label">Status</InputLabel>
                            <Select
                                labelId="show-edit-task-status-label"
                                label="Status"
                                value={editTask?.status ?? STATUS_PENDING}
                                onChange={(event) => setEditTask((prev) => ({ ...prev, status: event.target.value }))}
                            >
                                <MenuItem value={STATUS_PENDING}>pending</MenuItem>
                                <MenuItem value={STATUS_COMPLETED}>completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditTask(null)}>Cancel</Button>
                    <Button variant="contained" onClick={updateTask}>Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
                <Alert variant="filled" severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    )
}
