import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { Tabs, Tab } from '@mui/material';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';

export default function Index() {
    const { projects, tasksCount = 0 } = usePage().props;
    // normalize projects to an array (handles paginated or plain collections)
    const projectsArr = Array.isArray(projects) ? projects : (projects && projects.data ? projects.data : []);
    const [projectsList, setProjectsList] = useState(projectsArr || []);
    const [activeTab, setActiveTab] = useState('todo');
    const [page, setPage] = useState(1);
    const projectsPerPage = 6;
    const [contentVisible, setContentVisible] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [status, setStatus] = useState('todo');
    const [editing, setEditing] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('new') === '1') {
                setFormOpen(true);
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
        // keep local list in sync when server props change (normalize paginated responses)
        const newArr = Array.isArray(projects) ? projects : (projects && projects.data ? projects.data : []);
        setProjectsList(newArr || []);
    }, [projects]);

    function submit(e) {
        e.preventDefault();

        const data = { title, description, priority, status };

        if (editing) {
            router.put(route('projects.update', editing.id), data, {
                onSuccess: () => {
                    setEditing(null);
                    setTitle('');
                                            setDescription('');
                                            setPriority('medium');
                                            setStatus('todo');
                    setFormOpen(false);
                },
            });
        } else {
            router.post(route('projects.store'), data, {
                onSuccess: () => {
                    setTitle('');
                    setDescription('');
                    setPriority('medium');
                    setStatus('todo');
                    setFormOpen(false);
                },
            });
        }
    }

    function startEdit(p) {
        setEditing(p);
        setTitle(p.title);
        setDescription(p.description || '');
        setPriority(p.priority || 'medium');
        setStatus(p.status || 'todo');
        setFormOpen(true);
    }

    function destroy(p) {
        setDeleteTarget(p);
        setDeleteOpen(true);
    }

    function confirmDelete() {
        if (!deleteTarget) return;
        router.delete(route('projects.destroy', deleteTarget.id));
        setDeleteOpen(false);
        setDeleteTarget(null);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Projects" />

            <Box sx={{ mb: 4 }}>
                {/* Hero header (matches Tasks hero) */}
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
                        Your Projects
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

                {/* Tabs are always visible (even with zero projects) */}

                

                {/* Create / Edit Modal */}
                <Dialog
                    open={formOpen}
                    onClose={() => { setFormOpen(false); setEditing(null); }}
                    fullWidth
                    maxWidth="sm"
                    PaperProps={{ sx: { background: '#161414', border: '1px solid rgba(191,167,106,0.12)', borderRadius: 2, boxShadow: '0 12px 40px rgba(0,0,0,0.6)' } }}
                >
                    <DialogTitle sx={{ position: 'relative', background: 'linear-gradient(90deg, rgba(191,167,106,0.08), transparent)', color: '#F5DEB3', display: 'flex', alignItems: 'center', gap: 1 }}>
                        {editing ? (
                            <>
                                <EditIcon sx={{ color: '#bfa76a' }} />
                                <Box component="span">Edit Project</Box>
                            </>
                        ) : (
                            <>
                                <AddIcon sx={{ color: '#bfa76a' }} />
                                <Box component="span">Create New Project</Box>
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
                            <TextField
                                fullWidth
                                label="Project Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Enter project name"
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={3}
                                placeholder="Describe your project..."
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
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ color: '#DEB887' }}>Priority</InputLabel>
                                        <Select
                                            label="Priority"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    color: '#F5DEB3',
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 123, 0.18)' },
                                            }}
                                        >
                                            <MenuItem value="low">Low</MenuItem>
                                            <MenuItem value="medium">Medium</MenuItem>
                                            <MenuItem value="high">High</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ color: '#DEB887' }}>Status</InputLabel>
                                        <Select
                                            label="Status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            sx={{
                                                '& .MuiSelect-select': { color: '#F5DEB3' },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 123, 0.18)' },
                                            }}
                                        >
                                            <MenuItem value="todo">To Do</MenuItem>
                                            <MenuItem value="in_progress">In Progress</MenuItem>
                                            <MenuItem value="done">Done</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
                                {editing && (
                                    <Button
                                        onClick={() => {
                                            setEditing(null);
                                            setTitle('');
                                            setDescription('');
                                            setPriority('medium');
                                            setStatus('todo');
                                            setFormOpen(false);
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
                                        color: '#181513',
                                        fontWeight: 600,
                                        '&:hover': {
                                            background: '#d6c491',
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

                {/* Projects list (Tasks-style) */}
                <Box sx={{ mb: 2 }}>
                    {/* Status tabs (always render) */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        {(() => {
                            const counts = {
                                todo: (projectsList || []).filter(p => (p.status || 'todo') === 'todo').length,
                                in_progress: (projectsList || []).filter(p => (p.status || 'todo') === 'in_progress').length,
                                done: (projectsList || []).filter(p => (p.status || 'todo') === 'done').length,
                            };
                            return (
                                <Tabs
                                    value={activeTab}
                                            onChange={(_, val) => {
                                                setContentVisible(false);
                                                setTimeout(() => {
                                                    setActiveTab(val);
                                                    setPage(1);
                                                    setContentVisible(true);
                                                }, 220);
                                            }}
                                    sx={{
                                        '& .MuiTabs-flexContainer': { gap: 1 },
                                        '& .MuiTab-root': {
                                            textTransform: 'none',
                                            color: '#a88734',
                                            fontWeight: 800,
                                            minHeight: 40,
                                            px: 1.5,
                                            transition: 'transform 220ms cubic-bezier(.2,.8,.2,1), background-color 220ms cubic-bezier(.2,.8,.2,1), color 220ms ease, box-shadow 220ms ease',
                                        },
                                        '& .MuiTab-root.Mui-selected': {
                                            color: '#181513',
                                            backgroundColor: '#bfa76a',
                                            borderRadius: '999px',
                                            boxShadow: '0 8px 20px rgba(191,167,106,0.12)',
                                            transform: 'translateY(-2px)',
                                            '&:hover': { backgroundColor: '#d6c491' },
                                            transition: 'transform 220ms cubic-bezier(.2,.8,.2,1), background-color 220ms cubic-bezier(.2,.8,.2,1), color 220ms ease, box-shadow 220ms ease',
                                        },
                                        '& .MuiTabs-indicator': { display: 'none' },
                                    }}
                                    TabIndicatorProps={{ style: { display: 'none' } }}
                                >
                                    <Tab value="todo" label={`To Do (${counts.todo})`} />
                                    <Tab value="in_progress" label={`In Progress (${counts.in_progress})`} />
                                    <Tab value="done" label={`Done (${counts.done})`} />
                                </Tabs>
                            );
                        })()}
                    </Box>

                    {/* When there are no projects show the large empty-state card below the tabs */}
                    {(projectsList?.length ?? 0) === 0 && (
                        <Box sx={{ position: 'relative', textAlign: 'center', py: 6, px: 3, backgroundColor: '#161414', borderRadius: '12px', border: '2px dashed rgba(191,167,106,0.12)' }}>
                            <FolderIcon sx={{ fontSize: '3rem', color: '#bfa76a', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#DEB887', mb: 1.5, fontWeight: 600 }}>
                                No projects yet
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#BDB76B', mb: 3 }}>
                                Create your first project to get started organizing your work
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => { setFormOpen(true); setEditing(null); setTitle(''); setDescription(''); setPriority('medium'); setStatus('todo'); }}
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
                                Create First Project
                            </Button>
                        </Box>
                    )}

                    {(projectsList?.length ?? 0) > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <TableContainer component={Paper} sx={{ background: '#161414', borderRadius: 2, boxShadow: 6, transition: 'opacity 160ms ease, transform 160ms ease', opacity: contentVisible ? 1 : 0, transform: contentVisible ? 'translateY(0)' : 'translateY(6px)' }}>
                                <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Title</TableCell>
                                    <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Description</TableCell>
                                    <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Priority</TableCell>
                                    <TableCell sx={{ color: '#a88734', fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(() => {
                                    const byStatus = {
                                        todo: projectsList.filter(p => (p.status || 'todo') === 'todo'),
                                        in_progress: projectsList.filter(p => (p.status || 'todo') === 'in_progress'),
                                        done: projectsList.filter(p => (p.status || 'todo') === 'done'),
                                    };
                                    const current = byStatus[activeTab] || [];
                                    const pageCount = Math.max(1, Math.ceil(current.length / projectsPerPage));
                                    const start = (page - 1) * projectsPerPage;
                                    const visible = current.slice(start, start + projectsPerPage);
                                    return visible.map((p) => (
                                    <TableRow key={p.id} hover sx={{ '&:hover': { background: 'rgba(255,255,255,0.02)' } }}>
                                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>{p.title}</TableCell>
                                        <TableCell sx={{ color: '#d6c491', fontSize: '0.95rem', maxWidth: 300 }}>{p.description || 'No description'}</TableCell>
                                        <TableCell>
                                            {(() => {
                                                const pr = p.priority || 'medium';
                                                const color = pr === 'high' ? '#d9534f' : pr === 'low' ? '#5cb85c' : '#e1c542';
                                                const label = pr.charAt(0).toUpperCase() + pr.slice(1);
                                                return (
                                                    <Box component="span" sx={{ display: 'inline-flex' }}>
                                                        <Box sx={{ backgroundColor: color, color: '#fff', fontWeight: 700, fontSize: '0.75rem', px: 1, py: '2px', borderRadius: '8px' }}>{label}</Box>
                                                    </Box>
                                                );
                                            })()}
                                        </TableCell>
                                        <TableCell>
                                            {p.status === 'done' ? (
                                                <IconButton size="small" onClick={() => router.put(route('projects.markUndo', p.id))} sx={{ color: '#DEB887', mr: 1 }}><UndoIcon fontSize="small" /></IconButton>
                                            ) : (
                                                <IconButton size="small" onClick={() => router.put(route('projects.markDone', p.id))} sx={{ color: '#5cb85c', mr: 1 }}><DoneIcon fontSize="small" /></IconButton>
                                            )}
                                            <IconButton size="small" onClick={() => startEdit(p)} sx={{ color: '#DEB887', mr: 1 }}><EditIcon fontSize="small" /></IconButton>
                                            <IconButton size="small" onClick={() => { setDeleteTarget(p); setDeleteOpen(true); }} sx={{ color: '#FF6B6B' }}><DeleteIcon fontSize="small" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                    ));
                                })()}
                            </TableBody>
                        </Table>
                                </TableContainer>
                        </Box>
                    )}

                    {/* Pagination for columns */}
                    {(projectsList?.length ?? 0) > 0 && (() => {
                        const count = projectsList.filter(p => (p.status || 'todo') === activeTab).length;
                        const pageCount = Math.ceil(count / projectsPerPage);
                        if (pageCount <= 1) return null;
                        return (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Pagination
                                    count={pageCount}
                                    page={page}
                                    onChange={(_, val) => setPage(val)}
                                    shape="rounded"
                                    sx={{
                                        '& .MuiPaginationItem-root': { color: '#a88734', fontWeight: 800 },
                                        '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#bfa76a', color: '#181513' },
                                        '& .MuiPaginationItem-root:hover': { backgroundColor: 'rgba(168,135,52,0.08)', color: '#a88734' },
                                    }}
                                />
                            </Box>
                        );
                    })()}
                    
                </Box>

                {/* Floating Action Button for New Project (only show when at least one project exists) */}
                {!formOpen && (projectsList?.length ?? 0) > 0 && (
                    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                setFormOpen(true);
                                setEditing(null);
                                setTitle('');
                                setDescription('');
                                setPriority('medium');
                                setStatus('todo');
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
                            New Project
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

                                <DialogContentText sx={{ color: '#DEB887', textAlign: 'center', mb: 2 }}>
                                    Are you sure you want to permanently delete "{deleteTarget?.title || 'this project'}"? This action cannot be undone.
                                </DialogContentText>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Button onClick={() => { setDeleteOpen(false); setDeleteTarget(null); }} sx={{ color: '#DEB887' }}>Cancel</Button>
                                    <Button onClick={confirmDelete} variant="contained" sx={{ background: '#bfa76a', color: '#181513', fontWeight: 800, borderRadius: 28, boxShadow: '0 12px 36px rgba(191,167,106,0.22)', '&:hover': { background: '#d6c491', boxShadow: '0 18px 48px rgba(191,167,106,0.28)' }, minWidth: 110, py: 1 }}>Delete</Button>
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
        </AuthenticatedLayout>
    );
}
