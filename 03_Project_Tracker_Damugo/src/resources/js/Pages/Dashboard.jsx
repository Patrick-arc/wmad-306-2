import React, { useEffect, useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FolderIcon from '@mui/icons-material/Folder';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MovieIcon from '@mui/icons-material/Movie';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    Box,
    Card,
    Typography,
    CircularProgress,
    LinearProgress,
    Button,
} from '@mui/material';

export default function Dashboard({ projects = [], tasks = [] }) {
    const totalProjects = projects.length;
    const activeProjectsCount = projects.filter(p => p && p.status === 'active').length || 0;
    const inProgressProjects = projects.filter(p => {
        const s = (p && p.status) ? String(p.status).toLowerCase() : '';
        return ['active', 'in_progress', 'in progress', 'ongoing', 'started', 'inprogress'].includes(s);
    }).length || 0;
    const completedProjectsCount = projects.filter(p => {
        const s = (p && p.status) ? String(p.status).toLowerCase() : '';
        return ['completed', 'complete', 'done', 'finished'].includes(s);
    }).length || 0;
    const projectCompletionRate = totalProjects ? Math.round((completedProjectsCount / totalProjects) * 100) : 0;

    const totalTasks = tasks.length;
    const inProgressTasks = tasks.filter(t => {
        const s = (t && t.status) ? String(t.status).toLowerCase() : '';
        return ['in_progress', 'in progress', 'ongoing', 'started', 'inprogress', 'active'].includes(s);
    }).length || 0;
    const completedTasks = tasks.filter(t => {
        const s = (t && t.status) ? String(t.status).toLowerCase() : '';
        return ['completed', 'complete', 'done', 'finished'].includes(s);
    }).length || 0;
    const taskCompletionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const [displayProjectProgress, setDisplayProjectProgress] = useState(0);
    const [displayTaskProgress, setDisplayTaskProgress] = useState(0);
    const animRef = useRef();

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        const start = performance.now();
        const dur = 800;
        const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            setDisplayProjectProgress(Math.round(t * projectCompletionRate));
            setDisplayTaskProgress(Math.round(t * taskCompletionRate));
            if (t < 1) animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectCompletionRate, taskCompletionRate]);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>

                {/* Hero section */}
                <Box sx={{ width: '100%', mb: 4 }}>
                    <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', height: { xs: 180, md: 320 }, backgroundImage: "url('/images/heroSection.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,16,14,0.45), rgba(20,16,14,0.65))' }} />
                        <Box sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', px: 2 }}>
                            <Typography sx={{ color: '#fff8e1', fontWeight: 900, fontSize: { xs: 22, md: 36 }, mb: 1 }}>Organize your Life.</Typography>
                            <Typography sx={{ color: '#f0e7d0', fontSize: { xs: 13, md: 16 }, mb: 2, maxWidth: 720 }}>Track projects, manage tasks, and build healthier routines — all in one elegant workspace.</Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button variant="contained" sx={{ background: 'linear-gradient(90deg,#d6c491,#bfa76a)', color: '#111', fontWeight: 700 }}>Create Project</Button>
                                <Button variant="outlined" sx={{ borderColor: '#f0e7d0', color: '#f0e7d0', fontWeight: 700 }}>View Tasks</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Top categories (Daily / Planners / Personal / Goals) */}
                <Card sx={{ background: 'linear-gradient(135deg, #0f0d0c 60%, #151312 100%)', borderRadius: 3, p: 2, border: '1px solid rgba(191,167,106,0.08)', mb: 3 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', height: 260, padding: 8 }}>
                            <div className="dashboard-card" style={{ position: 'relative', width: '100%', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', backgroundImage: "url('/images/dailyCard.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(60, 40, 20, 0.10)' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25))', borderRadius: 16 }} />
                                <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', fontWeight: 800, fontSize: '2.2rem', textAlign: 'center', letterSpacing: 1, textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>Daily</div>
                            </div>
                            <ul style={{ paddingLeft: 0, listStyle: 'none', textAlign: 'left', width: '100%', color: '#efeada', fontSize: '1rem', margin: 0, marginTop: 8 }}>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><CalendarMonthIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Routine</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><CheckIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Habits</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><EditNoteIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Journal</li>
                            </ul>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', height: 260, padding: 8 }}>
                            <div className="dashboard-card" style={{ position: 'relative', width: '100%', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', backgroundImage: "url('/images/plannerCard.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(60, 40, 20, 0.10)' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25))', borderRadius: 16 }} />
                                <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', fontWeight: 800, fontSize: '2.2rem', textAlign: 'center', letterSpacing: 1, textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>Planners</div>
                            </div>
                            <ul style={{ paddingLeft: 0, listStyle: 'none', textAlign: 'left', width: '100%', color: '#efeada', fontSize: '1rem', margin: 0, marginTop: 8 }}>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><RestaurantMenuIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Meal Planner</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><FlightTakeoffIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Travel Planner</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><FitnessCenterIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Workout Planner</li>
                            </ul>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', height: 260, padding: 8 }}>
                            <div className="dashboard-card" style={{ position: 'relative', width: '100%', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', backgroundImage: "url('/images/personalizedCard.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(60, 40, 20, 0.10)' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25))', borderRadius: 16 }} />
                                <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', fontWeight: 800, fontSize: '2.2rem', textAlign: 'center', letterSpacing: 1, textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>Personal</div>
                            </div>
                            <ul style={{ paddingLeft: 0, listStyle: 'none', textAlign: 'left', width: '100%', color: '#efeada', fontSize: '1rem', margin: 0, marginTop: 8 }}>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><MenuBookIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Bookshelf</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><MovieIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Movies & Series</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><AttachMoneyIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Finance</li>
                            </ul>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', height: 260, padding: 8 }}>
                            <div className="dashboard-card" style={{ position: 'relative', width: '100%', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', backgroundImage: "url('/images/goalsCard.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(60, 40, 20, 0.10)' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25))', borderRadius: 16 }} />
                                <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', fontWeight: 800, fontSize: '2.2rem', textAlign: 'center', letterSpacing: 1, textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>Goals</div>
                            </div>
                            <ul style={{ paddingLeft: 0, listStyle: 'none', textAlign: 'left', width: '100%', color: '#efeada', fontSize: '1rem', margin: 0, marginTop: 8 }}>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><TrackChangesIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Goals</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><VisibilityIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Vision</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}><FavoriteIcon sx={{ fontSize: 18, color: '#d6c491', mr: 1 }} />Health</li>
                            </ul>
                        </div>
                    </Box>
                </Card>

                <Typography sx={{ color: '#bfa76a', fontWeight: 700, fontSize: 24, mb: 2 }}>Overview</Typography>

                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Left: Overall Health */}
                        <Card sx={{ flex: { xs: '1 1 100%', md: '2 1 560px' }, minWidth: 320, p: 3, background: 'linear-gradient(135deg, #181513 80%, #232323 100%)', border: '2px solid #bfa76a', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: { xs: 'auto', md: 'calc(180px * 2 + 16px)' } }}>
                        <Typography sx={{ color: '#bfa76a', fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: 16, md: 24 } }}>Overall Health</Typography>
                        <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', py: 2 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <CircularProgress variant="determinate" size={120} thickness={6} value={100} sx={{ color: '#232323' }} />
                                    <CircularProgress variant="determinate" size={120} thickness={6} value={displayProjectProgress} sx={{ color: '#d6c491', position: 'absolute', left: 0, top: 0 }} />
                                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography sx={{ color: '#F5DEB3', fontWeight: 900 }}>{displayProjectProgress}%</Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ color: '#bfa76a', mt: 1, fontSize: 13 }}>Projects Completed</Typography>
                            </Box>

                            <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <CircularProgress variant="determinate" size={120} thickness={6} value={100} sx={{ color: '#232323' }} />
                                    <CircularProgress variant="determinate" size={120} thickness={6} value={displayTaskProgress} sx={{ color: '#9aa0a6', position: 'absolute', left: 0, top: 0 }} />
                                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography sx={{ color: '#F5DEB3', fontWeight: 900 }}>{displayTaskProgress}%</Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ color: '#bfa76a', mt: 1, fontSize: 13 }}>Tasks Completed</Typography>
                            </Box>
                        </Box>
                    </Card>

                    {/* Right: 2x2 metrics */}
                        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 360px' }, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, gridAutoRows: '180px', alignItems: 'stretch' }}>
                        <Card sx={{ p: 2.5, background: 'linear-gradient(135deg, #181513 80%, #232323 100%)', border: '2px solid #bfa76a', height: '100%' }}>
                            <Typography sx={{ color: '#bfa76a', fontSize: 12, mb: 1, textAlign: 'center' }}>Total Projects</Typography>
                            <Box sx={{ textAlign: 'center' }}>
                                <FolderIcon sx={{ color: '#d6c491', fontSize: 34, mb: 1 }} />
                                <Typography sx={{ color: '#F5DEB3', fontWeight: 900, fontSize: 28 }}>{totalProjects}</Typography>
                                <Typography sx={{ color: '#bfa76a', fontSize: 12, mt: 0.5 }}>All Projects</Typography>
                            </Box>
                        </Card>

                        <Card sx={{ p: 2.5, background: 'linear-gradient(135deg, #181513 80%, #232323 100%)', border: '2px solid #bfa76a', height: '100%' }}>
                            <Typography sx={{ color: '#bfa76a', fontSize: 12, mb: 1, textAlign: 'center' }}>In Progress</Typography>
                            <Box sx={{ textAlign: 'center' }}>
                                <HourglassTopIcon sx={{ color: '#d6c491', fontSize: 34, mb: 1 }} />
                                <Typography sx={{ color: '#F5DEB3', fontWeight: 900, fontSize: 28 }}>{inProgressProjects}</Typography>
                                <Typography sx={{ color: '#bfa76a', fontSize: 12, mt: 0.5 }}>Projects</Typography>
                            </Box>
                        </Card>

                        

                        <Card sx={{ p: 2.5, background: 'linear-gradient(135deg, #181513 80%, #232323 100%)', border: '2px solid #bfa76a', height: '100%' }}>
                            <Typography sx={{ color: '#bfa76a', fontSize: 12, mb: 1, textAlign: 'center' }}>Total Tasks</Typography>
                            <Box sx={{ textAlign: 'center' }}>
                                <ListAltIcon sx={{ color: '#d6c491', fontSize: 34, mb: 1 }} />
                                <Typography sx={{ color: '#F5DEB3', fontWeight: 900, fontSize: 28 }}>{totalTasks}</Typography>
                                <Typography sx={{ color: '#bfa76a', fontSize: 12, mt: 0.5 }}>All Tasks</Typography>
                            </Box>
                        </Card>

                        <Card sx={{ p: 2.5, background: 'linear-gradient(135deg, #181513 80%, #232323 100%)', border: '2px solid #bfa76a', height: '100%' }}>
                            <Typography sx={{ color: '#bfa76a', fontSize: 12, mb: 1, textAlign: 'center' }}>In Progress</Typography>
                            <Box sx={{ textAlign: 'center' }}>
                                <TaskAltIcon sx={{ color: '#d6c491', fontSize: 34, mb: 1 }} />
                                <Typography sx={{ color: '#F5DEB3', fontWeight: 900, fontSize: 28 }}>{inProgressTasks}</Typography>
                                <Typography sx={{ color: '#bfa76a', fontSize: 12, mt: 0.5 }}>Tasks</Typography>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}

