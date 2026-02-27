import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
    Typography, Grid, Container, Box, Button, Paper, Stack, 
    Dialog, DialogTitle, DialogContent, TextField, DialogActions, 
    Card, Chip, IconButton, Avatar
} from '@mui/material';
import { 
    Add as AddIcon, EditTwoTone as EditIcon, DeleteOutline as DeleteIcon, 
    CheckCircle as CheckCircleIcon, RadioButtonUnchecked as UncheckedIcon,
    Assignment as TaskIcon, PendingActions as PendingIcon, 
    CheckCircleTwoTone as DoneIcon, WarningAmberRounded as WarningIcon
} from '@mui/icons-material';

export default function Dashboard({ auth, projects = [] }) {
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const { data, setData, patch, post, reset, processing } = useForm({
        title: '',
        description: '',
        project_id: projects[0]?.id || '',
    });

    const allTasks = (projects || []).flatMap(p => 
        (p.tasks || []).map(t => ({ ...t, projectName: p.title || p.name }))
    );
    const pendingTasks = allTasks.filter(t => t.status === 'pending');
    const completedTasks = allTasks.filter(t => t.status === 'completed');

    const handleOpenAdd = () => { setEditingTask(null); reset(); setOpen(true); };
    const handleOpenEdit = (task) => {
        setEditingTask(task);
        setData({ title: task.title, description: task.description, project_id: task.project_id });
        setOpen(true);
    };
    const handleClose = () => { setOpen(false); reset(); };
    
    const submit = (e) => {
        e.preventDefault();
        const action = editingTask ? patch : post;
        const url = editingTask ? route('tasks.update', editingTask.id) : route('tasks.store');
        action(url, { onSuccess: () => handleClose() });
    };

    const handleDelete = () => {
        router.delete(route('tasks.destroy', taskToDelete), {
            onSuccess: () => { setDeleteDialogOpen(false); setTaskToDelete(null); },
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            
            <Box sx={{ 
                bgcolor: '#08090D', 
                height: 'calc(100vh - 64px)', 
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                overflow: 'hidden',
                p: 3
            }}>
                
                <Container maxWidth="lg" sx={{ 
                    height: '85%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 5
                }}>
                    
                    {/* CLEAN HEADER */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.05em' }}>
                            Dashboard
                        </Typography>
                        
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />} 
                            onClick={handleOpenAdd}
                            sx={{ 
                                borderRadius: 3, px: 4, py: 1.5,
                                bgcolor: '#7C3AED', fontWeight: 800, textTransform: 'none',
                                fontSize: '1rem',
                                boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
                                '&:hover': { bgcolor: '#6D28D9' }
                            }}
                        >
                            Create Task
                        </Button>
                    </Box>

                    {/* STATS */}
                    <Grid container spacing={3}>
                        <StatCard label="Total Tasks" value={allTasks.length} color="#6366F1" icon={<TaskIcon />} />
                        <StatCard label="In Progress" value={pendingTasks.length} color="#F59E0B" icon={<PendingIcon />} />
                        <StatCard label="Completed" value={completedTasks.length} color="#10B981" icon={<DoneIcon />} />
                    </Grid>

                    {/* TASK COLUMNS */}
                    <Grid container spacing={4} sx={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
                        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                            <TaskColumn title="Active Stream" color="#7C3AED">
                                {pendingTasks.map(task => (
                                    <TaskCard key={task.id} task={task} onEdit={handleOpenEdit} onDelete={(id) => { setTaskToDelete(id); setDeleteDialogOpen(true); }} />
                                ))}
                                {pendingTasks.length === 0 && <EmptyState text="All tasks cleared. Good job!" />}
                            </TaskColumn>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                            <TaskColumn title="Archived / Done" color="#10B981">
                                {completedTasks.map(task => (
                                    <TaskCard key={task.id} task={task} isCompleted onDelete={(id) => { setTaskToDelete(id); setDeleteDialogOpen(true); }} />
                                ))}
                                {completedTasks.length === 0 && <EmptyState text="No finished tasks yet." />}
                            </TaskColumn>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <TaskModal open={open} handleClose={handleClose} editingTask={editingTask} data={data} setData={setData} submit={submit} processing={processing} />
            <DeleteModal open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDelete={handleDelete} />
            
        </AuthenticatedLayout>
    );
}

// --- COMPONENTS ---

function TaskColumn({ title, color, children }) {
    return (
        <Paper elevation={0} sx={{ 
            p: 4, borderRadius: 8, bgcolor: '#111827', 
            border: '1px solid #1F2937',
            height: '100%', display: 'flex', flexDirection: 'column'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box sx={{ width: 6, height: 24, bgcolor: color, borderRadius: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#F9FAFB' }}>{title}</Typography>
            </Box>
            <Stack spacing={2.5} sx={{ 
                overflowY: 'auto', flex: 1, pr: 1,
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#374151', borderRadius: '10px' }
            }}>
                {children}
            </Stack>
        </Paper>
    );
}

function StatCard({ label, value, color, icon }) {
    return (
        <Grid item xs={4}>
            <Box sx={{ 
                p: 3, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 3,
                bgcolor: '#111827', border: '1px solid #1F2937'
            }}>
                <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 56, height: 56, borderRadius: '18px' }}>{icon}</Avatar>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>{value}</Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</Typography>
                </Box>
            </Box>
        </Grid>
    );
}

function TaskCard({ task, onEdit, onDelete, isCompleted = false }) {
    const handleToggle = () => router.post(route('tasks.toggle', task.id));
    return (
        <Card elevation={0} sx={{ 
            p: 2.5, borderRadius: 5, 
            bgcolor: isCompleted ? 'rgba(31, 41, 55, 0.4)' : '#1F2937', 
            border: '1px solid #374151',
            '&:hover': { borderColor: isCompleted ? '#374151' : '#7C3AED', transform: 'translateY(-2px)' },
            transition: '0.2s'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton size="small" onClick={handleToggle} sx={{ color: isCompleted ? '#10B981' : '#4B5563' }}>
                        {isCompleted ? <CheckCircleIcon fontSize="large" /> : <UncheckedIcon fontSize="large" />}
                    </IconButton>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: isCompleted ? '#6B7280' : '#F3F4F6', textDecoration: isCompleted ? 'line-through' : 'none', fontSize: '1rem' }}>
                            {task.title}
                        </Typography>
                        <Chip label={task.projectName} size="small" sx={{ height: 20, fontSize: '0.65rem', mt: 0.5, bgcolor: '#111827', color: '#818CF8', fontWeight: 700, border: '1px solid #1F2937' }} />
                    </Box>
                </Stack>
                <Stack direction="row">
                    {!isCompleted && <IconButton size="small" onClick={() => onEdit(task)} sx={{ color: '#7C3AED' }}><EditIcon fontSize="small" /></IconButton>}
                    <IconButton size="small" onClick={() => onDelete(task.id)} sx={{ color: '#EF4444' }}><DeleteIcon fontSize="small" /></IconButton>
                </Stack>
            </Box>
        </Card>
    );
}

function EmptyState({ text }) {
    return (
        <Box sx={{ py: 8, textAlign: 'center', border: '2px dashed #1F2937', borderRadius: 8 }}>
            <Typography sx={{ color: '#4B5563', fontWeight: 700 }}>{text}</Typography>
        </Box>
    );
}

// Modals remain the same logic but with Dark Theme
function TaskModal({ open, handleClose, editingTask, data, setData, submit, processing }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 8, bgcolor: '#111827', border: '1px solid #374151', color: '#FFF' } }}>
            <form onSubmit={submit}>
                <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem', p: 4 }}>{editingTask ? 'Edit Task' : 'New Task'}</DialogTitle>
                <DialogContent sx={{ px: 4 }}>
                    <Stack spacing={3}>
                        <TextField 
                            label="Task Title" fullWidth value={data.title} onChange={e => setData('title', e.target.value)} required 
                            variant="filled" sx={{ bgcolor: '#1F2937', borderRadius: 3, input: { color: '#FFF' }, label: { color: '#9CA3AF' } }}
                        />
                        <TextField 
                            label="Details" fullWidth multiline rows={2} value={data.description} onChange={e => setData('description', e.target.value)} 
                            variant="filled" sx={{ bgcolor: '#1F2937', borderRadius: 3, textarea: { color: '#FFF' }, label: { color: '#9CA3AF' } }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 4 }}>
                    <Button onClick={handleClose} sx={{ color: '#9CA3AF', fontWeight: 700 }}>Discard</Button>
                    <Button type="submit" variant="contained" disabled={processing} sx={{ borderRadius: 3, bgcolor: '#7C3AED', px: 4, fontWeight: 800 }}>Save Task</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

function DeleteModal({ open, setOpen, handleDelete }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { borderRadius: 8, bgcolor: '#111827', border: '1px solid #374151', color: '#FFF' } }}>
            <Box sx={{ p: 5, textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#450a0a', color: '#EF4444', mx: 'auto', mb: 3, width: 64, height: 64 }}><WarningIcon fontSize="large" /></Avatar>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Delete Task?</Typography>
                <Typography variant="body1" sx={{ color: '#6B7280', mt: 2, mb: 4 }}>This will permanently remove this entry.</Typography>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => setOpen(false)} fullWidth variant="outlined" sx={{ borderRadius: 3, color: '#9CA3AF', borderColor: '#374151' }}>No</Button>
                    <Button onClick={handleDelete} fullWidth variant="contained" color="error" sx={{ borderRadius: 3, fontWeight: 800 }}>Yes, Delete</Button>
                </Stack>
            </Box>
        </Dialog>
    );
}