import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Collapse,
    Grid,
    IconButton,
    TextField,
    Typography,
    Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import TaskIcon from '@mui/icons-material/Task';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Index() {
    const { projects } = usePage().props;
    const [flippedId, setFlippedId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editing, setEditing] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Open modal if ?new=1 is in the URL
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('new') === '1') {
                setFormOpen(true);
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, []);

    function submit(e) {
        e.preventDefault();

        const data = { title, description };

        if (editing) {
            router.put(route('projects.update', editing.id), data, {
                onSuccess: () => {
                    setEditing(null);
                    setTitle('');
                    setDescription('');
                    setFormOpen(false);
                },
            });
        } else {
            router.post(route('projects.store'), data, {
                onSuccess: () => {
                    setTitle('');
                    setDescription('');
                    setFormOpen(false);
                },
            });
        }
    }

    function startEdit(p) {
        setEditing(p);
        setTitle(p.title);
        setDescription(p.description || '');
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
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
                                {editing && (
                                    <Button
                                        onClick={() => {
                                            setEditing(null);
                                            setTitle('');
                                            setDescription('');
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

                {/* Projects Grid */}
                {projects?.length > 0 ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
                        {projects.map((p) => {
                            const flipped = flippedId === p.id;
                            return (
                                <Box key={p.id} sx={{ width: '100%' }}>
                                    <Box
                                        onClick={() => setFlippedId(flipped ? null : p.id)}
                                        sx={{
                                            perspective: 1200,
                                            width: '100%',
                                            aspectRatio: '1 / 1',
                                            minHeight: 140,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%',
                                                transition: 'transform 0.7s cubic-bezier(.2,.8,.2,1)',
                                                transformStyle: 'preserve-3d',
                                                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                            }}
                                        >
                                            {/* Front face */}
                                            <Card
                                                sx={{
                                                    backgroundColor: '#161414',
                                                    border: '1px solid rgba(212, 175, 123, 0.28)',
                                                    transition: 'all 0.28s ease',
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    overflow: 'hidden',
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden',
                                                    '&:hover': {
                                                        transform: 'translateY(-6px)',
                                                        boxShadow: '0 18px 46px rgba(210, 105, 30, 0.22)',
                                                        borderColor: 'rgba(212, 175, 123, 0.48)',
                                                    },
                                                }}
                                            >
                                                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 1.25 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                                        <FolderIcon sx={{ fontSize: '1.8rem', color: '#bfa76a', mr: 1 }} />
                                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => { e.stopPropagation(); startEdit(p); }}
                                                               sx={{
                                                                   backgroundColor: 'transparent',
                                                                   color: '#bfa76a',
                                                                   transition: 'transform 140ms ease, box-shadow 160ms ease, background-color 120ms ease',
                                                                   '&:hover': { transform: 'translateY(-2px) scale(1.04)', backgroundColor: 'rgba(191,167,106,0.06)', boxShadow: '0 6px 14px rgba(191,167,106,0.06)' },
                                                                   '&:active': { transform: 'translateY(0) scale(0.995)' },
                                                               }}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => { e.stopPropagation(); destroy(p); }}
                                                               sx={{
                                                                   backgroundColor: 'transparent',
                                                                   color: '#ff6b6b',
                                                                   transition: 'transform 140ms ease, box-shadow 160ms ease, background-color 120ms ease',
                                                                   '&:hover': { transform: 'translateY(-2px) scale(1.04)', backgroundColor: 'rgba(255,107,107,0.08)', boxShadow: '0 6px 14px rgba(255,107,107,0.04)' },
                                                                   '&:active': { transform: 'translateY(0) scale(0.995)' },
                                                               }}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{
                                                                color: '#7a5c2e',
                                                                fontWeight: 700,
                                                                mb: 0.5,
                                                                fontSize: '1rem',
                                                                wordBreak: 'break-word',
                                                            }}
                                                        >
                                                            {p.title}
                                                        </Typography>
                                                        <Box sx={{ flex: 1, overflow: 'auto', pr: 0.5 }}>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: '#F5DEB3',
                                                                    whiteSpace: 'pre-wrap',
                                                                    lineHeight: 1.4,
                                                                    fontSize: '0.9rem',
                                                                }}
                                                            >
                                                                {p.description || (
                                                                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                                                                        <TaskIcon sx={{ color: '#DEB887', fontSize: '1rem' }} />
                                                                        <Box component="span">No description added</Box>
                                                                    </Box>
                                                                )}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ mt: 1 }}>
                                                        {p.tasks_count > 0 && (
                                                            <Chip
                                                                icon={<TaskIcon sx={{ color: '#bfa76a' }} />}
                                                                label={`${p.tasks_count} task${p.tasks_count !== 1 ? 's' : ''}`}
                                                                size="small"
                                                                sx={{ backgroundColor: 'rgba(191,167,106,0.13)', color: '#bfa76a', fontWeight: 600 }}
                                                            />
                                                        )}
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            {/* Back face (tasks) */}
                                            <Card
                                                sx={{
                                                    backgroundColor: '#161414',
                                                    border: '1px solid rgba(212, 175, 123, 0.28)',
                                                    transition: 'all 0.28s ease',
                                                    width: '100%',
                                                    height: '100%',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    overflow: 'auto',
                                                    transform: 'rotateY(180deg)',
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden',
                                                    // Dark, thin scrollbar styling (WebKit + Firefox)
                                                    '&::-webkit-scrollbar': {
                                                        width: 8,
                                                        height: 8,
                                                    },
                                                    '&::-webkit-scrollbar-track': {
                                                        background: 'transparent',
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        backgroundColor: 'rgba(191,167,106,0.32)',
                                                        borderRadius: 999,
                                                        border: '2px solid transparent',
                                                        backgroundClip: 'padding-box',
                                                    },
                                                    '&::-webkit-scrollbar-thumb:hover': {
                                                        backgroundColor: 'rgba(191,167,106,0.48)',
                                                    },
                                                    // Firefox
                                                    scrollbarWidth: 'thin',
                                                    scrollbarColor: 'rgba(191,167,106,0.32) transparent',
                                                }}
                                            >
                                                <CardContent sx={{ p: 1.25, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Typography variant="subtitle1" sx={{ color: '#bfa76a', fontWeight: 800 }}>{p.title} — Tasks</Typography>
                                                        <Button size="small" onClick={(e) => { e.stopPropagation(); setFlippedId(null); }} sx={{ color: '#DEB887' }}>Close</Button>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '100%', overflow: 'auto' }}>
                                                        {p.tasks && p.tasks.length > 0 ? (
                                                            p.tasks.map((t) => (
                                                                <Box key={t.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderRadius: 1, background: 'rgba(255,255,255,0.02)' }}>
                                                                    <Box sx={{ flex: 1, pr: 1 }}>
                                                                        <Typography sx={{ color: '#F5DEB3', fontWeight: 700 }}>{t.title}</Typography>
                                                                        {t.description && <Typography sx={{ color: '#bdb76b', fontSize: '0.85rem' }}>{t.description}</Typography>}
                                                                    </Box>
                                                                    {t.completed ? (
                                                                        <Chip label="Done" size="small" sx={{ backgroundColor: 'rgba(50,200,100,0.12)', color: '#34c759' }} />
                                                                    ) : (
                                                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#bfa76a', border: '1px solid rgba(191,167,106,0.14)' }} />
                                                                    )}
                                                                </Box>
                                                            ))
                                                        ) : (
                                                            <Typography sx={{ color: '#BDB76B' }}>No tasks for this project yet.</Typography>
                                                        )}
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
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
                            Create First Project
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Floating Action Button for New Project */}
            {!formOpen && (
                <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setFormOpen(true);
                            setEditing(null);
                            setTitle('');
                            setDescription('');
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
            {/* Task detail dialog removed per user request (Open buttons removed) */}
        </AuthenticatedLayout>
    );
}
