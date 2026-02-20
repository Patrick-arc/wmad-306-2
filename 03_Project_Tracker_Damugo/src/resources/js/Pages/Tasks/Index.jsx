import React, { useState, useRef } from 'react';
import Pagination from '@mui/material/Pagination';
import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskIcon from '@mui/icons-material/Task';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high':
            return '#d9534f';
        case 'medium':
            return '#e1c542';
        case 'low':
            return '#5cb85c';
        default:
            return '#bfa76a';
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
    // Column filter and pagination state
    const [column, setColumn] = useState('todo');
    const [page, setPage] = useState(1);
    const tasksPerPage = 5;
    // Approx row height in px (used to reserve table space to avoid layout shift)
    const approxRowHeight = 86;

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
    const currentTasks = tasksByStatus[column];
    const pageCount = Math.ceil(currentTasks.length / tasksPerPage) || 1;
    // Items that will be rendered on the current page
    const displayedTasks = paginatedTasks(currentTasks);
    const [form, setForm] = useState({ project_id: '', title: '', description: '', priority: 'medium', status: 'todo' });
    const [editing, setEditing] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const formRef = useRef(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    function startEdit(t) {
        setEditing(t);
        setForm({
            project_id: t.project_id || '',
            title: t.title || '',
            description: t.description || '',
            priority: t.priority || 'medium',
            status: t.status || 'todo',
        });
        setFormOpen(true);
        setPage(1);
    }

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

    function destroy(t) {
        // open confirmation dialog instead of native confirm()
        setDeleteTarget(t);
        setDeleteOpen(true);
    }

    function confirmDelete() {
        if (!deleteTarget) return;
        router.delete(route('tasks.destroy', deleteTarget.id));
        setDeleteOpen(false);
        setDeleteTarget(null);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tasks" />
            <Box sx={{ mb: 4 }}>
                {/* Banner header to reduce white space and focus the section */}
                <Box sx={{
                    mb: 3,
                    borderRadius: 3,
                    px: { xs: 2, md: 4 },
                    py: { xs: 2.5, md: 3.5 },
                    position: 'relative',
                    isolation: 'isolate',
                    overflow: 'hidden',
                    background: 'linear-gradient(180deg, rgba(191,167,106,0.42) 0%, rgba(220,205,178,0.94) 48%, rgba(255,255,255,0.98) 100%)',
                    border: '1px solid rgba(191,167,106,0.12)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                }}>
                    <Box
                        component="img"
                        src="/images/cat.png"
                        alt="cat"
                        sx={{
                            position: 'absolute',
                            right: { xs: 6, md: -12 },
                            bottom: 0,
                            transform: 'translateY(6px)',
                            width: { xs: '34%', md: 300 },
                            height: 'auto',
                            opacity: 0.995,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))',
                            mixBlendMode: 'multiply',
                            backgroundColor: 'transparent',
                            display: 'block',
                            objectFit: 'contain',
                            maskImage: 'linear-gradient(to left, black 0%, black 85%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to left, black 0%, black 85%, transparent 100%)',
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#7a5c2e',
                            fontWeight: 900,
                            fontSize: { xs: '1.6rem', md: '2.1rem' },
                            textShadow: '0 4px 14px rgba(0,0,0,0.32)',
                            WebkitTextStroke: '0.4px rgba(0,0,0,0.12)',
                            mb: 1,
                            display: 'inline-block',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
                            px: 0.5,
                            py: 0,
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

                {/* Create / Edit Modal */}
                <Dialog
                    open={formOpen}
                    onClose={() => { setFormOpen(false); setEditing(null); }}
                    fullWidth
                    maxWidth="md"
                    PaperProps={{ sx: { background: '#161414', border: '1px solid rgba(191,167,106,0.12)', borderRadius: 2, boxShadow: '0 12px 40px rgba(0,0,0,0.6)' } }}
                >
                    <DialogTitle sx={{ position: 'relative', background: 'linear-gradient(90deg, rgba(191,167,106,0.08), transparent)', color: '#F5DEB3', display: 'flex', alignItems: 'center', gap: 1 }}>
                        {editing ? (
                            <>
                                <EditIcon sx={{ color: '#bfa76a' }} />
                                <Box component="span">Edit Task</Box>
                            </>
                        ) : (
                            <>
                                <AddIcon sx={{ color: '#bfa76a' }} />
                                <Box component="span">Create New Task</Box>
                            </>
                        )}
                        <IconButton
                            onClick={() => { setFormOpen(false); setEditing(null); }}
                            size="small"
                            sx={{ position: 'absolute', right: 8, top: 8, color: '#DEB887' }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers sx={{ backgroundColor: '#161414' }}>
                        <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2.5, mt: 1 }}>
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
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: '#161414',
                                                color: '#F5DEB3',
                                                border: '1px solid rgba(191,167,106,0.12)',
                                                '& .MuiMenuItem-root': {
                                                    backgroundColor: 'transparent',
                                                    color: '#F5DEB3',
                                                },
                                                '& .MuiMenuItem-root.Mui-selected': {
                                                    backgroundColor: 'rgba(191,167,106,0.22) !important',
                                                    color: '#181513 !important',
                                                },
                                                '& .MuiMenuItem-root.Mui-selected *': {
                                                    color: '#181513 !important',
                                                },
                                                '& .MuiMenuItem-root:hover': {
                                                    backgroundColor: 'rgba(191,167,106,0.12) !important',
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem
                                        value=""
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: '#F5DEB3',
                                            '&.Mui-selected': { backgroundColor: 'rgba(191,167,106,0.12)', color: '#181513' },
                                            '&:hover': { backgroundColor: 'rgba(191,167,106,0.08)' },
                                        }}
                                    >
                                        Select a project
                                    </MenuItem>
                                    {projects?.map((p) => (
                                        <MenuItem
                                            key={p.id}
                                            value={p.id}
                                            sx={{
                                                backgroundColor: 'transparent',
                                                color: '#F5DEB3',
                                                '&.Mui-selected': { backgroundColor: 'rgba(191,167,106,0.22) !important', color: '#181513 !important' },
                                                '&.Mui-selected *': { color: '#181513 !important' },
                                                '&:hover': { backgroundColor: 'rgba(191,167,106,0.12) !important' },
                                            }}
                                        >
                                            {p.title}
                                        </MenuItem>
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
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        backgroundColor: '#161414',
                                                        color: '#F5DEB3',
                                                        border: '1px solid rgba(191,167,106,0.12)',
                                                        '& .MuiMenuItem-root': { backgroundColor: 'transparent', color: '#F5DEB3' },
                                                        '& .MuiMenuItem-root.Mui-selected': { backgroundColor: 'rgba(191,167,106,0.14) !important', color: '#181513 !important' },
                                                        '& .MuiMenuItem-root:hover': { backgroundColor: 'rgba(191,167,106,0.08) !important' },
                                                    },
                                                },
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
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        backgroundColor: '#161414',
                                                        color: '#F5DEB3',
                                                        border: '1px solid rgba(191,167,106,0.12)',
                                                        '& .MuiMenuItem-root': { backgroundColor: 'transparent', color: '#F5DEB3' },
                                                        '& .MuiMenuItem-root.Mui-selected': { backgroundColor: 'rgba(191,167,106,0.14) !important', color: '#181513 !important' },
                                                        '& .MuiMenuItem-root:hover': { backgroundColor: 'rgba(191,167,106,0.08) !important' },
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value="todo">To Do</MenuItem>
                                            <MenuItem value="in_progress">In Progress</MenuItem>
                                            <MenuItem value="done">Done</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
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
                                        background: editing ? '#bfa76a' : 'linear-gradient(135deg, #bfa76a 0%, #d6c491 100%)',
                                        color: editing ? '#181513' : '#181513',
                                        fontWeight: 600,
                                        '&:hover': {
                                            background: editing ? '#d6c491' : '#d6c491',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    {editing ? 'Update' : 'Create'}
                                </Button>
                            </Box>
                        </Box>
                    </DialogContent>
                </Dialog>

                {/* Column Filter Tabs */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Tabs
                            value={column}
                            onChange={(_, val) => {
                                setColumn(val);
                                setPage(1);
                            }}
                            sx={{
                                '& .MuiTabs-flexContainer': { gap: 1 },
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    color: '#a88734',
                                    fontWeight: 800,
                                    minHeight: 40,
                                    px: 1.5,
                                },
                                '& .MuiTab-root.Mui-selected': {
                                    color: '#181513',
                                    backgroundColor: '#bfa76a',
                                    borderRadius: '999px',
                                    boxShadow: '0 8px 20px rgba(191,167,106,0.12)',
                                    transform: 'translateY(-2px)',
                                    '&:hover': { backgroundColor: '#d6c491' },
                                },
                                '& .MuiTabs-indicator': { display: 'none' },
                             }}
                            TabIndicatorProps={{ style: { display: 'none' } }}
                        >
                        <Tab value="todo" label={`To Do (${tasksByStatus.todo.length})`} />
                        <Tab value="in_progress" label={`In Progress (${tasksByStatus.in_progress.length})`} />
                        <Tab value="done" label={`Done (${tasksByStatus.done.length})`} />
                    </Tabs>
                </Box>
                {tasks?.length > 0 ? (
                    <>
                        {/* Table always rendered, only rows change */}
                        <TableContainer component={Paper} sx={{
                            background: '#161414',
                            borderRadius: 2,
                            boxShadow: 6,
                            mt: 2,
                            // Reserve vertical space so pagination changes don't collapse the area.
                            minHeight: `${tasksPerPage * approxRowHeight}px`,
                            transition: 'min-height 180ms ease',
                        }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Title</TableCell>
                                        <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Project</TableCell>
                                        <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Description</TableCell>
                                        <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Priority</TableCell>
                                        <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedTasks.map((task) => (
                                        <TableRow key={task.id} hover sx={{ '&:hover': { background: 'rgba(255,255,255,0.02)' } }}>
                                            <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>{task.title}</TableCell>
                                            <TableCell sx={{ color: '#DEB887', fontSize: '0.95rem' }}>{projects?.find((p) => p.id === task.project_id)?.title || 'Unknown Project'}</TableCell>
                                            <TableCell sx={{ color: '#d6c491', fontSize: '0.95rem', maxWidth: 220, pr: 1 }}>
                                                <Box sx={{
                                                    whiteSpace: 'pre-wrap',
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
                                                    maxHeight: 72,
                                                    overflowY: 'auto',
                                                    pr: 1,
                                                    '&::-webkit-scrollbar': { width: 8 },
                                                    '&::-webkit-scrollbar-thumb': { background: 'rgba(191,167,106,0.18)', borderRadius: 8 },
                                                }}>
                                                    {task.description}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: getPriorityColor(task.priority),
                                                        color: '#ffffff',
                                                        fontWeight: 700,
                                                        fontSize: '0.65rem',
                                                        height: '20px',
                                                        minWidth: 48,
                                                        borderRadius: '8px',
                                                        px: 0.5,
                                                        display: 'inline-flex',
                                                        justifyContent: 'center',
                                                        '.MuiChip-label': { px: 0.5, py: 0, width: '100%', textAlign: 'center', lineHeight: 1.1 },
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => startEdit(task)}
                                                    sx={{
                                                        color: '#DEB887',
                                                        backgroundColor: 'rgba(212, 175, 123, 0.08)',
                                                        mr: 1,
                                                        transition: 'transform 140ms ease, box-shadow 160ms ease, background-color 120ms ease',
                                                        '&:hover': { transform: 'translateY(-2px) scale(1.04)', backgroundColor: 'rgba(212,175,123,0.16)', boxShadow: '0 8px 20px rgba(191,167,106,0.12)' },
                                                        '&:active': { transform: 'translateY(0) scale(0.995)' },
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => { setDeleteTarget(task); setDeleteOpen(true); }}
                                                    sx={{
                                                        color: '#FF6B6B',
                                                        backgroundColor: 'rgba(255, 107, 107, 0.08)',
                                                        transition: 'transform 140ms ease, box-shadow 160ms ease, background-color 120ms ease',
                                                        '&:hover': { transform: 'translateY(-2px) scale(1.04)', backgroundColor: 'rgba(255,107,107,0.18)', boxShadow: '0 8px 20px rgba(255,107,107,0.08)' },
                                                        '&:active': { transform: 'translateY(0) scale(0.995)' },
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {/* Render empty placeholder rows so the table always shows tasksPerPage rows */}
                                    {Array.from({ length: Math.max(0, tasksPerPage - displayedTasks.length) }).map((_, i) => (
                                        <TableRow key={`empty-${i}`} sx={{ background: '#232323', height: `${approxRowHeight}px` }}>
                                            <TableCell colSpan={5} sx={{ height: `${approxRowHeight}px`, borderBottom: '1px solid rgba(191,167,106,0.06)' }} />
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
                                        sx={{
                                            '& .MuiPaginationItem-root': { color: '#a88734', fontWeight: 800 },
                                            '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#bfa76a', color: '#181513' },
                                            '& .MuiPaginationItem-root:hover': { backgroundColor: 'rgba(168,135,52,0.08)', color: '#a88734' },
                                        }}
                                    />
                            </Box>
                        )}

                        
                    </>
                ) : (
                    <Box
                        sx={{
                            position: 'relative',
                            textAlign: 'center',
                            py: 6,
                            px: 3,
                            backgroundColor: '#161414',
                            borderRadius: '12px',
                            border: '2px dashed rgba(191,167,106,0.12)',
                        }}
                    >
                        {/* back button removed from empty-state card - kept only in modal */}
                        <TaskIcon sx={{ fontSize: '3rem', color: '#bfa76a', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: '#DEB887', mb: 1.5, fontWeight: 600 }}>
                            No tasks yet
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#BDB76B', mb: 3 }}>
                            Create your first task to get started organizing your work
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setFormOpen(true)}
                            sx={{
                                background: 'linear-gradient(135deg, #bfa76a 0%, #d6c491 100%)',
                                color: '#181513',
                                fontWeight: 600,
                                '&:hover': {
                                    background: '#d6c491',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Create First Task
                        </Button>
                    </Box>
                )}

            </Box>
                {/* Global Floating Action Button (shows even when there are no tasks) */}
                {!formOpen && (
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

                {/* Delete confirmation modal */}
            <Dialog
                open={deleteOpen}
                onClose={() => { setDeleteOpen(false); setDeleteTarget(null); }}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: { background: 'transparent', boxShadow: 'none' } }}
            >
                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ mx: 2, my: 2, borderRadius: 2, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
                        <Box sx={{ height: 8, background: 'linear-gradient(90deg, rgba(191,167,106,1) 0%, rgba(214,196,145,0.6) 100%)' }} />
                        <Box sx={{ backgroundColor: '#161414', p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                                <DeleteForeverIcon sx={{ fontSize: 56, color: '#bfa76a', bgcolor: 'rgba(191,167,106,0.08)', borderRadius: '50%', p: 1, boxShadow: '0 8px 28px rgba(191,167,106,0.18)' }} />
                            </Box>
                            <Typography variant="h6" sx={{ color: '#bfa76a', fontWeight: 900, textAlign: 'center', mb: 1 }}>Delete Task</Typography>
                            <DialogContentText sx={{ color: '#DEB887', textAlign: 'center', mb: 2 }}>
                                Are you sure you want to permanently delete "{deleteTarget?.title || 'this task'}"? This action cannot be undone.
                            </DialogContentText>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button onClick={() => { setDeleteOpen(false); setDeleteTarget(null); }} sx={{ color: '#DEB887' }}>Cancel</Button>
                                <Button onClick={confirmDelete} variant="contained" sx={{ background: '#bfa76a', color: '#181513', fontWeight: 800, borderRadius: 28, boxShadow: '0 12px 36px rgba(191,167,106,0.22)', '&:hover': { background: '#d6c491', boxShadow: '0 18px 48px rgba(191,167,106,0.28)' }, minWidth: 110, py: 1 }}>Delete</Button>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}



