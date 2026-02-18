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
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { colors } from '@/theme/colors'
import AddIcon from '@mui/icons-material/Add'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import LogoutIcon from '@mui/icons-material/Logout'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import SearchIcon from '@mui/icons-material/Search'
import TaskIcon from '@mui/icons-material/Task'
import { useEffect, useMemo, useRef, useState } from 'react'
import CreditsBadge from '@/Components/CreditsBadge'
import PhoneDock from '@/Components/PhoneDock'
import PremiumBackdrop from '@/Components/PremiumBackdrop'
import PremiumPageHero from '@/Components/PremiumPageHero'
import usePersistedState from '@/hooks/usePersistedState'
import { getUrlParam, setUrlParams } from '@/utils/urlState'

const STATUS_PENDING = 'pending'
const STATUS_COMPLETED = 'completed'

const statCards = [
    { key: 'totalProjects', label: 'Projects', icon: <AssignmentIcon fontSize="small" /> },
    { key: 'totalTasks', label: 'Tasks', icon: <TaskIcon fontSize="small" /> },
    { key: 'completedTasks', label: 'Completed', icon: <CheckCircleIcon fontSize="small" /> },
]

export default function Dashboard({
    stats = {},
    projects = [],
    activity = [],
}) {
    const [localProjects, setLocalProjects] = useState(projects)
    const [newTask, setNewTask] = useState({})
    const [loadingTaskIds, setLoadingTaskIds] = useState([])
    const [creatingTaskFor, setCreatingTaskFor] = useState(null)
    const [deletingProjectId, setDeletingProjectId] = useState(null)
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [confirmDeleteTaskId, setConfirmDeleteTaskId] = useState(null)
    const [query, setQuery] = usePersistedState('dashboard_query', '')
    const [sortBy, setSortBy] = usePersistedState('dashboard_sort_by', 'newest')
    const [animatedIn, setAnimatedIn] = useState(false)
    const hasInitializedUrlState = useRef(false)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

    const glassCardSx = {
        borderRadius: 3,
        background: alpha(colors.white, 0.78),
        backdropFilter: 'blur(12px)',
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
    }
    const primaryButtonSx = {
        textTransform: 'none',
        borderRadius: 999,
        px: 2.2,
        fontWeight: 700,
    }
    const outlineButtonSx = {
        textTransform: 'none',
        borderRadius: 999,
        px: 2,
        fontWeight: 600,
    }

    useEffect(() => {
        setLocalProjects(projects)
    }, [projects])

    useEffect(() => {
        const frame = requestAnimationFrame(() => setAnimatedIn(true))

        return () => cancelAnimationFrame(frame)
    }, [])

    useEffect(() => {
        const q = getUrlParam('q')
        const sort = getUrlParam('sort', { allowedValues: ['newest', 'progress', 'alphabetical'] })

        if (q !== null) setQuery(q)
        if (sort !== null) setSortBy(sort)

        hasInitializedUrlState.current = true
    }, [setQuery, setSortBy])

    useEffect(() => {
        if (!hasInitializedUrlState.current) return

        setUrlParams(
            { q: query, sort: sortBy },
            { q: '', sort: 'newest' },
        )
    }, [query, sortBy])

    const hasProjects = useMemo(() => localProjects.length > 0, [localProjects])

    const calculateProgress = (project) => {
        const total = project.tasks_count ?? project.tasks?.length ?? 0
        if (!total) return 0
        const completed = project.completed_tasks_count ?? project.tasks?.filter((task) => task.status === STATUS_COMPLETED).length ?? 0

        return Math.round((completed / total) * 100)
    }

    const visibleProjects = useMemo(() => {
        const q = query.trim().toLowerCase()
        const list = localProjects.filter((project) => {
            if (!q) return true

            return project.title?.toLowerCase().includes(q)
                || project.description?.toLowerCase().includes(q)
                || project.tasks?.some((task) => task.title?.toLowerCase().includes(q))
        })

        return list.sort((a, b) => {
            if (sortBy === 'progress') {
                return calculateProgress(b) - calculateProgress(a)
            }

            if (sortBy === 'alphabetical') {
                return (a.title ?? '').localeCompare(b.title ?? '')
            }

            return (b.id ?? 0) - (a.id ?? 0)
        })
    }, [localProjects, query, sortBy])

    const toggleTask = (taskId) => {
        setLoadingTaskIds((prev) => [...prev, taskId])
        setLocalProjects((prev) => prev.map((project) => {
            let delta = 0

            const tasks = project.tasks?.map((task) => {
                if (task.id !== taskId) return task
                const nextCompleted = task.status !== STATUS_COMPLETED
                delta = nextCompleted ? 1 : -1

                return { ...task, status: nextCompleted ? STATUS_COMPLETED : STATUS_PENDING }
            })

            return {
                ...project,
                completed_tasks_count: Math.max(0, (project.completed_tasks_count ?? 0) + delta),
                tasks,
            }
        }))

        router.patch(route('tasks.toggle', taskId), {}, {
            preserveScroll: true,
            onError: () => setSnackbar({ open: true, message: 'Failed to update task.', severity: 'error' }),
            onFinish: () => setLoadingTaskIds((prev) => prev.filter((id) => id !== taskId)),
        })
    }

    const createTask = (projectId) => {
        const title = (newTask[projectId] ?? '').trim()
        if (!title) return

        setCreatingTaskFor(projectId)
        router.post(route('tasks.store'), { project_id: projectId, title }, {
            preserveScroll: true,
            onSuccess: () => {
                setNewTask((prev) => ({ ...prev, [projectId]: '' }))
                setSnackbar({ open: true, message: 'Task created.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to create task.', severity: 'error' }),
            onFinish: () => setCreatingTaskFor(null),
        })
    }

    const deleteTask = () => {
        if (!confirmDeleteTaskId) return

        router.delete(route('tasks.destroy', confirmDeleteTaskId), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmDeleteTaskId(null)
                setSnackbar({ open: true, message: 'Task deleted.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to delete task.', severity: 'error' }),
        })
    }

    const deleteProject = (projectId) => {
        setDeletingProjectId(projectId)

        router.delete(route('projects.destroy', projectId), {
            preserveScroll: true,
            onSuccess: () => {
                setLocalProjects((prev) => prev.filter((project) => project.id !== projectId))
                setSnackbar({ open: true, message: 'Project deleted.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to delete project.', severity: 'error' }),
            onFinish: () => {
                setDeletingProjectId(null)
                setConfirmDeleteId(null)
            },
        })
    }

    const resetView = () => {
        setQuery('')
        setSortBy('newest')
        setSnackbar({ open: true, message: 'Dashboard view reset.', severity: 'success' })
    }

    return (
        <>
            <Head title="Dashboard" />

            <Box
                className="phone-web-bg dashboard-grid-bg"
                sx={{
                    minHeight: '100vh',
                    py: { xs: 4, md: 6 },
                    background: colors.background.surfaceGradient,
                }}
            >
                <PremiumBackdrop />
                <Container maxWidth="lg">
                    <Box className="phone-shell">
                        <Stack spacing={4}>
                            <PremiumPageHero
                                title="Dashboard"
                                subtitle="Track progress across projects with fast actions and live completion insights."
                                chips={[
                                    { label: `${visibleProjects.length} visible`, color: 'primary' },
                                    { label: `${stats.totalTasks ?? 0} tasks`, variant: 'outlined' },
                                    { label: `${stats.completedTasks ?? 0} completed`, color: 'success', variant: 'outlined' },
                                ]}
                                rightSlot={(
                                    <Stack direction="row" spacing={1.1}>
                                        <Button variant="outlined" component={Link} href={route('tasks.index')} sx={outlineButtonSx}>
                                            Tasks
                                        </Button>
                                        <Button variant="contained" startIcon={<AddIcon />} component={Link} href={route('projects.index')} sx={primaryButtonSx}>
                                            Manage Projects
                                        </Button>
                                        <Button variant="outlined" color="inherit" startIcon={<LogoutIcon />} onClick={() => router.post(route('logout'))} sx={outlineButtonSx}>
                                            Logout
                                        </Button>
                                    </Stack>
                                )}
                            />

                        <Grid container spacing={2}>
                            {statCards.map((item) => (
                                <Grid item xs={12} md={4} key={item.key}>
                                    <Card sx={glassCardSx}>
                                        <CardContent>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Box>
                                                    <Typography color="text.secondary">{item.label}</Typography>
                                                    <Typography variant="h5" fontWeight={800}>{stats[item.key] ?? 0}</Typography>
                                                </Box>
                                                <Chip icon={item.icon} label="Live" size="small" />
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {!hasProjects && (
                            <Card sx={{ ...glassCardSx, border: (theme) => `1px dashed ${alpha(theme.palette.text.primary, 0.25)}` }}>
                                <CardContent>
                                    <Stack spacing={2} alignItems="center" py={2}>
                                        <Typography variant="h6" fontWeight={700}>No projects yet</Typography>
                                        <Typography color="text.secondary">Create your first project to start tracking work.</Typography>
                                        <Button variant="contained" component={Link} href={route('projects.index')} startIcon={<AddIcon />} sx={primaryButtonSx}>
                                            Create Project
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        )}

                        <Card sx={glassCardSx}>
                            <CardContent>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search projects or task titles"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControl size="small" sx={{ minWidth: 160 }}>
                                        <InputLabel id="dashboard-sort">Sort</InputLabel>
                                        <Select labelId="dashboard-sort" label="Sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                                            <MenuItem value="newest">newest</MenuItem>
                                            <MenuItem value="progress">progress</MenuItem>
                                            <MenuItem value="alphabetical">alphabetical</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Chip label={`${visibleProjects.length} visible`} color="primary" variant="outlined" />
                                    <Button variant="text" onClick={resetView} sx={{ textTransform: 'none' }}>
                                        Reset View
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={3}>
                                    {hasProjects && visibleProjects.length === 0 && (
                                        <Card sx={glassCardSx}>
                                            <CardContent>
                                                <Stack spacing={1.2}>
                                                    <Typography variant="h6" fontWeight={700}>No matching projects</Typography>
                                                    <Typography color="text.secondary">
                                                        Your current search/sort returned no projects.
                                                    </Typography>
                                                    <Button variant="outlined" onClick={resetView} sx={{ textTransform: 'none', width: 'fit-content' }}>
                                                        Reset View
                                                    </Button>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    )}
                                    {visibleProjects.map((project, index) => {
                                        const progress = calculateProgress(project)

                                        return (
                                            <Card
                                                key={project.id}
                                                sx={{
                                                    ...glassCardSx,
                                                    animation: animatedIn ? 'taskReveal .45s ease both' : 'none',
                                                    animationDelay: `${index * 60}ms`,
                                                    transition: 'transform .2s ease, box-shadow .2s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: (theme) => theme.shadows[6],
                                                    },
                                                }}
                                            >
                                                <CardContent>
                                                    <Stack spacing={2}>
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Typography variant="h6" fontWeight={700}>{project.title}</Typography>
                                                            <Chip label={`${progress}%`} color={progress === 100 ? 'success' : 'default'} />
                                                        </Stack>

                                                        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 8 }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {project.completed_tasks_count ?? 0}/{project.tasks_count ?? project.tasks?.length ?? 0} completed
                                                        </Typography>

                                                        <Stack spacing={1}>
                                                            {project.tasks?.length === 0 && (
                                                                <Typography variant="body2" color="text.secondary">No tasks yet.</Typography>
                                                            )}
                                                            {project.tasks?.map((task) => {
                                                                const isLoading = loadingTaskIds.includes(task.id)

                                                                return (
                                                                    <Stack key={task.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.04) }}>
                                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                                            <IconButton size="small" onClick={() => toggleTask(task.id)} disabled={isLoading}>
                                                                                {task.status === STATUS_COMPLETED ? <CheckCircleIcon color="success" fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
                                                                            </IconButton>
                                                                            <Typography sx={{ textDecoration: task.status === STATUS_COMPLETED ? 'line-through' : 'none' }}>{task.title}</Typography>
                                                                        </Stack>
                                                                        <IconButton size="small" color="error" onClick={() => setConfirmDeleteTaskId(task.id)}>
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Stack>
                                                                )
                                                            })}
                                                        </Stack>

                                                        <Stack direction="row" spacing={1}>
                                                            <TextField
                                                                size="small"
                                                                fullWidth
                                                                placeholder="Add task"
                                                                value={newTask[project.id] ?? ''}
                                                                onChange={(event) => setNewTask((prev) => ({ ...prev, [project.id]: event.target.value }))}
                                                                onKeyDown={(event) => {
                                                                    if (event.key === 'Enter') createTask(project.id)
                                                                }}
                                                            />
                                                            <Button variant="contained" onClick={() => createTask(project.id)} disabled={creatingTaskFor === project.id} sx={{ textTransform: 'none' }}>
                                                                Add
                                                            </Button>
                                                        </Stack>

                                                        <Divider />
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Button size="small" component={Link} href={route('projects.show', project.id)} startIcon={<OpenInNewIcon />} sx={{ textTransform: 'none' }}>
                                                                Open
                                                            </Button>
                                                            <Button size="small" color="error" startIcon={<DeleteIcon />} disabled={deletingProjectId === project.id} onClick={() => setConfirmDeleteId(project.id)} sx={{ textTransform: 'none' }}>
                                                                Delete
                                                            </Button>
                                                        </Stack>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card sx={glassCardSx}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight={700} mb={2}>Recent Activity</Typography>
                                        <Stack spacing={1}>
                                            {activity.length === 0 && (
                                                <Typography variant="body2" color="text.secondary">No recent activity.</Typography>
                                            )}
                                            {activity.map((task) => (
                                                <Stack key={task.id} sx={{ p: 1.2, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.04) }}>
                                                    <Typography variant="body2" fontWeight={600}>{task.title}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {task.status === STATUS_COMPLETED ? 'Completed' : 'Pending'}
                                                    </Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        </Stack>
                        <CreditsBadge />
                    </Box>
                </Container>
                <PhoneDock active="dashboard" />
            </Box>

            <Dialog open={Boolean(confirmDeleteId)} onClose={() => setConfirmDeleteId(null)}>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will permanently remove the project and all of its tasks.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteId(null)}>No</Button>
                    <Button color="error" variant="contained" onClick={() => deleteProject(confirmDeleteId)}>
                        Yes, delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(confirmDeleteTaskId)} onClose={() => setConfirmDeleteTaskId(null)}>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Delete this task permanently?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteTaskId(null)}>No</Button>
                    <Button color="error" variant="contained" onClick={deleteTask}>
                        Yes, delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </>
    )
}
