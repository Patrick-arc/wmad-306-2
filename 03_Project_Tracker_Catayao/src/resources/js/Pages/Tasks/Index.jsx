import { Head, Link, router, useForm } from '@inertiajs/react'
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
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import { alpha } from '@mui/material/styles'
import { colors } from '@/theme/colors'
import { useEffect, useMemo, useRef, useState } from 'react'
import CreditsBadge from '@/Components/CreditsBadge'
import PhoneDock from '@/Components/PhoneDock'
import PremiumBackdrop from '@/Components/PremiumBackdrop'
import PremiumPageHero from '@/Components/PremiumPageHero'
import usePersistedState from '@/hooks/usePersistedState'
import { getUrlParam, setUrlParams } from '@/utils/urlState'

const PRIORITY_OPTIONS = ['low', 'medium', 'high']
const STATUS_PENDING = 'pending'
const STATUS_COMPLETED = 'completed'

export default function Index({ tasks, projects = [] }) {
    const [editTask, setEditTask] = useState(null)
    const [confirmDeleteTask, setConfirmDeleteTask] = useState(null)
    const [confirmBulkComplete, setConfirmBulkComplete] = useState(false)
    const [confirmBulkDelete, setConfirmBulkDelete] = useState(false)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [query, setQuery] = usePersistedState('tasks_query', '')
    const [statusFilter, setStatusFilter] = usePersistedState('tasks_status_filter', 'all')
    const [priorityFilter, setPriorityFilter] = usePersistedState('tasks_priority_filter', 'all')
    const [sortBy, setSortBy] = usePersistedState('tasks_sort_by', 'newest')
    const [animatedIn, setAnimatedIn] = useState(false)
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const hasInitializedUrlState = useRef(false)

    const searchRef = useRef(null)
    const titleRef = useRef(null)
    const taskList = tasks?.data ?? []
    const form = useForm({
        project_id: projects[0]?.id ?? '',
        title: '',
        description: '',
        priority: 'medium',
    })

    useEffect(() => {
        const frame = requestAnimationFrame(() => setAnimatedIn(true))

        return () => cancelAnimationFrame(frame)
    }, [])

    useEffect(() => {
        const q = getUrlParam('q')
        const status = getUrlParam('status', { allowedValues: ['all', STATUS_PENDING, STATUS_COMPLETED] })
        const priority = getUrlParam('priority', { allowedValues: ['all', ...PRIORITY_OPTIONS] })
        const sort = getUrlParam('sort', { allowedValues: ['newest', 'priority', 'alphabetical'] })

        if (q !== null) setQuery(q)
        if (status !== null) setStatusFilter(status)
        if (priority !== null) setPriorityFilter(priority)
        if (sort !== null) setSortBy(sort)

        hasInitializedUrlState.current = true
    }, [setPriorityFilter, setQuery, setSortBy, setStatusFilter])

    useEffect(() => {
        if (!hasInitializedUrlState.current) return

        setUrlParams(
            { q: query, status: statusFilter, priority: priorityFilter, sort: sortBy },
            { q: '', status: 'all', priority: 'all', sort: 'newest' },
        )
    }, [priorityFilter, query, sortBy, statusFilter])

    const filteredTasks = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()

        const list = taskList.filter((task) => {
            const matchesQuery = normalizedQuery.length === 0
                || task.title?.toLowerCase().includes(normalizedQuery)
                || task.description?.toLowerCase().includes(normalizedQuery)
                || task.project?.title?.toLowerCase().includes(normalizedQuery)
            const matchesStatus = statusFilter === 'all' || task.status === statusFilter
            const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter

            return matchesQuery && matchesStatus && matchesPriority
        })

        return list.sort((a, b) => {
            if (sortBy === 'priority') {
                const rank = { high: 3, medium: 2, low: 1 }

                return (rank[b.priority] ?? 0) - (rank[a.priority] ?? 0)
            }

            if (sortBy === 'alphabetical') {
                return (a.title ?? '').localeCompare(b.title ?? '')
            }

            return (b.id ?? 0) - (a.id ?? 0)
        })
    }, [taskList, query, statusFilter, priorityFilter, sortBy])

    const completedCount = filteredTasks.filter((task) => task.status === STATUS_COMPLETED).length
    const pendingVisibleIds = filteredTasks.filter((task) => task.status === STATUS_PENDING).map((task) => task.id)
    const completedVisibleIds = filteredTasks.filter((task) => task.status === STATUS_COMPLETED).map((task) => task.id)

    useEffect(() => {
        const onKeyDown = (event) => {
            const target = event.target
            const tag = target?.tagName?.toLowerCase()
            const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable
            if (isTyping) return

            if (event.key === '/') {
                event.preventDefault()
                searchRef.current?.focus()
            }

            if (event.key.toLowerCase() === 'n') {
                event.preventDefault()
                titleRef.current?.focus()
            }

            if (event.key.toLowerCase() === 'e' && filteredTasks[0]) {
                event.preventDefault()
                setEditTask(filteredTasks[0])
            }
        }

        window.addEventListener('keydown', onKeyDown)

        return () => window.removeEventListener('keydown', onKeyDown)
    }, [filteredTasks])

    const runTaskQueue = (ids, runSingle, successMessage) => {
        if (ids.length === 0) return

        let index = 0
        let failures = 0

        const next = () => {
            if (index >= ids.length) {
                if (failures === 0) {
                    setSnackbar({ open: true, message: successMessage, severity: 'success' })
                } else {
                    setSnackbar({ open: true, message: `${failures} action(s) failed.`, severity: 'error' })
                }

                return
            }

            const id = ids[index]
            index += 1

            runSingle(id, () => {
                failures += 1
                next()
            }, next)
        }

        next()
    }

    const createTask = (event) => {
        event.preventDefault()
        form.post(route('tasks.store'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('title', 'description', 'priority')
                form.setData('priority', 'medium')
                setSnackbar({ open: true, message: 'Task created.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to create task.', severity: 'error' }),
        })
    }

    const updateTask = () => {
        if (!editTask) return

        router.put(route('tasks.update', editTask.id), {
            title: editTask.title,
            description: editTask.description ?? '',
            priority: editTask.priority,
            status: editTask.status,
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
        router.patch(route('tasks.toggle', taskId), {}, {
            preserveScroll: true,
            onError: () => setSnackbar({ open: true, message: 'Failed to update status.', severity: 'error' }),
        })
    }

    const deleteTask = () => {
        if (!confirmDeleteTask?.id) return

        router.delete(route('tasks.destroy', confirmDeleteTask.id), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmDeleteTask(null)
                setSnackbar({ open: true, message: 'Task deleted.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to delete task.', severity: 'error' }),
        })
    }

    const bulkCompleteVisible = () => {
        setConfirmBulkComplete(false)

        runTaskQueue(
            pendingVisibleIds,
            (id, onError, onDone) => router.patch(route('tasks.toggle', id), {}, {
                preserveScroll: true,
                onError,
                onFinish: onDone,
            }),
            'Visible tasks marked as completed.',
        )
    }

    const bulkDeleteCompleted = () => {
        setConfirmBulkDelete(false)

        runTaskQueue(
            completedVisibleIds,
            (id, onError, onDone) => router.delete(route('tasks.destroy', id), {
                preserveScroll: true,
                onError,
                onFinish: onDone,
            }),
            'Completed tasks deleted.',
        )
    }

    const resetView = () => {
        setQuery('')
        setStatusFilter('all')
        setPriorityFilter('all')
        setSortBy('newest')
        setSnackbar({ open: true, message: 'Task view reset.', severity: 'success' })
    }

    return (
        <>
            <Head title="Tasks" />
            <Box className="phone-web-bg" sx={{ minHeight: '100vh', py: 5, background: colors.background.surfaceGradient }}>
                <PremiumBackdrop />
                <Container maxWidth="lg">
                    <Box className="phone-shell">
                        <Stack spacing={3}>
                            <PremiumPageHero
                                title="Tasks"
                                subtitle="Focus your execution pipeline with filters, shortcuts, and bulk actions."
                                chips={[
                                    { label: `${filteredTasks.length} visible`, color: 'primary' },
                                    { label: `${completedCount} completed`, color: 'success', variant: 'outlined' },
                                    { label: `${Math.max(filteredTasks.length - completedCount, 0)} pending`, variant: 'outlined' },
                                ]}
                                rightSlot={(
                                    <Stack direction="row" spacing={1}>
                                        <Button component={Link} href={route('dashboard')} startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>Dashboard</Button>
                                        <Button component={Link} href={route('projects.index')} variant="outlined" sx={{ textTransform: 'none' }}>Projects</Button>
                                    </Stack>
                                )}
                            />

                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2} flexWrap="wrap" useFlexGap>
                                <Chip label="/: search" variant="outlined" />
                                <Chip label="N: new task" variant="outlined" />
                                <Chip label="E: edit first" variant="outlined" />
                            </Stack>

                        <Card sx={{ borderRadius: 3, background: alpha(colors.white, 0.78), backdropFilter: 'blur(12px)' }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} mb={2}>Add Task</Typography>
                                <form onSubmit={createTask}>
                                    <Stack spacing={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="project_id_label">Project</InputLabel>
                                            <Select
                                                labelId="project_id_label"
                                                label="Project"
                                                value={form.data.project_id}
                                                onChange={(event) => form.setData('project_id', event.target.value)}
                                            >
                                                {projects.map((project) => (
                                                    <MenuItem key={project.id} value={project.id}>{project.title}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField inputRef={titleRef} label="Title" value={form.data.title} onChange={(event) => form.setData('title', event.target.value)} fullWidth />
                                        <TextField label="Description" value={form.data.description} onChange={(event) => form.setData('description', event.target.value)} multiline minRows={2} fullWidth />
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="priority_label">Priority</InputLabel>
                                            <Select
                                                labelId="priority_label"
                                                label="Priority"
                                                value={form.data.priority}
                                                onChange={(event) => form.setData('priority', event.target.value)}
                                            >
                                                {PRIORITY_OPTIONS.map((option) => (
                                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button type="submit" variant="contained" sx={{ textTransform: 'none', width: { xs: '100%', sm: 'fit-content' } }}>
                                            Create Task
                                        </Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>

                        <Card sx={{ borderRadius: 3, background: alpha(colors.white, 0.72), backdropFilter: 'blur(10px)' }}>
                            <CardContent>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
                                    <TextField
                                        inputRef={searchRef}
                                        size="small"
                                        fullWidth
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search title, description, or project"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ color: 'text.secondary' }} fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControl size="small" sx={{ minWidth: 130 }}>
                                        <InputLabel id="status-filter">Status</InputLabel>
                                        <Select labelId="status-filter" label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                                            <MenuItem value="all">all</MenuItem>
                                            <MenuItem value={STATUS_PENDING}>pending</MenuItem>
                                            <MenuItem value={STATUS_COMPLETED}>completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl size="small" sx={{ minWidth: 130 }}>
                                        <InputLabel id="priority-filter">Priority</InputLabel>
                                        <Select labelId="priority-filter" label="Priority" value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
                                            <MenuItem value="all">all</MenuItem>
                                            {PRIORITY_OPTIONS.map((option) => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl size="small" sx={{ minWidth: 150 }}>
                                        <InputLabel id="sort-by">Sort</InputLabel>
                                        <Select labelId="sort-by" label="Sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                                            <MenuItem value="newest">newest</MenuItem>
                                            <MenuItem value="priority">priority</MenuItem>
                                            <MenuItem value="alphabetical">alphabetical</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button variant="outlined" color="success" disabled={pendingVisibleIds.length === 0} onClick={() => setConfirmBulkComplete(true)} sx={{ textTransform: 'none' }}>
                                        Complete Visible
                                    </Button>
                                    <Button variant="outlined" color="error" disabled={completedVisibleIds.length === 0} onClick={() => setConfirmBulkDelete(true)} sx={{ textTransform: 'none' }}>
                                        Delete Completed
                                    </Button>
                                    <Button variant="text" onClick={resetView} sx={{ textTransform: 'none' }}>
                                        Reset View
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Stack spacing={2}>
                            {filteredTasks.length === 0 && (
                                <Card sx={{ borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography color="text.secondary">No tasks match your current filters.</Typography>
                                    </CardContent>
                                </Card>
                            )}
                            {filteredTasks.map((task, index) => (
                                <Card
                                    key={task.id}
                                    onClick={() => setSelectedTaskId(task.id)}
                                    sx={{
                                        cursor: 'pointer',
                                        borderRadius: 3,
                                        border: (theme) => selectedTaskId === task.id ? `1px solid ${alpha(theme.palette.primary.main, 0.65)}` : '1px solid transparent',
                                        transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                                        animation: animatedIn ? 'taskReveal .45s ease both' : 'none',
                                        animationDelay: `${index * 55}ms`,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: (theme) => theme.shadows[6],
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                            <Stack spacing={0.5}>
                                                <Typography fontWeight={700}>{task.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">{task.description || 'No description'}</Typography>
                                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                    <Chip size="small" label={task.priority} variant="outlined" />
                                                    <Chip size="small" label={task.status} color={task.status === STATUS_COMPLETED ? 'success' : 'default'} />
                                                    <Chip size="small" label={task.project?.title ?? 'Project'} />
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" spacing={0.5}>
                                                <IconButton onClick={(event) => { event.stopPropagation(); toggleTask(task.id) }}>
                                                    {task.status === STATUS_COMPLETED ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
                                                </IconButton>
                                                <Button size="small" onClick={(event) => { event.stopPropagation(); setEditTask(task) }} sx={{ textTransform: 'none' }}>Edit</Button>
                                                <IconButton color="error" onClick={(event) => { event.stopPropagation(); setConfirmDeleteTask(task) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

                        {tasks?.last_page > 1 && (
                            <Stack direction="row" spacing={1} justifyContent="center">
                                <Button component={Link} href={tasks.prev_page_url ?? '#'} disabled={!tasks.prev_page_url}>Previous</Button>
                                <Chip label={`Page ${tasks.current_page} of ${tasks.last_page}`} />
                                <Button component={Link} href={tasks.next_page_url ?? '#'} disabled={!tasks.next_page_url}>Next</Button>
                            </Stack>
                        )}
                        </Stack>
                        <CreditsBadge />
                    </Box>
                </Container>
                <PhoneDock active="tasks" />
            </Box>

            {editTask && (
                <Card sx={{ position: 'fixed', bottom: 16, right: 16, width: { xs: 'calc(100% - 32px)', sm: 420 }, zIndex: 1300 }}>
                    <CardContent>
                        <Typography fontWeight={700} mb={1}>Edit Task</Typography>
                        <Stack spacing={1.5}>
                            <TextField size="small" label="Title" value={editTask.title} onChange={(event) => setEditTask((prev) => ({ ...prev, title: event.target.value }))} />
                            <TextField size="small" label="Description" value={editTask.description ?? ''} onChange={(event) => setEditTask((prev) => ({ ...prev, description: event.target.value }))} multiline minRows={2} />
                            <FormControl size="small">
                                <InputLabel id="edit_priority_label">Priority</InputLabel>
                                <Select labelId="edit_priority_label" label="Priority" value={editTask.priority} onChange={(event) => setEditTask((prev) => ({ ...prev, priority: event.target.value }))}>
                                    {PRIORITY_OPTIONS.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size="small">
                                <InputLabel id="edit_status_label">Status</InputLabel>
                                <Select labelId="edit_status_label" label="Status" value={editTask.status} onChange={(event) => setEditTask((prev) => ({ ...prev, status: event.target.value }))}>
                                    <MenuItem value={STATUS_PENDING}>pending</MenuItem>
                                    <MenuItem value={STATUS_COMPLETED}>completed</MenuItem>
                                </Select>
                            </FormControl>
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button onClick={() => setEditTask(null)}>No</Button>
                                <Button variant="contained" onClick={updateTask}>Yes, save</Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            <Dialog open={Boolean(confirmDeleteTask)} onClose={() => setConfirmDeleteTask(null)}>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>
                    <Typography color="text.secondary">
                        Delete "{confirmDeleteTask?.title}" permanently?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteTask(null)}>No</Button>
                    <Button color="error" variant="contained" onClick={deleteTask}>Yes, delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmBulkComplete} onClose={() => setConfirmBulkComplete(false)}>
                <DialogTitle>Complete Visible Tasks</DialogTitle>
                <DialogContent>
                    <Typography color="text.secondary">
                        Mark {pendingVisibleIds.length} visible pending task(s) as completed?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmBulkComplete(false)}>No</Button>
                    <Button color="success" variant="contained" onClick={bulkCompleteVisible}>Yes</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmBulkDelete} onClose={() => setConfirmBulkDelete(false)}>
                <DialogTitle>Delete Completed Tasks</DialogTitle>
                <DialogContent>
                    <Typography color="text.secondary">
                        Delete {completedVisibleIds.length} completed visible task(s)?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmBulkDelete(false)}>No</Button>
                    <Button color="error" variant="contained" onClick={bulkDeleteCompleted}>Yes, delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </>
    )
}
