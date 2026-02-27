import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Container,
} from '@mui/material';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#121212', color: '#fff' }}>
            
            {/* ================= NAVIGATION BAR ================= */}
            <AppBar
                position="static"
                sx={{
                    background: 'linear-gradient(135deg, #4361ee, #764ba2)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        
                        {/* LEFT SIDE */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                sx={{
                                    bgcolor: 'white',
                                    color: '#4361ee',
                                    fontWeight: 'bold',
                                }}
                            >
                                PT
                            </Avatar>

                            <Typography variant="h6" fontWeight="bold">
                                Project Tracker
                            </Typography>
                        </Box>

                        {/* RIGHT SIDE - NAVIGATION LINKS */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Link href="/dashboard">
                                <Button sx={{ color: 'white' }}>Dashboard</Button>
                            </Link>

                            <Link href="/projects">
                                <Button sx={{ color: 'white' }}>Projects</Button>
                            </Link>

                            <Link href="/tasks">
                                <Button sx={{ color: 'white' }}>Tasks</Button>
                            </Link>

                            {/* USER MENU */}
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar
                                    sx={{
                                        bgcolor: '#ffffff',
                                        color: '#4361ee',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {user?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                            >
                                <MenuItem disabled>{user?.name}</MenuItem>

                                <MenuItem
                                    component={Link}
                                    href={route('profile.edit')}
                                    onClick={handleMenuClose}
                                >
                                    Profile
                                </MenuItem>

                                <MenuItem
                                    component={Link}
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {header && (
                <Box sx={{ p: 4 }}>
                    {header}
                </Box>
            )}

            <Box sx={{ p: 4 }}>
                {children}
            </Box>
        </Box>
    );
}