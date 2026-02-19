import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Drawer,
    Box,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    CssBaseline,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    FolderOpen as ProjectsIcon,
    Menu as MenuIcon,
    AccountCircle as AccountIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: DashboardIcon, active: route().current('dashboard') },
        { name: 'Projects', href: route('projects.index'), icon: ProjectsIcon, active: route().current('projects.*') },
    ];

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                    Task Tracker
                </Typography>
            </Box>
            
            <List sx={{ px: 2, py: 2, flex: 1 }}>
                {navItems.map((item) => (
                    <Link href={item.href} key={item.name}>
                        <ListItem
                            component="a"
                            sx={{
                                mb: 1,
                                borderRadius: 1,
                                px: 2,
                                py: 1.5,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                bgcolor: item.active ? 'primary.light' : 'transparent',
                                color: item.active ? 'primary.main' : 'text.secondary',
                                '&:hover': {
                                    bgcolor: item.active ? 'primary.light' : 'action.hover',
                                    color: 'primary.main',
                                },
                                textDecoration: 'none',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 40,
                                    color: item.active ? 'primary.main' : 'inherit',
                                }}
                            >
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                            />
                        </ListItem>
                    </Link>
                ))}
            </List>

            <Divider />
            <Box sx={{ p: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: 'action.hover',
                    }}
                >
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            mr: 1.5,
                            bgcolor: 'primary.main',
                            fontSize: '1rem',
                            fontWeight: 700,
                        }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', bgcolor: '#f5f7fa', minHeight: '100vh' }}>
            <CssBaseline />
            
            {/* Top AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: 'white',
                    color: 'text.primary',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        Task Tracker
                    </Typography>
                    <IconButton
                        onClick={handleMenuOpen}
                        sx={{
                            p: 0.5,
                            '&:hover': { bgcolor: 'action.hover' },
                        }}
                    >
                        <AccountIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem component={Link} href={route('profile.edit')}>
                            <AccountIcon sx={{ mr: 1 }} /> Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem component={Link} href={route('logout')} method="post" as="button">
                            <LogoutIcon sx={{ mr: 1 }} /> Log Out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Box
                component="nav"
                sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.paper',
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    mt: { xs: 7, sm: 8 },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
