import {
    AppBar,
    Box,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import FolderIcon from '@mui/icons-material/Folder';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Button from '@mui/material/Button';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
        setDrawerOpen(open);
    };

    const navItems = [
        { label: 'Dashboard', href: route('dashboard'), icon: <DashboardIcon sx={{ mr: 1.5, color: '#bfa76a' }} /> },
        { label: 'Projects', href: route('projects.index'), icon: <FolderIcon sx={{ mr: 1.5, color: '#bfa76a' }} /> },
        { label: 'Tasks', href: route('tasks.index'), icon: <TaskIcon sx={{ mr: 1.5, color: '#bfa76a' }} /> },
    ];

    const drawerContent = (
        <Box sx={{ width: 280, backgroundColor: '#1a1410', height: '100%', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#F5DEB3', fontWeight: 700, mb: 3 }}>
                Project Tracker
            </Typography>
            <Divider sx={{ borderColor: 'rgba(212, 175, 123, 0.2)', mb: 2 }} />
            <List sx={{ pt: 0 }}>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            component={Link}
                            href={item.href}
                            sx={{
                                color: '#DEB887',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: 'rgba(210, 105, 30, 0.2)',
                                    color: '#F5DEB3',
                                },
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f2efe9' }}>
            {/* AppBar */}
            <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                <Toolbar disableGutters sx={{ minHeight: 64, px: { xs: 2, md: 4 } }}>
                    {/* Logo and brand, left-aligned */}
                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 180 }}>
                        <Button
                            href="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'none',
                                boxShadow: 'none',
                                p: 0,
                                minWidth: 0,
                                '&:hover': { background: 'none' },
                            }}
                            disableRipple
                        >
                            <RocketLaunchIcon sx={{ color: '#bfa76a', fontSize: 36, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    fontWeight: 900,
                                    letterSpacing: 1.5,
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    display: 'inline',
                                }}
                            >
                                <Box component="span" sx={{
                                    background: 'linear-gradient(90deg, #fff 0%, #ffe6a3 40%, #c07641 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    fontWeight: 900,
                                    mr: 0,
                                }}>Pro</Box>
                                <Box component="span" sx={{ color: '#bfa76a', fontWeight: 900, ml: 0 }}>Track</Box>
                            </Typography>
                        </Button>
                    </Box>
                    {/* Centered nav links */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5, position: 'relative' }}>
                            {navItems.map((item, idx) => {
                                const isActive = window.location.pathname === item.href;
                                return (
                                    <Button
                                        key={item.label}
                                        href={item.href}
                                        sx={{
                                            color: isActive ? '#bfa76a' : '#bfa76a',
                                            background: 'transparent',
                                            fontWeight: 600,
                                            fontSize: '1.08rem',
                                            px: 2,
                                            py: 1.5,
                                            borderRadius: 0,
                                            boxShadow: 'none',
                                            textTransform: 'none',
                                            minWidth: 0,
                                            position: 'relative',
                                            overflow: 'visible',
                                            '&:after': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                height: 3,
                                                background: '#bfa76a',
                                                borderRadius: 2,
                                                transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                                                transition: 'transform 0.35s cubic-bezier(.4,1.6,.6,1)',
                                                transformOrigin: 'center',
                                            },
                                            '&:hover:after': {
                                                transform: 'scaleX(1)',
                                            },
                                            transition: 'color 0.2s',
                                            '&:hover': {
                                                color: '#fff',
                                            },
                                        }}
                                        disableElevation
                                        disableRipple
                                    >
                                        {item.label}
                                    </Button>
                                );
                            })}
                        </Box>
                    </Box>
                    {/* User menu, right-aligned */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Desktop User Menu ONLY (no nav links here) */}
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                            sx={{ color: '#DEB887', display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <AccountCircleIcon />
                            <Typography variant="body2" sx={{ textTransform: 'none', color: '#F5DEB3', display: { xs: 'none', sm: 'block' } }}>
                                {user.name}
                            </Typography>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    backgroundColor: '#1a1410',
                                    backgroundImage: 'linear-gradient(135deg, #1a1410 0%, #0F0D0A 100%)',
                                    border: '1px solid rgba(212, 175, 123, 0.2)',
                                },
                            }}
                        >
                            <MenuItem
                                component={Link}
                                href={route('profile.edit')}
                                onClick={handleMenuClose}
                                sx={{ color: '#DEB887', '&:hover': { backgroundColor: 'rgba(210, 105, 30, 0.2)' } }}
                            >
                                Profile
                            </MenuItem>
                            <Divider sx={{ borderColor: 'rgba(212, 175, 123, 0.2)' }} />
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose();
                                    window.axios.post(route('logout')).then(() => {
                                        window.location.href = '/';
                                    });
                                }}
                                sx={{ color: '#FF6B6B', '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.1)' } }}
                            >
                                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                                Log Out
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerContent}
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, pt: 0, width: '100%' }}>
                <Toolbar />
                {header && (
                    <Container maxWidth="lg" sx={{ py: 2 }}>
                        {header}
                    </Container>
                )}
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
}
