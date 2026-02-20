import React from 'react';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import FolderIcon from '@mui/icons-material/Folder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MovieIcon from '@mui/icons-material/Movie';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Head, Link, router } from '@inertiajs/react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Button,
    LinearProgress,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    TextField,
    Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Dashboard({ projects = [], tasks = [] }) {
    const completedTasks = tasks.filter((t) => t.status === 'done').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
    const todoTasks = tasks.filter((t) => t.status === 'todo').length;
    const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

        // Softer, less bright colors for priority chips
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

    // Project creation modal state and logic (copied from Projects/Index.jsx)
    const [formOpen, setFormOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [displayProgress, setDisplayProgress] = React.useState(0);
    const animRef = React.useRef(null);

    const animateTo = (target, duration = 800) => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        const start = performance.now();
        const from = displayProgress;
        const step = (now) => {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
            const val = Math.round(from + (target - from) * eased);
            setDisplayProgress(val);
            if (t < 1) animRef.current = requestAnimationFrame(step);
        };
        animRef.current = requestAnimationFrame(step);
    };
    function submit(e) {
        e.preventDefault();
        const data = { title, description };
        router.post(route('projects.store'), data, {
            onSuccess: () => {
                setTitle('');
                setDescription('');
                setFormOpen(false);
            },
        });
    }

    React.useEffect(() => {
        // animate progress on mount to give the dynamic fill effect
        animateTo(completionRate);
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completionRate]);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            {/* Hero Section with headline and buttons */}
            <Box sx={{
                width: { xs: '100%', md: '100%', lg: '95%' },
                minHeight: 320,
                background: `url('/images/heroSection.png') center/cover no-repeat`,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                mb: { xs: 6, md: 8 }, // Add more space below hero
                mx: 'auto',
                overflow: 'hidden',
            }}>
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(24,21,19,0.10) 0%, rgba(24,21,19,0.85) 100%)',
                    zIndex: 1,
                }} />
                <Box sx={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pt: 6, pb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: { xs: '2.2rem', md: '3.2rem' },
                            textAlign: 'center',
                            mb: 3,
                            textShadow: '0 2px 16px rgba(0,0,0,0.25)'
                        }}
                    >
                        Organize your Life.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button variant="contained" sx={{
                            background: '#bfa76a',
                            color: '#181513',
                            fontWeight: 700,
                            fontSize: '1rem',
                            px: 3,
                            py: 1.2,
                            borderRadius: '10px',
                            boxShadow: '0 2px 8px 0 rgba(191,167,106,0.15)',
                            '&:hover': { background: '#d6c491' },
                        }}
                        onClick={() => {
                            window.location.href = '/projects?new=1';
                        }}
                        >
                            + New Project
                        </Button>
                        <Link href="/tasks" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{
                                color: '#fff',
                                borderColor: '#bfa76a',
                                fontWeight: 700,
                                fontSize: '1rem',
                                px: 3,
                                py: 1.2,
                                borderRadius: '10px',
                                background: 'rgba(24,21,19,0.35)',
                                transition: 'all 200ms ease',
                                '&:hover': {
                                    borderColor: '#d6c491',
                                    background: 'linear-gradient(135deg, rgba(191,167,106,0.12), rgba(191,167,106,0.06))',
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 8px 24px rgba(191,167,106,0.12)',
                                },
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <TaskAltIcon sx={{ fontSize: 20, mr: 1, color: '#bfa76a' }} /> View Tasks
                                </span>
                            </Button>
                        </Link>
                    </Box>
                    {/* Project Create Modal Form */}
                    <Collapse in={formOpen} sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 10, mt: 2 }}>
                        <Card sx={{ position: 'relative', maxWidth: 420, mx: 'auto', p: 3, borderRadius: 3, boxShadow: 6 }}>
                            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                                <Button onClick={() => setFormOpen(false)} size="small" sx={{ color: '#DEB887' }} startIcon={<ArrowBackIcon />}>Cancel</Button>
                            </Box>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#F5DEB3' }}>
                                Create New Project
                            </Typography>
                            <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
                                <TextField
                                    name="title"
                                    label="Project Title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    fullWidth
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    name="description"
                                    label="Description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    sx={{ mb: 2 }}
                                />
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                    <Button onClick={() => setFormOpen(false)} sx={{ color: '#DEB887' }}>Cancel</Button>
                                    <Button type="submit" variant="contained" sx={{ background: 'linear-gradient(135deg, #bfa76a 0%, #d6c491 100%)', color: '#181513', fontWeight: 600 }}>
                                        Create
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Collapse>
                </Box>
            </Box>

            {/* Card Row Section - No outer card, no Lofi Style text */}
            <Box sx={{
                width: { xs: '100%', md: '100%', lg: '95%' },
                maxWidth: 'none',
                mx: 'auto',
                background: '#181513',
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                pl: { xs: 0, md: 4 },
                pr: { xs: 2, md: 6 },
                mt: { xs: 0, md: 0 },
                mb: { xs: 3, md: 5 },
                boxSizing: 'border-box',
                pb: 4,
            }}>
                
                <Box sx={{
                    display: 'block',
                    paddingTop: 6,
                }}>
                    <Box sx={{ width: { xs: '100%', md: '100%', lg: '95%' }, mx: 'auto', px: { xs: 0, md: 2 } }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: 3,
                            flexWrap: 'nowrap',
                            overflow: 'visible',
                            maxWidth: 1200,
                            mx: 'auto',
                            px: 1,
                        }}>
                    {/* Daily Card + List */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 calc(25% - 24px)', maxWidth: 'calc(25% - 24px)', minWidth: 220 }}>
                            <div className="dashboard-card" style={{ width: '100%', height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundImage: "url('/images/dailyCard.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', border: 'none', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(60, 40, 20, 0.10)', transition: 'box-shadow 0.2s', marginBottom: 12, marginTop: 2 }}>
                                <div style={{ color: '#fff', fontWeight: 700, fontSize: '2.4rem', textAlign: 'center', letterSpacing: 1 }}>Daily</div>
                            </div>
                            <ul style={{ paddingLeft: 0, listStyle: 'none', textAlign: 'left', width: '100%', color: '#fff', fontSize: '1rem', margin: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><CalendarMonthIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Routine</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><CheckIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Habits</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><EditNoteIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Journal</li>
                            </ul>
                        </div>
                    {/* Planners Card + List */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 calc(25% - 24px)', maxWidth: 'calc(25% - 24px)', minWidth: 220 }}>
                            <div className="dashboard-card" style={{ width: '100%', height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundImage: "url('/images/plannerCard.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', border: 'none', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(60, 40, 20, 0.10)', transition: 'box-shadow 0.2s', marginBottom: 12, marginTop: 2 }}>
                                <div style={{ color: '#fff', fontWeight: 700, fontSize: '2.4rem', textAlign: 'center', letterSpacing: 1 }}>Planners</div>
                            </div>
                            <ul style={{ paddingLeft: 0, listStyle: 'none', textAlign: 'left', width: '100%', color: '#fff', fontSize: '1rem', margin: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><RestaurantMenuIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Meal Planner</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><FlightTakeoffIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Travel Planner</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><FitnessCenterIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Workout Planner</li>
                            </ul>
                        </div>
                    {/* Personal Card + List */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 calc(25% - 24px)', maxWidth: 'calc(25% - 24px)', minWidth: 220 }}>
                            <div className="dashboard-card" style={{ width: '100%', height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundImage: "url('/images/personalizedCard.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', border: 'none', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(60, 40, 20, 0.10)', transition: 'box-shadow 0.2s', marginBottom: 12, marginTop: 2 }}>
                                <div style={{ color: '#fff', fontWeight: 700, fontSize: '2.4rem', textAlign: 'center', letterSpacing: 1 }}>Personal</div>
                            </div>
                            <ul style={{ paddingLeft: 0, listStyle: 'none', textAlign: 'left', width: '100%', color: '#fff', fontSize: '1rem', margin: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><MenuBookIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Bookshelf</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><MovieIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Movies & Series</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><AttachMoneyIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Finance</li>
                            </ul>
                        </div>
                    {/* Goals Card + List */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 calc(25% - 24px)', maxWidth: 'calc(25% - 24px)', minWidth: 220 }}>
                            <div className="dashboard-card" style={{ width: '100%', height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundImage: "url('/images/goalsCard.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', border: 'none', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(60, 40, 20, 0.10)', transition: 'box-shadow 0.2s', marginBottom: 12, marginTop: 2 }}>
                                <div style={{ color: '#fff', fontWeight: 700, fontSize: '2.4rem', textAlign: 'center', letterSpacing: 1 }}>Goals</div>
                            </div>
                            <ul style={{ paddingLeft: 0, listStyle: 'none', textAlign: 'left', width: '100%', color: '#fff', fontSize: '1rem', margin: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><TrackChangesIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Goals</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><VisibilityIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Vision</li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}><FavoriteIcon sx={{ fontSize: 18, color: '#bdb76b', mr: 1 }} />Health</li>
                            </ul>
                        </div>
                        </Box>
                    </Box>
                </Box>
            </Box>
                        {/* --- OVERVIEW COCKPIT SECTION --- */}
                                                <Box sx={{ width: { xs: '100%', md: '100%', lg: '95%' }, mx: 'auto', maxWidth: 1300, px: { xs: 0, md: 0 }, mb: 0 }}>
                                                        <Typography sx={{ color: '#bfa76a', fontWeight: 700, fontSize: 24, mb: 1, letterSpacing: 1, textAlign: 'left' }}>Overview</Typography>
                                                        <Box sx={{
                                                                display: 'flex',
                                                                flexDirection: { xs: 'column', md: 'row' },
                                                                gap: 3,
                                                                mb: 4,
                                                                mt: { xs: 2, md: 4 },
                                                                px: { xs: 0, md: 2 },
                                                                alignItems: 'stretch',
                                                        }}>
                                                                {/* Project Pulse */}
                                                                <Card
                                                                    sx={{
                                                                        flex: 1,
                                                                        background: 'linear-gradient(135deg, #181513 80%, #232323 100%)',
                                                                        borderRadius: 4,
                                                                        p: 2.5,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignItems: 'center',
                                                                        border: '2px solid #bfa76a',
                                                                        boxShadow: '0 2px 16px 0 rgba(191,167,106,0.13)',
                                                                        transition: 'transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s, background-position 0.6s',
                                                                        '&:hover': {
                                                                            transform: 'translateY(-8px) scale(1.06) rotate(-0.6deg)',
                                                                            boxShadow: '0 14px 40px 0 #bfa76a33',
                                                                            borderColor: '#fff8e1',
                                                                            backgroundPosition: 'center top',
                                                                        },
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                        <Typography sx={{ color: '#bfa76a', fontWeight: 700, fontSize: 17, mb: 0.5, letterSpacing: 1 }}>Project Pulse</Typography>
                                                                        <Typography sx={{ color: '#F5DEB3', fontWeight: 900, fontSize: 32 }}>{projects.length}</Typography>
                                                                        <Typography sx={{ color: '#bfa76a', fontWeight: 500, fontSize: 14, mt: 0.5 }}>Active Projects</Typography>
                                                                </Card>
                                                                {/* Total Tasks */}
                                                                <Card
                                                                    sx={{
                                                                        flex: 1,
                                                                        background: 'linear-gradient(135deg, #181513 80%, #232323 100%)',
                                                                        borderRadius: 4,
                                                                        p: 2.5,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignItems: 'center',
                                                                        border: '2px solid #bfa76a',
                                                                        boxShadow: '0 2px 16px 0 rgba(191,167,106,0.13)',
                                                                        transition: 'transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s, background-position 0.6s',
                                                                        '&:hover': {
                                                                            transform: 'translateY(-8px) scale(1.06) rotate(-0.6deg)',
                                                                            boxShadow: '0 14px 40px 0 #bfa76a33',
                                                                            borderColor: '#fff8e1',
                                                                            backgroundPosition: 'center top',
                                                                        },
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                        <Typography sx={{ color: '#bfa76a', fontWeight: 700, fontSize: 17, mb: 0.5, letterSpacing: 1 }}>Total Tasks</Typography>
                                                                        <Typography sx={{ color: '#F5DEB3', fontWeight: 900, fontSize: 32 }}>{tasks.length}</Typography>
                                                                        <Typography sx={{ color: '#bfa76a', fontWeight: 500, fontSize: 14, mt: 0.5 }}>All Tasks</Typography>
                                                                </Card>
                                                                {/* In Progress Tasks */}
                                                                <Card
                                                                    sx={{
                                                                        flex: 1,
                                                                        background: 'linear-gradient(135deg, #181513 80%, #232323 100%)',
                                                                        borderRadius: 4,
                                                                        p: 2.5,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignItems: 'center',
                                                                        border: '2px solid #bfa76a',
                                                                        boxShadow: '0 2px 16px 0 rgba(191,167,106,0.13)',
                                                                        transition: 'transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s, background-position 0.6s',
                                                                        '&:hover': {
                                                                            transform: 'translateY(-8px) scale(1.06) rotate(-0.6deg)',
                                                                            boxShadow: '0 14px 40px 0 #bfa76a33',
                                                                            borderColor: '#fff8e1',
                                                                            backgroundPosition: 'center top',
                                                                        },
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                        <Typography sx={{ color: '#bfa76a', fontWeight: 700, fontSize: 17, mb: 0.5, letterSpacing: 1 }}>In Progress</Typography>
                                                                        <Typography sx={{ color: '#F5DEB3', fontWeight: 900, fontSize: 32 }}>{tasks.filter(t => t.status === 'in_progress').length}</Typography>
                                                                        <Typography sx={{ color: '#bfa76a', fontWeight: 500, fontSize: 14, mt: 0.5 }}>Tasks</Typography>
                                                                </Card>
                                                                {/* Completion % */}
                                                                <Card
                                                                    onMouseEnter={() => animateTo(completionRate)}
                                                                    sx={{
                                                                        flex: 1,
                                                                        background: 'linear-gradient(135deg, #181513 80%, #232323 100%)',
                                                                        borderRadius: 4,
                                                                        p: 2.5,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignItems: 'center',
                                                                        border: '2px solid #bfa76a',
                                                                        boxShadow: '0 2px 16px 0 rgba(191,167,106,0.13)',
                                                                        transition: 'transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s, background-position 0.6s',
                                                                        '&:hover': {
                                                                            transform: 'translateY(-8px) scale(1.06) rotate(-0.6deg)',
                                                                            boxShadow: '0 14px 40px 0 #bfa76a33',
                                                                            borderColor: '#fff8e1',
                                                                            backgroundPosition: 'center top',
                                                                        },
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                    <Typography sx={{ color: '#bfa76a', fontWeight: 700, fontSize: 17, mb: 0.5, letterSpacing: 1 }}>Completion</Typography>
                                                                    <Box sx={{ width: '100%', mb: 1 }}>
                                                                        <LinearProgress
                                                                            variant="determinate"
                                                                            value={displayProgress}
                                                                            sx={{ height: 10, borderRadius: 5, background: '#232323', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg,#d6c491,#bfa76a)' }, transition: 'all 350ms ease' }}
                                                                        />
                                                                    </Box>
                                                                    <Typography sx={{ color: '#F5DEB3', fontWeight: 900, fontSize: 18 }}>{displayProgress}%</Typography>
                                                                </Card>
                                                        </Box>
                                                </Box>
        </AuthenticatedLayout>
    );
}
