import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Typography,
    Stack,
    IconButton,
    Tooltip,
    ButtonGroup,
    Grow,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import StatusChip from '@/Components/UI/StatusChip';
import axios from 'axios';

export default function Index({ projects }) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editForm, setEditForm] = useState({ title: '', description: '' });

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createForm, setCreateForm] = useState({ title: '', description: '' });

    const [deletingProject, setDeletingProject] = useState(null);

    const destroy = (id) => {
        // kept for backward compatibility but not used directly
        if (!confirm('Delete this project?')) return;
        Inertia.delete(route('projects.destroy', id));
    };

    const openEditModal = (p) => {
        setEditingProject(p);
        setEditForm({ title: p.title || '', description: p.description || '' });
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditingProject(null);
    };

    const saveEdit = async () => {
        if (!editingProject) return;
        setEditLoading(true);
        try {
            const url = route('projects.update', editingProject.id);
            await axios.put(url, editForm);
            // reload to get fresh data
            Inertia.reload({ preserveState: false });
        } catch (e) {
            console.error(e);
        } finally {
            setEditLoading(false);
            closeEditModal();
        }
    };

    const openDeleteModal = (p) => {
        setDeletingProject(p);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeletingProject(null);
    };

    const confirmDelete = () => {
        if (!deletingProject) return;
        Inertia.delete(route('projects.destroy', deletingProject.id), {
            onFinish: () => closeDeleteModal(),
        });
    };

    const getInitials = (title) => {
        if (!title) return 'P';
        return title.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
    };

    const [page, setPage] = useState(1);
    const [flippedId, setFlippedId] = useState(null);
    const flipDuration = 520; // ms

    const viewWithFlip = (p) => {
        if (flippedId) return; // already flipping
        setFlippedId(p.id);
    };
    const pageSize = 9;
    const total = Array.isArray(projects) ? projects.length : 0;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    useEffect(() => {
        if (page > pageCount) setPage(1);
    }, [pageCount]);

    const sortedProjects = (projects || []).slice().sort((a, b) => {
        const rank = (p) => {
            if (p.completed) return 0; // done first
            if (Number(p.in_progress_count || 0) > 0) return 1; // active next
            return 2; // todo last
        };
        const ra = rank(a);
        const rb = rank(b);
        if (ra !== rb) return ra - rb;
        // stable tie-breaker: title
        return String(a.title || '').localeCompare(String(b.title || ''));
    });

    const paginated = sortedProjects.slice((page - 1) * pageSize, page * pageSize);

    React.useEffect(() => {
        try {
            console.debug && console.debug('Projects props received:', projects);
            (projects || []).forEach((p) => console.debug('project counts', p.id, p.todo_count, p.in_progress_count, p.tasks_count, p.completed));
        } catch (e) {
            // ignore
        }
    }, [projects]);

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            minHeight: '100vh'
        }}>
            {/* Background image layer */}
            <Box sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("/images/projects.png")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                // avoid `fixed` attachment so the background renders consistently across pagination
                backgroundAttachment: 'scroll',
                minHeight: '100vh',
                opacity: 0.95,
                filter: 'saturate(1) contrast(1.02)'
            }} />

            {/* Color overlay for tint and contrast */}
            <Box sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(124,98,255,0.06), rgba(245,243,255,0.06))',
                pointerEvents: 'none'
            }} />

            {/* Content above background */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 4, md: 8 } }}>
            <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.75rem', md: '2.5rem' }, letterSpacing: '0.2px' }}>Projects</Typography>
                <Box sx={{ width: 72, height: 6, mx: 'auto', mt: 1, mb: 1.5, borderRadius: 3, background: 'linear-gradient(90deg, rgba(94,59,255,1), rgba(123,92,255,1))', boxShadow: '0 6px 18px rgba(94,59,255,0.12)' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>Manage and organize your active work — quick access to view, edit, and remove projects.</Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 3 }}>
                    <PrimaryButton
                        component={Link}
                        href={route('dashboard')}
                        startIcon={<ArrowBackIcon />}
                        size="small"
                        sx={{ textTransform: 'none', px: 1.5, minWidth: 96 }}
                    >
                        Back
                    </PrimaryButton>

                    <PrimaryButton
                        onClick={() => setCreateModalOpen(true)}
                        size="small"
                        sx={{ textTransform: 'none', boxShadow: '0 10px 30px rgba(94,59,255,0.12)', px: 1.5, minWidth: 96 }}
                    >
                        New Project
                    </PrimaryButton>
                </Box>
            </Box>
            <Box component="div" sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 8, justifyItems: 'center', alignItems: 'start' }}>
                {paginated.map((p, idx) => {
                    const isFlipped = flippedId === p.id;
                    return (
                        <div key={p.id} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Grow in timeout={300 + idx * 80} style={{ transformOrigin: '0 0 0', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <Box sx={{ width: 320, height: 280, perspective: 1400 }}>
                                    <Box
                                        onTransitionEnd={(ev) => {
                                            if (ev.propertyName === 'transform' && isFlipped) {
                                                Inertia.visit(route('projects.show', p.id));
                                            }
                                        }}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'relative',
                                            transformStyle: 'preserve-3d',
                                            transition: `transform ${flipDuration}ms cubic-bezier(0.2,0.85,0.25,1)`,
                                            transform: isFlipped ? 'rotateY(180deg)' : 'none',
                                            willChange: 'transform'
                                        }}
                                    >
                                        {/* Front face */}
                                        <Card
                                            elevation={0}
                                            sx={(theme) => ({
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 2,
                                                background: '#FFFFFF',
                                                boxShadow: '0 12px 30px rgba(16,24,40,0.06)',
                                                transition: 'transform 260ms cubic-bezier(0.2,0.9,0.25,1), box-shadow 260ms cubic-bezier(0.2,0.9,0.25,1), filter 260ms cubic-bezier(0.2,0.9,0.25,1)',
                                                willChange: 'transform, box-shadow',
                                                '&:hover': isFlipped ? {} : {
                                                    transform: 'translateY(-8px) scale(1.02)',
                                                    boxShadow: '0 26px 50px rgba(16,24,40,0.12)'
                                                },
                                                position: 'absolute',
                                                inset: 0,
                                                backfaceVisibility: 'hidden',
                                                pointerEvents: isFlipped ? 'none' : 'auto'
                                            })}
                                        >
                                            <CardHeader
                                                    title={<Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>{p.title}</Typography>}
                                                    subheader={<Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>Tasks: {p.tasks_count ?? 0}</Typography>}
                                                    action={<StatusChip status={(() => {
                                                        const todo = Number(p.todo_count || 0);
                                                        const inprog = Number(p.in_progress_count || 0);
                                                        const total = Number(p.tasks_count || 0);
                                                        // prefer active if there are any in-progress tasks
                                                        if (inprog > 0) return 'active';
                                                        if ((todo + inprog) === 0 && total > 0) return 'done';
                                                        if (todo > 0) return 'todo';
                                                        return 'todo';
                                                    })()} />}
                                                    sx={{ alignItems: 'center' }}
                                                />

                                            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflow: 'hidden', px: 2 }}>
                                                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                                                    {p.description || '—'}
                                                </Typography>
                                                <Box sx={{ flex: 1 }} />
                                            </CardContent>

                                            <CardActions sx={{ px: 2, pb: 2 }}>
                                                <ButtonGroup sx={{ ml: 'auto' }} disableElevation>
                                                    <Tooltip title="View" arrow>
                                                        <IconButton
                                                            onClick={() => viewWithFlip(p)}
                                                            size="small"
                                                            aria-label={`view-${p.id}`}
                                                            sx={{
                                                                transition: 'transform 200ms cubic-bezier(0.2,0.9,0.25,1), background-color 160ms, color 160ms',
                                                                borderRadius: 1,
                                                                color: (theme) => theme.palette.primary.main,
                                                                '&:hover': {
                                                                    transform: 'scale(1.08)',
                                                                    backgroundColor: 'rgba(94,59,255,0.08)'
                                                                },
                                                                '&:active': { transform: 'scale(0.98)' }
                                                            }}
                                                        >
                                                            <VisibilityIcon fontSize="small" sx={{ color: 'inherit' }} />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Edit" arrow>
                                                        <IconButton
                                                            onClick={() => openEditModal(p)}
                                                            size="small"
                                                            aria-label={`edit-${p.id}`}
                                                            sx={{
                                                                transition: 'transform 200ms cubic-bezier(0.2,0.9,0.25,1), background-color 160ms, color 160ms',
                                                                borderRadius: 1,
                                                                color: (theme) => theme.palette.primary.main,
                                                                '&:hover': {
                                                                    transform: 'scale(1.08)',
                                                                    backgroundColor: 'rgba(94,59,255,0.08)'
                                                                },
                                                                '&:active': { transform: 'scale(0.98)' }
                                                            }}
                                                        >
                                                            <EditIcon fontSize="small" sx={{ color: 'inherit' }} />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Delete" arrow>
                                                        <IconButton
                                                            onClick={() => openDeleteModal(p)}
                                                            size="small"
                                                            aria-label={`delete-${p.id}`}
                                                            sx={(theme) => ({
                                                                color: theme.palette.error.main,
                                                                transition: 'transform 200ms cubic-bezier(0.2,0.9,0.25,1), background-color 160ms, color 160ms',
                                                                borderRadius: 1,
                                                                '&:hover': {
                                                                    transform: 'scale(1.08)',
                                                                    backgroundColor: 'rgba(244,67,54,0.06)',
                                                                    color: theme.palette.error.dark
                                                                },
                                                                '&:active': { transform: 'scale(0.98)' }
                                                            })}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ButtonGroup>
                                            </CardActions>
                                        </Card>

                                        {/* Back face */}
                                        <Box
                                            sx={(theme) => ({
                                                position: 'absolute',
                                                inset: 0,
                                                borderRadius: 2,
                                                background: 'linear-gradient(90deg, rgba(94,59,255,1), rgba(123,92,255,1))',
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)',
                                                boxShadow: '0 16px 40px rgba(16,24,40,0.12)',
                                                transition: `opacity ${Math.round(flipDuration / 2)}ms ease`,
                                                opacity: isFlipped ? 1 : 0,
                                                pointerEvents: isFlipped ? 'auto' : 'none'
                                            })}
                                        >
                                            <Box sx={{ textAlign: 'center' }}>
                                                <CircularProgress size={28} sx={{ color: 'rgba(255,255,255,0.95)' }} />
                                                <Typography sx={{ mt: 1, fontWeight: 700 }}>Opening...</Typography>
                                                <Typography variant="caption" sx={{ opacity: 0.9 }}>{p.title}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grow>
                        </div>
                    );
                })}
            </Box>

            {/* Edit dialog */}
            <Dialog
                open={editModalOpen}
                onClose={closeEditModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, background: 'linear-gradient(90deg, rgba(94,59,255,1), rgba(123,92,255,1))', color: '#fff', py: 1.25, px: 2 }}>
                    <EditIcon sx={{ color: 'rgba(255,255,255,0.95)' }} />
                    <Box sx={{ flex: 1, fontWeight: 700 }}>Edit Project</Box>
                    <IconButton onClick={closeEditModal} size="small" sx={{ color: 'rgba(255,255,255,0.95)' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ background: 'linear-gradient(0deg, rgba(255,255,255,0.98), rgba(255,255,255,0.98))', p: 3 }}>
                    <TextField variant="outlined" label="Title" fullWidth value={editForm.title} onChange={(e) => setEditForm((s) => ({ ...s, title: e.target.value }))} sx={{ mb: 2 }} />
                    <TextField variant="outlined" label="Description" fullWidth multiline rows={4} value={editForm.description} onChange={(e) => setEditForm((s) => ({ ...s, description: e.target.value }))} />
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2, background: 'transparent' }}>
                    <Button onClick={closeEditModal} variant="outlined" sx={{ textTransform: 'none' }}>Cancel</Button>
                    <PrimaryButton onClick={saveEdit} disabled={editLoading} startIcon={editLoading ? null : <SaveIcon />} sx={{ textTransform: 'none' }}>
                        {editLoading ? <CircularProgress size={18} color="inherit" /> : 'Save Changes'}
                    </PrimaryButton>
                </DialogActions>
            </Dialog>

            {/* Create dialog */}
            <Dialog
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, background: 'linear-gradient(90deg, rgba(94,59,255,1), rgba(123,92,255,1))', color: '#fff', py: 1.25, px: 2 }}>
                    <Box sx={{ flex: 1, fontWeight: 700 }}>New Project</Box>
                    <IconButton onClick={() => setCreateModalOpen(false)} size="small" sx={{ color: 'rgba(255,255,255,0.95)' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ background: 'linear-gradient(0deg, rgba(255,255,255,0.98), rgba(255,255,255,0.98))', p: 3 }}>
                    <TextField variant="outlined" label="Title" fullWidth value={createForm.title} onChange={(e) => setCreateForm((s) => ({ ...s, title: e.target.value }))} sx={{ mb: 2 }} />
                    <TextField variant="outlined" label="Description" fullWidth multiline rows={4} value={createForm.description} onChange={(e) => setCreateForm((s) => ({ ...s, description: e.target.value }))} />
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2, background: 'transparent' }}>
                    <Button onClick={() => setCreateModalOpen(false)} variant="outlined" sx={{ textTransform: 'none' }}>Cancel</Button>
                    <PrimaryButton
                        onClick={async () => {
                            setCreateLoading(true);
                            try {
                                await axios.post(route('projects.store'), createForm);
                                Inertia.reload({ preserveState: false });
                            } catch (e) {
                                console.error(e);
                            } finally {
                                setCreateLoading(false);
                                setCreateModalOpen(false);
                                setCreateForm({ title: '', description: '' });
                            }
                        }}
                        disabled={createLoading}
                        startIcon={createLoading ? null : <SaveIcon />}
                        sx={{ textTransform: 'none' }}
                    >
                        {createLoading ? <CircularProgress size={18} color="inherit" /> : 'Create Project'}
                    </PrimaryButton>
                </DialogActions>
            </Dialog>

            {/* Delete confirmation dialog */}
            <Dialog
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 30px rgba(16,24,40,0.08)' } }}
            >
                <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2, background: 'linear-gradient(90deg, rgba(124,77,255,0.12), rgba(244,67,54,0.06))' }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(244,67,54,0.12), rgba(244,67,54,0.06))' }}>
                        <DeleteIcon sx={{ color: 'error.main', fontSize: 20 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>Delete Project</Typography>
                        <Typography variant="body2" color="text.secondary">This action cannot be undone.</Typography>
                    </Box>
                    <IconButton onClick={closeDeleteModal} size="small" sx={{ color: 'text.secondary' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <DialogContent dividers sx={{ p: 3, background: (theme) => theme.palette.background.paper }}>
                    <Typography sx={{ mb: 1, color: 'text.secondary' }}>Are you sure you want to permanently delete?</Typography>
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>{deletingProject?.title}</Typography>
                    <Typography variant="body2" color="text.secondary">This will remove the project and all associated tasks.</Typography>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 2, justifyContent: 'center' }}>
                    <Button onClick={closeDeleteModal} variant="outlined" sx={{ textTransform: 'none', borderColor: 'rgba(16,24,40,0.06)', color: 'text.primary', minWidth: 120 }}>Cancel</Button>
                    <Button onClick={confirmDelete} variant="contained" sx={{ textTransform: 'none', minWidth: 120, background: 'linear-gradient(90deg, rgba(244,67,54,1), rgba(239,83,80,1))', boxShadow: '0 6px 18px rgba(244,67,54,0.18)', '&:hover': { background: 'linear-gradient(90deg, rgba(244,67,54,0.95), rgba(239,83,80,0.95))' } }} startIcon={<DeleteIcon />}>Delete</Button>
                </DialogActions>
            </Dialog>

            {total > pageSize && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination count={pageCount} page={page} onChange={(e, v) => setPage(v)} color="primary" />
                </Box>
            )}
            </Box>
            </Box>
        </Box>
    );
}
