import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Box,
    Divider,
    TextField,
    Button,
    IconButton,
    CircularProgress,
} from '@mui/material';
import StatusChip from '@/Components/UI/StatusChip';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export default function Dashboard({ activeProjects, pendingTasks, teamVelocity, recentProjects, metrics }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view');
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(null);
    const [form, setForm] = useState({ title: '', description: '' });

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createForm, setCreateForm] = useState({ title: '', description: '' });

    const openModal = async (mode, id) => {
        setModalMode(mode);
        setLoading(true);
        setModalOpen(true);

        try {
            const url = route('projects.data', id);
            const res = await axios.get(url);
            setProject(res.data);
            setForm({ title: res.data.title || '', description: res.data.description || '' });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setProject(null);
    };

    const saveProject = async () => {
        if (!project) return;
        setLoading(true);
        try {
            const url = route('projects.update', project.id);
            const res = await axios.put(url, form);
            // update local project and close modal
            setProject(res.data.project || project);
            setModalOpen(false);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {(() => {
                            // helper: get a history array for a metric (length N)
                            const getHistory = (key, fallbackVal = 0, length = 8) => {
                                // prefer server-provided `metrics` prop: { active: [...], pending: [...], velocity: [...], complete: [...] }
                                if (metrics && metrics[key] && Array.isArray(metrics[key]) && metrics[key].length) {
                                    return metrics[key].slice(-length);
                                }

                                // fallback: generate deterministic history from fallbackVal
                                const seed = Number(fallbackVal) || 3;
                                const arr = [];
                                for (let i = length - 1; i >= 0; i--) {
                                    // gentle oscillation around fallbackVal
                                    const variation = Math.round((Math.sin((seed + i) * 1.3) + 1) * (Math.max(1, seed) * 0.08));
                                    const val = Math.max(0, Math.round(fallbackVal - (length / 2 - i) * (seed * 0.02) + variation));
                                    arr.push(val);
                                }
                                return arr;
                            };

                            const makePoints = (history = [], w = 100, h = 40) => {
                                // return array of points {x,y}
                                if (!history || history.length === 0) return [];
                                const max = Math.max(...history);
                                const min = Math.min(...history);
                                const range = max - min || 1;
                                return history.map((v, i) => {
                                    const x = (i / (history.length - 1)) * w;
                                    const y = h - ((v - min) / range) * (h - 8) - 4; // padding
                                    return { x, y };
                                });
                            };

                            const catmullRom2bezier = (pts) => {
                                // pts: [{x,y}, ...]
                                if (!pts || pts.length === 0) return '';
                                if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
                                const d = [];
                                d.push(`M ${pts[0].x} ${pts[0].y}`);
                                for (let i = 0; i < pts.length - 1; i++) {
                                    const p0 = pts[i - 1] || pts[i];
                                    const p1 = pts[i];
                                    const p2 = pts[i + 1];
                                    const p3 = pts[i + 2] || p2;

                                    const cp1x = p1.x + (p2.x - p0.x) / 6;
                                    const cp1y = p1.y + (p2.y - p0.y) / 6;

                                    const cp2x = p2.x - (p3.x - p1.x) / 6;
                                    const cp2y = p2.y - (p3.y - p1.y) / 6;

                                    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
                                }
                                return d.join(' ');
                            };

                            const makePathStrings = (historyPoints = [], w = 100, h = 40) => {
                                const pts = historyPoints;
                                if (!pts || pts.length === 0) return { strokePath: '', areaPath: '' };
                                const strokePath = catmullRom2bezier(pts);
                                // build area path by closing to bottom
                                const areaPath = strokePath + ` L ${w} ${h} L 0 ${h} Z`;
                                return { strokePath, areaPath };
                            };

                            const stats = [
                                { key: 'active', title: 'Active Projects', value: Number(activeProjects) || 0, history: getHistory('active', Number(activeProjects) || 0) },
                                { key: 'pending', title: 'Pending Tasks', value: Number(pendingTasks) || 0, history: getHistory('pending', Number(pendingTasks) || 0) },
                                { key: 'velocity', title: 'Team Velocity (30d)', value: Number(teamVelocity) || 0, history: getHistory('velocity', Number(teamVelocity) || 0) },
                                { key: 'complete', title: 'Complete Projects', value: (recentProjects || []).filter(p => p.completed).length || 0, history: getHistory('complete', (recentProjects || []).filter(p => p.completed).length || 0) },
                            ];

                            const computeChange = (hist) => {
                                if (!hist || hist.length < 2) return { pct: 0, up: true };
                                const last = hist[hist.length - 1] || 0;
                                const prev = hist[hist.length - 2] || 0;
                                if (prev === 0) return { pct: last === 0 ? 0 : 100, up: last >= prev };
                                const pct = Math.round(((last - prev) / Math.abs(prev)) * 100);
                                return { pct, up: pct >= 0 };
                            };

                            return stats.map((s) => {
                                const { pct, up } = computeChange(s.history);
                                const points = makePoints(s.history, 100, 40);
                                const { strokePath, areaPath } = makePathStrings(points, 100, 40);
                                const colorMap = { active: '#3B82F6', pending: '#EF4444', velocity: '#10B981', complete: '#7C62FF' };
                                const strokeColor = colorMap[s.key] || '#7C62FF';

                                return (
                                    <Grid item xs={12} sm={6} md={3} key={s.key}>
                                        <Card sx={{ borderRadius: 2, boxShadow: '0 8px 28px rgba(16,24,40,0.06)' }}>
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                                                <Box>
                                                    <Typography variant="subtitle2" color="text.secondary">{s.title}</Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>{s.value}</Typography>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                                            <Box sx={{ width: 8, height: 8, borderRadius: 1, background: up ? '#10B981' : '#EF4444' }} />
                                                            <Typography variant="caption" sx={{ color: up ? '#10B981' : '#EF4444', fontWeight: 700 }}>{(up ? '+' : '') + pct + '%'}</Typography>
                                                        </Box>
                                                        <Typography variant="caption" color="text.secondary">vs last period</Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ width: 120, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <svg width="120" height="48" viewBox="0 0 100 40" preserveAspectRatio="none">
                                                        {areaPath && <path d={areaPath} fill={strokeColor} opacity={0.08} />}
                                                        {strokePath && <path d={strokePath} fill="none" stroke={strokeColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />}
                                                    </svg>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            });
                        })()}
                    </Grid>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>Recent Projects</Typography>

                            {(!recentProjects || recentProjects.length === 0) ? (
                                <Box sx={{ p: 3 }}>
                                    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 2, p: 3, borderRadius: 3, boxShadow: '0 8px 30px rgba(16,24,40,0.06)', textAlign: 'center', border: '2px dashed rgba(124,98,255,0.34)' }}>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography variant="h6" sx={{ mb: 1 }}>Create your first project</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Start organizing work by adding a project. Add tasks, assign teammates, and track progress from one place.</Typography>

                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                                                <Button
                                                    onClick={() => setCreateModalOpen(true)}
                                                    variant="contained"
                                                    startIcon={<AddIcon />}
                                                    sx={{ textTransform: 'none' }}
                                                >
                                                    Create Project
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Box>
                            ) : (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Title</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Tasks</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Status</TableCell>
                                            <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 700 }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentProjects.map((p) => (
                                            <TableRow key={p.id}>
                                                    <TableCell>{p.title}</TableCell>
                                                    <TableCell>{p.tasks_count ?? 0}</TableCell>
                                                    <TableCell>
                                                        <StatusChip status={(() => {
                                                            if (p.completed) return 'done';
                                                            const todo = Number(p.todo_count || 0);
                                                            const inprog = Number(p.in_progress_count || 0);
                                                            if (inprog > 0) return 'active';
                                                            if (todo > 0) return 'todo';
                                                            return 'todo';
                                                        })()} />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                            <PrimaryButton size="small" onClick={() => openModal('view', p.id)}>
                                                                View
                                                            </PrimaryButton>
                                                            <PrimaryButton size="small" sx={{ ml: 1 }} onClick={() => openModal('edit', p.id)}>
                                                                Edit
                                                            </PrimaryButton>
                                                    </TableCell>
                                                </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}

                        </CardContent>
                    </Card>
                </div>
            </div>
                <Dialog
                    open={modalOpen}
                    onClose={closeModal}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            p: 0,
                            overflow: 'hidden',
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 20px 60px rgba(16,24,40,0.12)'
                        }
                    }}
                    BackdropProps={{ sx: { backgroundColor: 'rgba(15,23,42,0.28)' } }}
                >
                    <DialogTitle sx={{ p: 2.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, fontSize: 16 }}>
                                {project && project.title ? project.title.slice(0,1).toUpperCase() : ''}
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {modalMode === 'view' ? 'Project Details' : 'Edit Project'}
                                </Typography>
                                {project && (
                                    <Typography variant="caption" color="text.secondary">
                                        {project.title}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </DialogTitle>

                    <Divider />

                    <DialogContent dividers sx={{ p: 3 }}>
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                                <CircularProgress />
                            </Box>
                        )}

                        {!loading && project && (
                            <Box sx={{ mt: 1 }}>
                                {modalMode === 'view' ? (
                                    <Box>
                                        <Typography variant="h6" sx={{ mb: 1 }}>{project.title}</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{project.description}</Typography>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Tasks</Typography>
                                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                            {project.tasks?.length ? project.tasks.map((t) => (
                                                <li key={t.id} style={{ marginBottom: 6 }}>{t.title} — <em style={{ color: '#6b7280' }}>{t.status}</em></li>
                                            )) : <li style={{ color: '#6b7280' }}>No tasks</li>}
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box>
                                        <TextField
                                            label="Title"
                                            fullWidth
                                            value={form.title}
                                            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            label="Description"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={form.description}
                                            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}
                    </DialogContent>

                    <Divider />

                    <DialogActions sx={{ p: 2.5, gap: 1 }}>
                        <Button onClick={closeModal} variant="outlined" color="inherit" sx={{ borderColor: 'rgba(15,23,42,0.06)' }}>
                            Close
                        </Button>
                        {modalMode === 'edit' && (
                            <PrimaryButton onClick={saveProject} disabled={loading}>
                                {loading ? 'Saving…' : 'Save'}
                            </PrimaryButton>
                        )}
                    </DialogActions>
                </Dialog>
                {/* Create Project dialog (from Projects Index) */}
                <Dialog
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
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
                                    window.location.reload();
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
        </AuthenticatedLayout>
    );
}
