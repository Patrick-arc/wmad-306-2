import React, { useState, useRef } from 'react';
import Pagination from '@mui/material/Pagination';
import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
                                                <Chip
                                                    label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: getPriorityColor(task.priority),
                                                        color: '#181513',
                                                        fontWeight: 700,
                                                        fontSize: '0.68rem',
                                                        height: '17px',
                                                        minWidth: 36,
                                                        borderRadius: '8px',
                                                        px: 0,
                                                        display: 'inline-flex',
                                                        justifyContent: 'center',
                                                        '.MuiChip-label': { px: 0, py: 0, width: '100%', textAlign: 'center', lineHeight: 1.2 },
                                                    }}
                                                />
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TaskIcon from '@mui/icons-material/Task';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AssignmentIcon from '@mui/icons-material/Assignment';

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high':
            return '#d9534f'; // muted red
        case 'medium':
            return '#e1c542'; // muted yellow
        case 'low':
            return '#5cb85c'; // muted green
        default:
            return '#bfa76a'; // muted brown
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'done':
            return <CheckCircleIcon sx={{ fontSize: '1.2rem', color: '#90EE90' }} />;
        case 'in_progress':
            return <HourglassTopIcon sx={{ fontSize: '1.2rem', color: '#FFD700' }} />;
        default:
            return <AssignmentIcon sx={{ fontSize: '1.2rem', color: '#87CEEB' }} />;
    }
};

const statusLabels = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
};

export default function Index() {
    const { tasks, projects } = usePage().props;
    const [form, setForm] = useState({ project_id: '', title: '', description: '', priority: 'medium', status: 'todo' });
    const [editing, setEditing] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const formRef = useRef(null);
    // Column filter and pagination state
    const [column, setColumn] = useState('todo');
    const [page, setPage] = useState(1);
    const tasksPerPage = 5;

    function submit(e) {
        e.preventDefault();

        if (editing) {
            router.put(route('tasks.update', editing.id), form, {
                onSuccess: () => {
                    setEditing(null);
                    setFormOpen(false);
                },
            });
        } else {
            router.post(route('tasks.store'), form, {
                onSuccess: () => {
                    setForm({ project_id: '', title: '', description: '', priority: 'medium', status: 'todo' });
                    setFormOpen(false);
                },
            });
        }
    }

    function startEdit(t) {
        setEditing(t);
        setForm({ project_id: t.project_id, title: t.title, description: t.description || '', priority: t.priority, status: t.status });
        setFormOpen(true);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    }

    function destroy(t) {
        if (!confirm('Delete this task?')) return;
        router.delete(route('tasks.destroy', t.id));
    }

    // Group tasks by status
    const tasksByStatus = {
        todo: tasks?.filter(t => t.status === 'todo') || [],
        in_progress: tasks?.filter(t => t.status === 'in_progress') || [],
        done: tasks?.filter(t => t.status === 'done') || [],
    };

    // Helper to paginate tasks for selected column
    const paginatedTasks = (arr) => {
        const start = (page - 1) * tasksPerPage;
        return arr.slice(start, start + tasksPerPage);
    };

    // Only show one column at a time
    const statusOptions = [
        { key: 'todo', label: 'To Do', color: '#87CEEB', icon: <AssignmentIcon /> },
        { key: 'in_progress', label: 'In Progress', color: '#FFD700', icon: <HourglassTopIcon /> },
        { key: 'done', label: 'Done', color: '#90EE90', icon: <CheckCircleIcon /> },
    ];
    const currentTasks = tasksByStatus[column];
    const pageCount = Math.ceil(currentTasks.length / tasksPerPage) || 1;

    return (
        <AuthenticatedLayout>
            <Head title="Tasks" />

            <Box sx={{ mb: 4 }}>
                {/* Section Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#bfa76a',
                            fontWeight: 800,
                            fontSize: { xs: '1.5rem', md: '2rem' },
                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                            mb: 1,
                        }}
                    >
                        Your Tasks
                    </Typography>
                    <Box
                        sx={{
                            height: '3px',
                            width: '60px',
                            background: 'linear-gradient(90deg, #bfa76a 0%, #d6c491 100%)',
                            borderRadius: '2px',
                        }}
                    />
                </Box>

                {/* Create Form */}
                <Collapse in={formOpen} sx={{ mb: 3 }}>
                    <Card
                        sx={{
                            backgroundColor: '#232323',
                            border: '2px solid #bfa76a',
                            boxShadow: '0 8px 32px rgba(191,167,106,0.13)',
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ color: '#F5DEB3', fontWeight: 700, mb: 3 }}
                            >
                                {editing ? '✏️ Edit Task' : '➕ Create New Task'}
                            </Typography>
                            <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2.5 }}>
                                <FormControl fullWidth required>
                                    <InputLabel sx={{ color: '#DEB887' }}>Project</InputLabel>
                                    <Select
                                        label="Project"
                                        value={form.project_id}
                                        onChange={(e) => setForm((s) => ({ ...s, project_id: e.target.value }))}
                                        sx={{
                                            backgroundColor: 'rgba(212, 175, 123, 0.05)',
                                            color: '#F5DEB3',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 123, 0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 123, 0.5)' },
                                            '& .MuiSvgIcon-root': { color: '#DEB887' },
                                        }}
                                    >
                                        <MenuItem value="">Select a project</MenuItem>
                                        {projects?.map((p) => (
                                            <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Task Title"
                                    value={form.title}
                                    onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                                    required
                                    placeholder="Enter task name"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'rgba(212, 175, 123, 0.05)',
                                            color: '#F5DEB3',
                                            '& fieldset': { borderColor: 'rgba(212, 175, 123, 0.3)' },
                                            '&:hover fieldset': { borderColor: 'rgba(212, 175, 123, 0.5)' },
                                        },
                                        '& .MuiInputBase-input::placeholder': { color: '#BDB76B', opacity: 0.7 },
                                        '& .MuiInputLabel-root': { color: '#DEB887' },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={form.description}
                                    onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                                    multiline
                                    rows={3}
                                    placeholder="Describe your task..."
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'rgba(212, 175, 123, 0.05)',
                                            color: '#F5DEB3',
                                            '& fieldset': { borderColor: 'rgba(212, 175, 123, 0.3)' },
                                            '&:hover fieldset': { borderColor: 'rgba(212, 175, 123, 0.5)' },
                                        },
                                        '& .MuiInputBase-input::placeholder': { color: '#BDB76B', opacity: 0.7 },
                                        '& .MuiInputLabel-root': { color: '#DEB887' },
                                    }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{ color: '#DEB887' }}>Priority</InputLabel>
                                            <Select
                                                label="Priority"
                                                value={form.priority}
                                                onChange={(e) => setForm((s) => ({ ...s, priority: e.target.value }))}
                                                sx={{
                                                    backgroundColor: 'rgba(212, 175, 123, 0.05)',
                                                    color: '#F5DEB3',
                                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 123, 0.3)' },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 123, 0.5)' },
                                                    '& .MuiSvgIcon-root': { color: '#DEB887' },
                                                }}
                                            >
                                                <MenuItem value="low">Low</MenuItem>
                                                <MenuItem value="medium">Medium</MenuItem>
                                                <MenuItem value="high">High</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{ color: '#DEB887' }}>Status</InputLabel>
                                            <Select
                                                label="Status"
                                                value={form.status}
                                                onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
                                                sx={{
                                                    backgroundColor: 'rgba(212, 175, 123, 0.05)',
                                                    color: '#F5DEB3',
                                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 123, 0.3)' },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 123, 0.5)' },
                                                    '& .MuiSvgIcon-root': { color: '#DEB887' },
                                                }}
                                            >
                                                <MenuItem value="todo">To Do</MenuItem>
                                                <MenuItem value="in_progress">In Progress</MenuItem>
                                                <MenuItem value="done">Done</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                    {editing && (
                                        <Button
                                            onClick={() => {
                                                setEditing(null);
                                                setFormOpen(false);
                                                setForm({ project_id: '', title: '', description: '', priority: 'medium', status: 'todo' });
                                            }}
                                            sx={{
                                                color: '#DEB887',
                                                '&:hover': { backgroundColor: 'rgba(212, 175, 123, 0.1)' },
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            background: 'linear-gradient(135deg, #D2691E 0%, #CD853F 100%)',
                                            color: '#F5DEB3',
                                            fontWeight: 600,
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #CD853F 0%, #D2691E 100%)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        {editing ? 'Update' : 'Create'}
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Collapse>

                {/* Tasks Grid by Status */}
                {tasks?.length > 0 ? (
                    <>
                        {/* Column Filter Tabs */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Tabs
                                value={column}
                                onChange={(_, value) => { setColumn(value); setPage(1); }}
                                textColor="primary"
                                indicatorColor="primary"
                                centered
                            >
                                {statusOptions.map((opt) => (
                                    <Tab
                                        key={opt.key}
                                        value={opt.key}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {opt.icon}
                                                <span>{opt.label} ({tasksByStatus[opt.key].length})</span>
                                            </Box>
                                        }
                                        sx={{ color: column === opt.key ? opt.color : '#DEB887', fontWeight: 700 }}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        {/* Only show one column at a time */}
                        <TableContainer component={Paper} sx={{ background: '#232323', borderRadius: 2, boxShadow: 4, mt: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#bfa76a', fontWeight: 700 }}>Title</TableCell>
                                        <TableCell sx={{ color: '#bfa76a', fontWeight: 700 }}>Project</TableCell>
                                        <TableCell sx={{ color: '#bfa76a', fontWeight: 700 }}>Description</TableCell>
                                        <TableCell sx={{ color: '#bfa76a', fontWeight: 700 }}>Priority</TableCell>
                                        <TableCell sx={{ color: '#bfa76a', fontWeight: 700 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedTasks(currentTasks).map((task) => (
                                        <TableRow key={task.id} hover sx={{ background: '#232323' }}>
                                            <TableCell sx={{ color: '#F5DEB3', fontWeight: 700 }}>{task.title}</TableCell>
                                            <TableCell sx={{ color: '#BDB76B', fontSize: '0.95rem' }}>{projects?.find((p) => p.id === task.project_id)?.title || 'Unknown Project'}</TableCell>
                                            <TableCell sx={{ color: '#BDB76B', fontSize: '0.9rem', maxWidth: 220, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>{task.description}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: getPriorityColor(task.priority),
                                                        color: '#181513',
                                                        fontWeight: 700,
                                                        fontSize: '0.8rem',
                                                        height: '22px',
                                                        minWidth: 72,
                                                        borderRadius: '8px',
                                                        px: 0,
                                                        display: 'inline-flex',
                                                        justifyContent: 'center',
                                                        '.MuiChip-label': { px: 0, py: 0, width: '100%', textAlign: 'center', lineHeight: 1.2 },
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => startEdit(task)} sx={{ color: '#DEB887', backgroundColor: 'rgba(212, 175, 123, 0.1)', mr: 1 }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" onClick={() => destroy(task)} sx={{ color: '#FF6B6B', backgroundColor: 'rgba(255, 107, 107, 0.1)' }}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* Pagination Slider */}
                        {pageCount > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination
                                    count={pageCount}
                                    page={page}
                                    onChange={(_, value) => setPage(value)}
                                    color="primary"
                                    shape="rounded"
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 6,
                            px: 3,
                            backgroundColor: 'rgba(212, 175, 123, 0.05)',
                            borderRadius: '12px',
                            border: '2px dashed rgba(212, 175, 123, 0.3)',
                        }}
                    >
                        <TaskIcon sx={{ fontSize: '3rem', color: '#D2691E', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: '#DEB887', mb: 1.5, fontWeight: 600 }}>
                            No tasks yet
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#BDB76B', mb: 3 }}>
                            Create your first task to start organizing your work
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setFormOpen(true)}
                            sx={{
                                background: '#bfa76a',
                                color: '#181513',
                                fontWeight: 600,
                                borderRadius: '50px',
                                padding: '12px 24px',
                                boxShadow: '0 8px 24px rgba(191,167,106,0.13)',
                                '&:hover': {
                                    background: '#d6c491',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 32px rgba(191,167,106,0.18)',
                                },
                            }}
                        >
                            Create First Task
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Floating Action Button */}
            {!formOpen && tasks?.length > 0 && (
                <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setFormOpen(true);
                            setEditing(null);
                            setForm({ project_id: '', title: '', description: '', priority: 'medium', status: 'todo' });
                        }}
                        sx={{
                            background: '#bfa76a',
                            color: '#181513',
                            fontWeight: 600,
                            borderRadius: '50px',
                            minWidth: 140,
                            maxWidth: 160,
                            padding: '10px 18px',
                            boxShadow: '0 8px 24px rgba(191,167,106,0.13)',
                            '&:hover': {
                                background: '#d6c491',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 32px rgba(191,167,106,0.18)',
                            },
                        }}
                    >
                        New Task
                    </Button>
                </Box>
            )}
        </AuthenticatedLayout>
    );
}

