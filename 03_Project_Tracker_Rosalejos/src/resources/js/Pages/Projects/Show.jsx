import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Box,
    Stack,
    Button,
    IconButton,
    Paper,
    Divider,
    Chip,
    Breadcrumbs,
    Typography,
    Tabs,
    Tab,
    ToggleButton,
    ToggleButtonGroup,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import BoardColumn from '@/Components/Project/BoardColumn';
import TaskCard from '@/Components/Project/TaskCard';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import StatusChip from '@/Components/UI/StatusChip';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

function formatDateRange(start, end) {
    if (!start && !end) return '-';
    try {
        const s = start ? new Date(start).toLocaleDateString() : '';
        const e = end ? new Date(end).toLocaleDateString() : '';
        return s && e ? `${s} - ${e}` : s || e || '-';
    } catch (e) {
        return '-';
    }
}

export default function Show({ project }) {
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const [projectModalMode, setProjectModalMode] = useState('view');
    const [projectLoading, setProjectLoading] = useState(false);
    const [currentProject, setCurrentProject] = useState(project);
    const [projectForm, setProjectForm] = useState({ title: project.title || '', description: project.description || '' });

    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [taskLoading, setTaskLoading] = useState(false);
    const [taskForm, setTaskForm] = useState({ title: '', description: '', priority: 'low', status: 'todo' });
    const tabs = ['List'];

    const [category, setCategory] = useState('todo');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterVisible, setFilterVisible] = React.useState(false);
    const [filterStatus, setFilterStatus] = React.useState('all');
    const [filterPriority, setFilterPriority] = React.useState('all');

    const filteredTasks = (currentProject.tasks || []).filter((t) => {
        const q = searchQuery.trim().toLowerCase();
        const matchesQuery = !q || (t.title && t.title.toLowerCase().includes(q)) || (t.description && t.description.toLowerCase().includes(q));
        const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
        return matchesQuery && matchesStatus && matchesPriority;
    });

    const grouped = filteredTasks.reduce((acc, t) => {
        acc[t.status] = acc[t.status] || [];
        acc[t.status].push(t);
        return acc;
    }, {});

    const statusOrder = ['todo', 'in_progress', 'done'];

    const openProjectModal = async (mode) => {
        setProjectModalMode(mode);
        setProjectLoading(true);
        setProjectModalOpen(true);

        try {
            const url = route('projects.data', currentProject.id);
            const res = await axios.get(url);
            setCurrentProject(res.data);
            setProjectForm({ title: res.data.title || '', description: res.data.description || '' });
        } catch (e) {
            console.error(e);
        } finally {
            setProjectLoading(false);
        }
    };

    const closeProjectModal = () => {
        setProjectModalOpen(false);
    };

    const saveProject = async () => {
        setProjectLoading(true);
        try {
            const url = route('projects.update', currentProject.id);
            const res = await axios.put(url, projectForm);
            if (res.data?.project) {
                setCurrentProject(res.data.project);
            }
            setProjectModalOpen(false);
        } catch (e) {
            console.error(e);
        } finally {
            setProjectLoading(false);
        }
    };

    const openTaskModal = (defaults = {}) => {
        setTaskForm((f) => ({ ...f, ...defaults }));
        setTaskModalOpen(true);
    };

    const deleteTask = async (task) => {
        if (!task || !confirm('Delete this task?')) return;
        try {
            const url = route('projects.tasks.destroy', [currentProject.id, task.id]);
            await axios.delete(url);
            const updated = { ...currentProject };
            updated.tasks = (updated.tasks || []).filter((t) => t.id !== task.id);
            setCurrentProject(updated);
        } catch (e) {
            console.error(e);
        }
    };

    const startTask = async (task) => {
        if (!task) return;
        // optimistic update: set the task's status to 'in_progress' within the existing tasks array
        let originalTasks = [];
        const originalFilter = filterStatus;

            setCurrentProject((prev) => {
                originalTasks = prev.tasks ? [...prev.tasks] : [];
                // remove any existing occurrences of this task (loose id compare) then put the moved task at front
                const remaining = (prev.tasks || []).filter((t) => String(t.id) !== String(task.id));
                const moved = [{ ...task, status: 'in_progress' }, ...remaining];
                console.debug && console.debug('optimistic tasks after start (moved-first):', moved.map((x) => ({ id: x.id, status: x.status })));
                return { ...prev, tasks: moved };
            });

        // ensure the in_progress column is visible
        if (filterStatus !== 'all') setFilterStatus('all');
        setCategory('in_progress');

        try {
            console.debug && console.debug('startTask: filterStatus before axios:', filterStatus, 'category before axios:', category);
            const url = route('tasks.update', task.id);
                const payload = {
                    title: task.title || '',
                    description: task.description || null,
                    priority: task.priority || 'medium',
                    status: 'in_progress',
                };
                await axios.put(url, payload);
            console.debug && console.debug('startTask: axios update success for', task.id);
        } catch (e) {
                console.error('startTask error', e.response?.status, e.response?.data || e.message || e);
            // revert optimistic update on error
            setCurrentProject((prev) => ({ ...prev, tasks: originalTasks }));
            setFilterStatus(originalFilter);
        }
    };

    const markDone = async (task) => {
        if (!task) return;
        let originalTasks = [];
        const originalFilter = filterStatus;

        setCurrentProject((prev) => {
            originalTasks = prev.tasks ? [...prev.tasks] : [];
            const remaining = (prev.tasks || []).filter((t) => String(t.id) !== String(task.id));
            const moved = [{ ...task, status: 'done' }, ...remaining];
            console.debug && console.debug('optimistic tasks after markDone (moved-first):', moved.map((x) => ({ id: x.id, status: x.status })));
            return { ...prev, tasks: moved };
        });

        // ensure done column is visible
        setFilterStatus('all');
        setCategory('done');

        try {
            const url = route('tasks.update', task.id);
            const payload = {
                title: task.title || '',
                description: task.description || null,
                priority: task.priority || 'medium',
                status: 'done',
            };
            await axios.put(url, payload);
            console.debug && console.debug('markDone: axios update success for', task.id);
            
            // reload to refresh project/status counts across pages (dashboard/projects)
            Inertia.reload({ preserveState: false });
        } catch (e) {
            console.error('markDone error', e.response?.status, e.response?.data || e.message || e);
            setCurrentProject((prev) => ({ ...prev, tasks: originalTasks }));
            setFilterStatus(originalFilter);
        }
    };

    // refs to the column containers so we can scroll to them when category changes
    const columnRefs = useRef({});

    useEffect(() => {
        const el = columnRefs.current[category];
        if (el && typeof el.scrollIntoView === 'function') {
            // small timeout to allow layout to update after optimistic move
            setTimeout(() => {
                try {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
                } catch (e) {
                    // ignore
                }
            }, 120);
        }
    }, [category]);

    const closeTaskModal = () => setTaskModalOpen(false);

    const saveTask = async () => {
        setTaskLoading(true);
        try {
            const url = route('projects.tasks.store', currentProject.id);
            const res = await axios.post(url, taskForm);
            // If created successfully, add to current tasks locally
            if (res.data?.task) {
                const updated = { ...currentProject };
                updated.tasks = updated.tasks ? [res.data.task, ...updated.tasks] : [res.data.task];
                setCurrentProject(updated);
            }
            setTaskModalOpen(false);
        } catch (e) {
            console.error(e);
        } finally {
            setTaskLoading(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={project.title} />

            <Box sx={{ px: 2, py: 3 }}>
                <Box
                    sx={{
                        mb: 0,
                        p: { xs: 3, sm: 5 },
                        borderRadius: '8px 8px 0 0',
                        color: 'text.primary',
                        minHeight: { xs: 120, sm: 150 },
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url('/build/images/overlay.png')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        boxShadow: 'none',
                        overflow: 'hidden'
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link href={route('projects.index')}>My Pages</Link>
                                <Typography color="text.primary">{project.title}</Typography>
                            </Breadcrumbs>
                            <Typography variant="h5" sx={{ mt: 1 }}>{project.title}</Typography>
                            <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>{project.description}</Typography>
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <PrimaryButton onClick={() => openProjectModal('edit')}>Edit Project</PrimaryButton>
                            <PrimaryButton onClick={() => openTaskModal()} sx={{ ml: 1 }}>+ New Task</PrimaryButton>
                        </Stack>
                    </Stack>
                </Box>

                <Paper sx={{ mt: -2, mb: 3, p: 2, borderRadius: '0 0 8px 8px' }} elevation={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Tabs value={0} aria-label="views">
                                {tabs.map((t) => (
                                    <Tab key={t} label={t} />
                                ))}
                            </Tabs>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <TextField
                                placeholder="Search..."
                                size="small"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ minWidth: 240 }}
                            />
                            <Button variant="outlined" onClick={() => setFilterVisible((v) => !v)}>Filter</Button>
                        </Stack>
                    </Stack>
                </Paper>

                {filterVisible && (
                    <Paper sx={{ mb: 3, p: 2 }} elevation={0}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                            <FormControl size="small" sx={{ minWidth: 160 }}>
                                <InputLabel>Status</InputLabel>
                                <Select value={filterStatus} label="Status" onChange={(e) => setFilterStatus(e.target.value)}>
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="todo">To-do</MenuItem>
                                    <MenuItem value="in_progress">In Progress</MenuItem>
                                    <MenuItem value="done">Done</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ minWidth: 160 }}>
                                <InputLabel>Priority</InputLabel>
                                <Select value={filterPriority} label="Priority" onChange={(e) => setFilterPriority(e.target.value)}>
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </Select>
                            </FormControl>

                            <Button onClick={() => { setSearchQuery(''); setFilterStatus('all'); setFilterPriority('all'); setFilterVisible(false); }}>Clear</Button>
                        </Stack>
                    </Paper>
                )}

                    {((currentProject?.tasks || []).length > 0) ? (
                        <>
                            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                                <ToggleButtonGroup
                                    value={category}
                                    exclusive
                                    onChange={(e, v) => v && setCategory(v)}
                                    size="small"
                                    aria-label="task category"
                                    sx={{
                                        bgcolor: 'background.paper',
                                        borderRadius: 10,
                                        boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
                                        px: 0.5,
                                        overflow: 'hidden',
                                        border: '1px solid rgba(16,24,40,0.06)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        '& .MuiToggleButton-root': {
                                            border: 'none',
                                            borderRadius: 0,
                                            margin: 0,
                                            px: 1.25,
                                            py: 0.5,
                                            minWidth: 92,
                                            textTransform: 'none',
                                            fontSize: '0.9rem',
                                            color: 'text.secondary'
                                        },
                                        '& .MuiToggleButton-root.Mui-selected': {
                                            boxShadow: 'none',
                                            zIndex: 1,
                                            color: 'common.white',
                                            bgcolor: 'primary.main'
                                        },
                                        '& .MuiToggleButton-root:first-of-type': { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
                                        '& .MuiToggleButton-root:last-of-type': { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
                                    }}
                                >
                                    <ToggleButton value="todo" aria-label="todo">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '0.92rem' }}>To-do</Typography>
                                            <Chip label={grouped['todo']?.length || 0} size="small" sx={{ bgcolor: 'rgba(15,23,42,0.06)', height: 22, fontSize: '0.72rem' }} />
                                        </Box>
                                    </ToggleButton>

                                    <ToggleButton value="in_progress" aria-label="in-progress">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '0.92rem' }}>In Progress</Typography>
                                            <Chip label={grouped['in_progress']?.length || 0} size="small" sx={{ bgcolor: 'rgba(15,23,42,0.06)', height: 22, fontSize: '0.72rem' }} />
                                        </Box>
                                    </ToggleButton>

                                    <ToggleButton value="done" aria-label="done">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '0.92rem' }}>Done</Typography>
                                            <Chip label={grouped['done']?.length || 0} size="small" sx={{ bgcolor: 'rgba(15,23,42,0.06)', height: 22, fontSize: '0.72rem' }} />
                                        </Box>
                                    </ToggleButton>

                                </ToggleButtonGroup>
                            </Box>

                            <Grid container spacing={2} justifyContent="center">
                                {(() => {
                                    const visible = category === 'all' ? statusOrder : [category];
                                    return visible.map((statusKey) => {
                                        const tasks = grouped[statusKey] || [];
                                        const headerMap = {
                                            todo: 'To-do',
                                            in_progress: 'In Progress',
                                            done: 'Done',
                                        };
                                        const mdCols = visible.length === 1 ? 8 : 4;

                                        return (
                                            <Grid item xs={12} md={mdCols} key={statusKey} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Box ref={(el) => (columnRefs.current[statusKey] = el)} sx={{ width: (visible.length === 1 ? { xs: 360, md: 640 } : '100%'), maxWidth: (visible.length === 1 ? { xs: 360, md: 760 } : 1100) }}>
                                                                <BoardColumn
                                                                    title={headerMap[statusKey]}
                                                                    tasks={tasks}
                                                                    onAdd={() => openTaskModal({ status: statusKey })}
                                                                    onDelete={deleteTask}
                                                                    onStart={startTask}
                                                                    onDone={markDone}
                                                                />
                                                            </Box>
                                            </Grid>
                                        );
                                    });
                                })()}
                            </Grid>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Paper sx={{ p: 3, width: '100%', maxWidth: 760, textAlign: 'center', borderRadius: 3, border: '2px dashed rgba(124,98,255,0.34)' }} elevation={0}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>No tasks yet</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>This project has no tasks yet. Create your first task to get started.</Typography>
                                <PrimaryButton onClick={() => openTaskModal()} size="small">Create Task</PrimaryButton>
                            </Paper>
                        </Box>
                    )}
                    {/* Project modal */}
                    <Dialog open={projectModalOpen} onClose={closeProjectModal} maxWidth="sm" fullWidth>
                        <DialogTitle>{projectModalMode === 'view' ? 'Project Details' : 'Edit Project'}</DialogTitle>
                        <DialogContent dividers>
                            {projectLoading && <CircularProgress />}
                            {!projectLoading && currentProject && (
                                projectModalMode === 'view' ? (
                                    <div>
                                        <Typography variant="h6">{currentProject.title}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>{currentProject.description}</Typography>
                                    </div>
                                ) : (
                                    <div>
                                        <TextField label="Title" fullWidth value={projectForm.title} onChange={(e) => setProjectForm((s) => ({ ...s, title: e.target.value }))} sx={{ mb: 2 }} />
                                        <TextField label="Description" fullWidth multiline rows={4} value={projectForm.description} onChange={(e) => setProjectForm((s) => ({ ...s, description: e.target.value }))} />
                                    </div>
                                )
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeProjectModal} color="secondary">Close</Button>
                            {projectModalMode === 'edit' && (
                                <PrimaryButton onClick={saveProject} disabled={projectLoading}>{projectLoading ? 'Saving…' : 'Save'}</PrimaryButton>
                            )}
                        </DialogActions>
                    </Dialog>

                    {/* Task modal */}
                    <Dialog open={taskModalOpen} onClose={closeTaskModal} maxWidth="sm" fullWidth>
                        <DialogTitle>New Task</DialogTitle>
                        <DialogContent dividers>
                            {taskLoading && <CircularProgress />}
                            {!taskLoading && (
                                <div>
                                    <TextField label="Title" fullWidth value={taskForm.title} onChange={(e) => setTaskForm((s) => ({ ...s, title: e.target.value }))} sx={{ mb: 2 }} />
                                    <TextField label="Description" fullWidth multiline rows={3} value={taskForm.description} onChange={(e) => setTaskForm((s) => ({ ...s, description: e.target.value }))} sx={{ mb: 2 }} />
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="task-priority-label">Priority</InputLabel>
                                        <Select
                                            labelId="task-priority-label"
                                            label="Priority"
                                            value={taskForm.priority}
                                            onChange={(e) => setTaskForm((s) => ({ ...s, priority: e.target.value }))}
                                        >
                                            <MenuItem value="low">Low</MenuItem>
                                            <MenuItem value="medium">Medium</MenuItem>
                                            <MenuItem value="high">High</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeTaskModal} color="secondary">Cancel</Button>
                            <PrimaryButton onClick={saveTask} disabled={taskLoading}>{taskLoading ? 'Saving…' : 'Create'}</PrimaryButton>
                        </DialogActions>
                    </Dialog>
            </Box>
        </AuthenticatedLayout>
    );
}
