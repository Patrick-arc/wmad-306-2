import { Head, Link, usePage } from '@inertiajs/react';
import { Box, Card, CardContent, Typography, Button, Grid, Paper, Stack, AppBar, Toolbar, Container, IconButton, Menu, MenuItem, Divider, LinearProgress, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ChecklistIcon from '@mui/icons-material/Checklist';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';
import DevicesIcon from '@mui/icons-material/Devices';
import SecurityIcon from '@mui/icons-material/Security';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Welcome() {
    const theme = useTheme();
    const user = usePage().props.auth?.user;
    const [anchorEl, setAnchorEl] = useState(null);

    const carouselImages = [
        '/images/heroSection.png',
        '/images/homePage.png',
        '/images/goalsCard.png',
        '/images/personalizedCard.png',
        '/images/plannerCard.png',
        '/images/loginBg.png',
        '/images/dailyCard.png',
    ];

    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % carouselImages.length);
        }, 3500);
        return () => clearTimeout(timeout);
    }, [current, carouselImages.length]);


    const benefitsList = [
        { key: 'templates', title: 'Project Templates', icon: <WorkspacePremiumIcon sx={{ color: '#bfa76a', fontSize: 20 }} />, text: 'Kickstart projects with reusable templates and examples.' },
        { key: 'collab', title: 'Collaboration', icon: <GroupsIcon sx={{ color: '#8fb4d1', fontSize: 20 }} />, text: 'Assign tasks, comment, and coordinate in real time.' },
        { key: 'progress', title: 'Progress Tracking', icon: <TimelineIcon sx={{ color: '#bfa76a', fontSize: 20 }} />, text: 'Visualize milestones and track completion at a glance.' },
        { key: 'report', title: 'Reporting & Insights', icon: <DevicesIcon sx={{ color: '#9dbbd1', fontSize: 20 }} />, text: 'Dashboards and reports to inform decisions.' },
    ];

    const steps = [
        {
            id: 1,
            title: 'Create Your Project',
            subtitle: 'Start fast — name the project and set objectives',
            bullets: [
                'Create a new project and add a short description',
                'Choose a template or start from scratch',
                'Set start/end dates, priority and visibility',
                'Invite teammates and assign initial roles'
            ]
        },
        {
            id: 2,
            title: 'Customize Templates & Workflows',
            subtitle: 'Tailor tasks, milestones and automation to fit your team',
            bullets: [
                'Adjust milestones, task breakdowns and deadlines',
                'Configure statuses, tags and custom fields',
                'Add automations and recurring tasks',
                'Connect integrations (calendar, Slack, Git, etc.)'
            ]
        },
        {
            id: 3,
            title: 'Plan, Assign & Schedule',
            subtitle: 'Break work into actionable tasks and assign owners',
            bullets: [
                'Create task lists, subtasks and dependencies',
                'Assign owners, estimates and due dates',
                'Prioritize work and set dependencies',
                'Sync tasks with calendar and timelines'
            ]
        },
        {
            id: 4,
            title: 'Monitor Progress & Deliver',
            subtitle: 'Use dashboards and reports to keep delivery on track',
            bullets: [
                'Track real-time progress with dashboards',
                'Run reports and delivery forecasts',
                'Collect feedback, approvals and comments',
                'Close milestones and share results'
            ]
        }
    ];

    const [activeStep, setActiveStep] = useState(0);

    // stats shown under the about text — animate as counting numbers
    const statsData = [
        { key: 'templates', value: 20, suffix: '+', label: 'Templates refined' },
        { key: 'plans', value: 1000, suffix: '+', label: 'Plans generated weekly' },
        { key: 'variants', value: 300, suffix: '+', label: 'Task variants' },
    ];

    const AnimatedNumber = ({ target, duration = 1200, suffix = '' }) => {
        const [value, setValue] = useState(0);
        useEffect(() => {
            let rafId = null;
            const start = performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const current = Math.floor(progress * target);
                setValue(current);
                if (progress < 1) rafId = requestAnimationFrame(step);
                else setValue(target);
            };
            rafId = requestAnimationFrame(step);
            return () => cancelAnimationFrame(rafId);
        }, [target, duration]);

        return <>{new Intl.NumberFormat().format(value)}{suffix}</>;
    };

    return (
        <>
            <Head title="Welcome to ProTrack" />
            <Box sx={{
                minHeight: '100vh',
                width: '100vw',
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                background: '#232323',
                color: theme.palette.text.primary,
                fontFamily: 'Nunito, Inter, Roboto, Arial, sans-serif',
            }}>
                <AppBar position="fixed" elevation={0} sx={{ background: '#181a1d', boxShadow: 'none', py: 1, top: 0, zIndex: 1300 }}>
                    <Toolbar sx={{ minHeight: 72, px: { xs: 1, md: 6 }, display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                            <RocketLaunchIcon sx={{ color: '#bfa76a', fontSize: 36, mr: 1 }} />
                            <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: 1.5, fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>
                                <Box component="span" sx={{
                                    background: 'linear-gradient(90deg, #fff 0%, #ffe6a3 40%, #c07641 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    fontWeight: 900,
                                }}>Pro</Box>
                                <Box component="span" sx={{ color: '#bfa76a', fontWeight: 900, ml: 0 }}>Track</Box>
                            </Typography>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, flex: 1, justifyContent: 'center' }}>
                            <Button href="#about" sx={{ color: '#fff', fontWeight: 400, fontSize: 16, textTransform: 'none' }} disableRipple>About Us</Button>
                            <Button href="#features" sx={{ color: '#fff', fontWeight: 400, fontSize: 16, textTransform: 'none' }} disableRipple>Features</Button>
                            <Button href="#how" sx={{ color: '#fff', fontWeight: 400, fontSize: 16, textTransform: 'none' }} disableRipple>How It Works</Button>
                            <Button component={Link} href={route('dashboard')} sx={{ color: '#fff', fontWeight: 400, fontSize: 16, textTransform: 'none' }} disableRipple>Dashboard</Button>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {user ? (
                                <>
                                    <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: '#DEB887', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AccountCircleIcon />
                                        <Typography variant="body2" sx={{ textTransform: 'none', color: '#F5DEB3', display: { xs: 'none', sm: 'block' } }}>{user.name}</Typography>
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        PaperProps={{ sx: { backgroundColor: '#1a1410', backgroundImage: 'linear-gradient(135deg, #1a1410 0%, #0F0D0A 100%)', border: '1px solid rgba(212, 175, 123, 0.2)' } }}
                                    >
                                        <MenuItem component={Link} href={route('profile.edit')} onClick={() => setAnchorEl(null)} sx={{ color: '#DEB887', '&:hover': { backgroundColor: 'rgba(210, 105, 30, 0.2)' } }}>
                                            Profile
                                        </MenuItem>
                                        <Divider sx={{ borderColor: 'rgba(212, 175, 123, 0.2)' }} />
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorEl(null);
                                                window.axios.post(route('logout')).then(() => { window.location.href = '/'; });
                                            }}
                                            sx={{ color: '#FF6B6B', '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.08)' } }}
                                        >
                                            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                                            Log Out
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button component={Link} href={route('login')} sx={{ color: '#fff', fontWeight: 500, fontSize: 16, textTransform: 'none', px: 2 }} variant="text">Login</Button>
                                    <Button component={Link} href={route('register')} sx={{ fontWeight: 700, fontSize: 16, textTransform: 'none', px: 3, borderRadius: 2, background: '#bfa76a', color: '#181a1d', '&:hover': { background: '#a08a4a' } }} variant="contained">Start Free</Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* spacer to offset fixed AppBar height so content doesn't jump under it */}
                <Toolbar sx={{ minHeight: 72 }} />

                {/* Hero Section with Carousel */}
                <Box sx={{ position: 'relative', width: '100vw', minHeight: { xs: '70vh', md: '90vh' }, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {carouselImages.map((img, idx) => (
                        <Box key={img} component="img" src={img} alt="ProTrack showcase" sx={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: { xs: '70vh', md: '90vh' }, objectFit: 'cover', objectPosition: 'center', opacity: idx === current ? 1 : 0, transition: 'opacity 1s', zIndex: 1 }} />
                    ))}
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: { xs: '70vh', md: '90vh' }, background: 'rgba(30,30,30,0.65)', zIndex: 2 }} />
                    <Box sx={{ position: 'relative', zIndex: 3, textAlign: 'center', width: '100%', px: 2 }}>
                        <Typography variant="h2" fontWeight={900} sx={{ color: '#fff', mb: 2, letterSpacing: 1.5, fontSize: { xs: 32, md: 56 } }}>Your Perfect Project Plan</Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#bfa76a', mb: 3, fontSize: { xs: 28, md: 48 } }}>In Seconds</Typography>
                        <Typography variant="h6" sx={{ color: '#fff', mb: 4, fontWeight: 400, maxWidth: 700, mx: 'auto' }}>Organize your workflow, collaborate in real time, and keep your goals on track—all in one beautiful, intuitive platform.</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
                            <Button component={Link} href={route('register')} size="large" variant="contained" sx={{ fontWeight: 800, fontSize: 20, borderRadius: 3, px: 4, py: 1.5, background: '#bfa76a', color: '#181a1d', '&:hover': { background: '#a08a4a' } }}>Get Started Free</Button>
                            <Button component={Link} href={route('login')} size="large" variant="outlined" color="primary" sx={{ fontWeight: 700, fontSize: 20, borderRadius: 3, px: 4, py: 1.5, color: '#fff', borderColor: '#fff', '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main } }}>See How It Works</Button>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                            {carouselImages.map((_, idx) => (
                                <Box key={idx} onClick={() => setCurrent(idx)} sx={{ width: 12, height: 12, borderRadius: '50%', background: idx === current ? theme.palette.primary.main : '#fff', opacity: idx === current ? 0.9 : 0.4, transition: 'background 0.3s, opacity 0.3s', cursor: 'pointer' }} />
                            ))}
                        </Stack>

                        
                    </Box>
                </Box>

                

                {/* Main Content removed per request */}

                

                {/* About / Benefits Section */}
                <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 }, mb: { xs: 6, md: 10 }, scrollMarginTop: { xs: '80px', md: '88px' } }}>
                    <Grid container spacing={6} alignItems="stretch" sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, scrollMarginTop: { xs: '80px', md: '88px' } }} id="about">
                        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'stretch', justifyContent: 'space-between' }}>
                            <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 30px 60px rgba(16,24,40,0.12)', width: '100%' }}>
                                <Box
                                    component="img"
                                    src="/images/homePage.png"
                                    alt="about image"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        minHeight: { xs: 180, md: 320 },
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        display: 'block',
                                        borderRadius: 0,
                                        backgroundColor: 'rgba(0,0,0,0.02)'
                                    }}
                                />
                            </Card>

                            <Paper elevation={0} sx={{ mt: { xs: 2, md: 0 }, p: 2, borderRadius: 2, background: 'linear-gradient(180deg, rgba(10,10,10,0.6), rgba(20,20,20,0.5))', border: '1px solid rgba(255,255,255,0.03)', width: '100%', maxHeight: { md: 360 }, overflow: 'hidden' }}>
                                <Typography variant="subtitle1" sx={{ color: '#bfa76a', fontWeight: 800, mb: 1 }}>Benefits</Typography>
                                <Box sx={{ display: 'grid', gap: 0.75 }}>
                                    {benefitsList.map((b) => (
                                        <Paper
                                            key={b.key}
                                            elevation={0}
                                            sx={{
                                                p: 0.75,
                                                display: 'flex',
                                                gap: 1.25,
                                                alignItems: 'center',
                                                borderRadius: 1,
                                                backgroundColor: 'rgba(255,255,255,0.02)',
                                                transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
                                                '&:hover': {
                                                    transform: 'translateY(-6px)',
                                                    boxShadow: '0 12px 34px rgba(0,0,0,0.45)',
                                                    backgroundColor: 'rgba(255,255,255,0.035)',
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        >
                                            <Box sx={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 1 }}>
                                                {b.icon}
                                            </Box>
                                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{b.title}</Typography>
                                        </Paper>
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', height: '100%', pl: { md: 6 } }}>
                            <Typography variant="overline" sx={{ color: '#9aa4ad', letterSpacing: 2, mb: 2 }}>ABOUT US</Typography>
                            <Typography variant="h3" sx={{ color: '#fff', fontWeight: 900, mb: 3, lineHeight: 1.05 }}>
                                We build the <Box component="span" sx={{ color: '#8fb4d1' }}>smartest</Box> path to your <Box component="span" sx={{ color: '#bfa76a' }}>strongest</Box> project outcomes.
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#cfd6d9', mb: 2 }}>
                                ProTrack is a focused, modern project management platform built to reduce overhead and help teams deliver outcomes faster. It combines intelligent, customizable project templates with flexible task lists, subtasks, and milestone workflows so you can structure work the way your team actually operates. Built-in assignment, commenting, and real-time updates keep stakeholders coordinated, while fine-grained permissions and audit trails give managers the control they need.
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#cfd6d9', mb: 2 }}>
                                Beyond day-to-day task management, ProTrack provides automated notifications, calendar sync, and integrations with common tools so your work stays connected across systems. Powerful reporting and dashboards surface progress, bottlenecks, and delivery forecasts so you can make decisions with confidence. We designed ProTrack to scale from one-person projects to cross-functional programs — fast to start, and flexible enough to grow with you.
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#9aa4ad', mb: 3 }}>
                                Skip setup headaches — get started with curated templates, invite teammates, and track progress in one place designed for speed, clarity, and predictable delivery.
                            </Typography>

                            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
                                <Chip label="Templates" sx={{ bgcolor: 'rgba(191,167,106,0.12)', color: '#f1e7c8', fontWeight: 700 }} />
                                <Chip label="Evidence-based" sx={{ bgcolor: 'rgba(143,180,209,0.08)', color: '#cfe6f5', fontWeight: 700 }} />
                                <Chip label="Built-in reporting" sx={{ bgcolor: 'rgba(143,180,209,0.06)', color: '#dfeef8', fontWeight: 700 }} />
                            </Stack>

                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {statsData.map((s) => (
                                    <Grid item xs={4} key={s.key}>
                                        <Box>
                                            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900 }}>
                                                <AnimatedNumber target={s.value} suffix={s.suffix} />
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#9aa4ad' }}>{s.label}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

                {/* Reinsert Features section (swapped) */}
                <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: '#fff', py: { xs: 6, md: 10 } }}>
                    <Container id="features" maxWidth="lg" sx={{ scrollMarginTop: { xs: '80px', md: '88px' } }}>
                        <Grid container spacing={4} alignItems="flex-start" sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                            <Grid item xs={12} md={6} sx={{ scrollMarginTop: { xs: '80px', md: '88px' } }}>
                                        <Typography variant="h4" sx={{ color: '#0f1720', fontWeight: 900, mb: 1, letterSpacing: 1 }}>FEATURES</Typography>
                                <Box sx={{ width: 64, height: 6, borderRadius: 2, background: '#bfa76a', mb: 3 }} />
                                <Typography variant="body1" sx={{ color: '#222', mb: 4, maxWidth: 720 }}>ProTrack helps teams and individuals plan, execute, and measure project work efficiently. Below are three main capabilities that make ProTrack powerful for real work.</Typography>
                                <Stack spacing={3}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, rgba(191,167,106,0.20) 0%, rgba(244,228,184,0.14) 55%, rgba(255,255,255,0.04) 100%)',
                                            color: '#0f1720',
                                            boxShadow: '0 8px 24px rgba(16,24,40,0.08)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'transform 220ms ease, box-shadow 220ms ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px) scale(1.02)',
                                                boxShadow: '0 18px 48px rgba(191,167,106,0.18)',
                                            },
                                        }}
                                    >
                                            <Box sx={{ width: 64, height: 64, borderRadius: 2, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                                <ChecklistIcon sx={{ color: '#663f10', fontSize: 28 }} />
                                            </Box>
                                            <Box sx={{ zIndex: 2 }}>
                                                <Typography variant="h6" sx={{ color: '#0f1720', fontWeight: 800 }}>Smart Project Templates</Typography>
                                                <Typography variant="body2" sx={{ color: '#3b3b3b' }}>Kickstart projects with reusable templates, task breakdowns, and milestone examples so you can launch consistently and quickly.</Typography>
                                            </Box>
                                        </Paper>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, rgba(191,167,106,0.18) 0%, rgba(232,215,177,0.14) 50%, rgba(191,167,106,0.18) 100%)',
                                            color: '#0f1720',
                                            boxShadow: '0 8px 24px rgba(16,24,40,0.08)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'transform 240ms cubic-bezier(.2,.9,.2,1), box-shadow 240ms',
                                            '&:hover': {
                                                transform: 'translateY(-6px) rotate(-1deg) scale(1.018)',
                                                boxShadow: '0 20px 50px rgba(102,62,6,0.18)',
                                            },
                                        }}
                                    >
                                        <Box sx={{ width: 64, height: 64, borderRadius: 2, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                            <TimelineIcon sx={{ color: '#663f10', fontSize: 28 }} />
                                        </Box>
                                        <Box sx={{ zIndex: 2 }}>
                                            <Typography variant="h6" sx={{ color: '#0f1720', fontWeight: 800 }}>Real-time Collaboration</Typography>
                                            <Typography variant="body2" sx={{ color: '#3b3b3b' }}>Assign tasks, comment inline, and see updates live — keep everyone in sync across projects and sprints.</Typography>
                                        </Box>
                                    </Paper>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, rgba(191,167,106,0.16) 0%, rgba(241,228,196,0.12) 45%, rgba(209,185,132,0.14) 100%)',
                                            color: '#0f1720',
                                            boxShadow: '0 8px 24px rgba(16,24,40,0.08)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'transform 200ms ease, box-shadow 200ms ease, filter 200ms ease',
                                            '&:hover': {
                                                transform: 'translateY(-7px) scale(1.017)',
                                                boxShadow: '0 22px 60px rgba(191,167,106,0.24)',
                                                filter: 'brightness(1.02)'
                                            },
                                        }}
                                    >
                                        <Box sx={{ width: 64, height: 64, borderRadius: 2, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                            <GroupsIcon sx={{ color: '#663f10', fontSize: 28 }} />
                                        </Box>
                                        <Box sx={{ zIndex: 2 }}>
                                            <Typography variant="h6" sx={{ color: '#0f1720', fontWeight: 800 }}>Progress & Insights</Typography>
                                            <Typography variant="body2" sx={{ color: '#3b3b3b' }}>Dashboards, completion rates, and reports give you visibility into progress so you can make data-driven decisions.</Typography>
                                        </Box>
                                    </Paper>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ borderRadius: '24px', p: 2, background: '#fff', boxShadow: '0 30px 60px rgba(16,24,40,0.12), 0 8px 20px rgba(16,24,40,0.06)', overflow: 'hidden' }}>
                                        <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', width: '100%', aspectRatio: { xs: '1 / 1', md: '0.92 / 1' }, minHeight: { md: 520 } }}>
                                            <Box
                                                component="img"
                                                src="/images/features.png"
                                                alt="our services"
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    objectPosition: 'center',
                                                    display: 'block',
                                                    filter: 'brightness(1.12) contrast(1.02) saturate(0.95)',
                                                    WebkitFilter: 'brightness(1.12) contrast(1.02) saturate(0.95)',
                                                    backgroundColor: '#ffffff',
                                                }}
                                            />

                                            {/* white overlay at bottom to mask any residual grey gradient in the image */}
                                            <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: { xs: '16%', md: '14%' }, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 70%)', pointerEvents: 'none' }} />
                                        </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* How It Works section */}
                <Box id="how" sx={{ width: '100%', py: { xs: 8, md: 14 }, backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.6), rgba(10,10,10,0.85)), url('/images/howItWorks.png')`, backgroundSize: { xs: 'cover', md: '60% auto' },
                    backgroundPosition: { xs: 'center center', md: '80% 32%' },
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#0a0a0a',
                    color: '#fff',
                    position: 'relative',
                    minHeight: { md: '70vh' },
                    /* leave ~24px of the image visible under the navbar when navigating to #how */
                    scrollMarginTop: { xs: '48px', md: '48px' } }}>
                    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', px: 2, py: 0.5, borderRadius: 3, mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#e6d9b0', fontWeight: 700 }}>TAKES JUST 2 MINUTES</Typography>
                        </Box>
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: 28, md: 44 }, mb: 2 }}>How It <Box component="span" sx={{ color: '#bfa76a' }}>Works</Box></Typography>
                        <Typography variant="body1" sx={{ color: '#cfcfcf', maxWidth: 720, mx: 'auto', mb: 3 }}>Four simple steps to launch your project with ProTrack — create a project, customize workflows, assign work, and monitor delivery with built-in reporting so your team starts quickly and stays on track.</Typography>

                        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
                            {steps.map((s, i) => (
                                <Button key={s.id} onClick={() => setActiveStep(i)} sx={{ minWidth: 72, borderRadius: 2, px: 2, py: 1, background: i === activeStep ? '#bfa76a' : 'rgba(255,255,255,0.04)', color: i === activeStep ? '#181a1d' : '#fff', fontWeight: 700, '&:hover': { background: i === activeStep ? '#a08a4a' : 'rgba(255,255,255,0.06)' } }}>{`Step ${s.id}`}</Button>
                            ))}
                        </Stack>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: { xs: '100%', md: '78%' }, borderRadius: 3, p: { xs: 2, md: 4 }, background: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.45))', border: '1px solid rgba(191,167,106,0.12)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
                                    <Box sx={{ width: 80, height: 80, borderRadius: 2, background: 'linear-gradient(180deg,#bfa76a,#c7b08a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 28, color: '#181a1d' }}>{steps[activeStep].id}</Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900 }}>{steps[activeStep].title}</Typography>
                                        <Typography variant="body2" sx={{ color: '#d1d1d1', mb: 2 }}>{steps[activeStep].subtitle}</Typography>

                                        <Grid container spacing={2}>
                                            {steps[activeStep].bullets.map((b, idx) => (
                                                <Grid item xs={12} md={6} key={idx}>
                                                    <Paper elevation={0} sx={{ p: 2, borderRadius: 1.5, background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box sx={{ width: 28, height: 28, borderRadius: 0.75, background: 'rgba(191,167,106,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bfa76a' }}>✓</Box>
                                                        <Typography variant="body2" sx={{ color: '#f1f1f1' }}>{b}</Typography>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Stack>

                                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 3 }}>
                                    {steps.map((_, i) => (
                                        <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', background: i === activeStep ? '#bfa76a' : 'rgba(255,255,255,0.18)', opacity: i === activeStep ? 1 : 0.6 }} />
                                    ))}
                                </Stack>

                                <Box sx={{ textAlign: 'center', mt: 3 }}>
                                    <Button component={Link} href={route('register')} variant="contained" sx={{ background: '#bfa76a', color: '#181a1d', px: 4, py: 1.25, borderRadius: 2, fontWeight: 800, '&:hover': { background: '#a08a4a' } }}>Get Started Free</Button>
                                </Box>
                            </Card>
                        </Box>
                    </Container>
                </Box>

                {/* Footer (ProTrack) */}
                <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: '#f5f7fa', py: { xs: 6, md: 12 }, color: '#111827' }}>
                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                        <Grid container spacing={4} alignItems="flex-start">
                            <Grid item xs={12} md={7}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <RocketLaunchIcon sx={{ color: '#bfa76a', fontSize: 36 }} />
                                    <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: 1.5, fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>
                                        <Box component="span" sx={{
                                            background: 'linear-gradient(90deg, #ffe6a3 0%, #bfa76a 60%, #c07641 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            color: 'transparent',
                                            fontWeight: 900,
                                        }}>Pro</Box>
                                        <Box component="span" sx={{ color: '#bfa76a', fontWeight: 900, ml: 0 }}>Track</Box>
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="subtitle2" sx={{ color: '#6b7280', fontWeight: 800, mb: 1 }}>FEATURES</Typography>
                                        <Box sx={{ display: 'grid', gap: 0.5 }}>
                                            <Box component={Link} href="#features" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Project Templates</Box>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Custom Workflows</Box>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Reporting & Dashboards</Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="subtitle2" sx={{ color: '#6b7280', fontWeight: 800, mb: 1 }}>LEARN</Typography>
                                        <Box sx={{ display: 'grid', gap: 0.5 }}>
                                            <Box component={Link} href="#how" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>How It Works</Box>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Blog</Box>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Resources</Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="subtitle2" sx={{ color: '#6b7280', fontWeight: 800, mb: 1 }}>EVALUATE</Typography>
                                        <Box sx={{ display: 'grid', gap: 0.5 }}>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Pricing</Box>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Case Studies</Box>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>FAQ</Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="subtitle2" sx={{ color: '#6b7280', fontWeight: 800, mb: 1 }}>COMPANY</Typography>
                                        <Box sx={{ display: 'grid', gap: 0.5 }}>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>About</Box>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Careers</Box>
                                            <Box component={Link} href="#" sx={{ color: '#374151', display: 'block', textDecoration: 'none' }}>Contact</Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Typography variant="overline" sx={{ color: '#9aa4ad', letterSpacing: 1.5 }}>START YOUR PROJECT</Typography>
                                <Typography variant="h5" sx={{ color: '#111827', fontWeight: 900, mb: 2 }}>Launch faster with ProTrack</Typography>
                                <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>Create a project, invite teammates, and track delivery with built-in dashboards and automated reports.</Typography>
                                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                                    <Button component={Link} href={route('register')} variant="contained" sx={{ background: '#bfa76a', color: '#181a1d', px: 3, py: 1.25, '&:hover': { background: '#a08a4a' } }}>Build My Project</Button>
                                    <Button component={Link} href={route('login')} variant="outlined" sx={{ color: '#111827', borderColor: '#e5e7eb' }}>Sign In</Button>
                                </Stack>

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: '#111827', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><WorkspacePremiumIcon sx={{ fontSize: 18 }} /></Box>
                                    <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: '#111827', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GroupsIcon sx={{ fontSize: 18 }} /></Box>
                                    <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: '#111827', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DevicesIcon sx={{ fontSize: 18 }} /></Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>


                    {/* Bottom legal */}
                    <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.06)', mt: 4, pt: 3 }}>
                        <Container maxWidth="lg">
                            <Grid container alignItems="center" sx={{ justifyContent: 'space-between' }}>
                                <Grid item xs={'auto'}>
                                    <Typography variant="body2" sx={{ color: '#6b7280' }}>© {new Date().getFullYear()} ProTrack — All rights reserved.</Typography>
                                </Grid>
                                <Grid item xs={'auto'} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Stack direction="row" spacing={3} sx={{ ml: 2 }}>
                                        <Box component={Link} href="#" sx={{ color: '#374151', textDecoration: 'none' }}>Privacy Policy</Box>
                                        <Box component={Link} href="#" sx={{ color: '#374151', textDecoration: 'none' }}>Terms & Conditions</Box>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>

            </Box>
        </>
    );
}
