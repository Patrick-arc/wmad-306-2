import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    InputBase,
    Divider,
    Badge,
    Tooltip,
    Paper,
    CircularProgress,
} from '@mui/material';
import {
    SearchOutlined,
    PersonOutline,
    LogoutOutlined,
    NotificationsOutlined,
    KeyboardArrowDown,
    Article as ArticleIcon,
    LocalOfferOutlined,
} from '@mui/icons-material';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const roles = auth.roles || [];

    const [anchorEl, setAnchorEl] = useState(null);
    const profileOpen = Boolean(anchorEl);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleProfileClick = (e) => setAnchorEl(e.currentTarget);
    const handleProfileClose = () => setAnchorEl(null);

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.length < 2) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        setSearchLoading(true);
        setShowSearchResults(true);

        try {
            // Determine search endpoint based on user role
            let searchEndpoint = '/writer/search'; // default
            if (roles.includes('editor')) {
                searchEndpoint = '/editor/search';
            } else if (roles.includes('student')) {
                searchEndpoint = '/student/search';
            }

            const response = await fetch(`${searchEndpoint}?q=${encodeURIComponent(value)}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults([]);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSearchResultClick = (url) => {
        router.visit(url);
        setSearchQuery('');
        setSearchResults([]);
        setShowSearchResults(false);
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getRoleBadge = () => {
        if (roles.includes('writer')) return 'Writer';
        if (roles.includes('editor')) return 'Editor';
        if (roles.includes('student')) return 'Student';
        return '';
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Top App Bar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: '#FFFFFF',
                    color: 'text.primary',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ px: { xs: 2, sm: 3 }, gap: 2, minHeight: '64px !important' }}>
                    {/* Logo / App Name */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #1B2A4A 0%, #2A7B9B 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ArticleIcon sx={{ color: '#fff', fontSize: 20 }} />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                letterSpacing: '-0.02em',
                                display: { xs: 'none', sm: 'block' },
                            }}
                        >
                            UniVox
                        </Typography>
                    </Link>

                    {/* Search Bar with Results */}
                    <Box sx={{ position: 'relative', flex: 1, maxWidth: 480, ml: { xs: 1, sm: 4 } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: '#F4F6F9',
                                borderRadius: 2,
                                px: 1.5,
                                py: 0.5,
                                border: '1px solid transparent',
                                transition: 'all 0.2s',
                                '&:focus-within': {
                                    bgcolor: '#fff',
                                    borderColor: 'secondary.main',
                                    boxShadow: '0 0 0 3px rgba(42,123,155,0.1)',
                                },
                            }}
                        >
                            <SearchOutlined sx={{ color: '#8896AB', fontSize: 20, mr: 1 }} />
                            <InputBase
                                placeholder="Search articles, categories..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                                sx={{
                                    flex: 1,
                                    fontSize: '0.875rem',
                                    '& input::placeholder': { color: '#8896AB', opacity: 1 },
                                }}
                            />
                            {searchLoading && <CircularProgress size={20} sx={{ ml: 1, color: 'secondary.main' }} />}
                        </Box>

                        {/* Search Results Dropdown */}
                        {showSearchResults && (
                            <Paper
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    mt: 1,
                                    maxHeight: 400,
                                    overflowY: 'auto',
                                    zIndex: 1300,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                }}
                            >
                                {searchResults.length > 0 ? (
                                    searchResults.map((result, idx) => (
                                        <Box
                                            key={idx}
                                            onClick={() => handleSearchResultClick(result.url)}
                                            sx={{
                                                px: 2,
                                                py: 1.5,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                transition: 'bgcolor 0.15s',
                                                '&:hover': { bgcolor: '#F4F6F9' },
                                                '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minWidth: 32,
                                                    height: 32,
                                                    borderRadius: 1,
                                                    bgcolor: result.type === 'article' ? '#E8F2F5' : '#FFF3E0',
                                                }}
                                            >
                                                {result.type === 'article' ? (
                                                    <ArticleIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                                ) : (
                                                    <LocalOfferOutlined sx={{ fontSize: 18, color: '#FF9800' }} />
                                                )}
                                            </Box>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: 600,
                                                        color: 'text.primary',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {result.title}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    {result.subtitle}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Box sx={{ px: 2, py: 2, textAlign: 'center' }}>
                                        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                            No results found
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Notifications */}
                    <Tooltip title="Notifications">
                        <IconButton size="small" sx={{ color: '#5A6B8A' }}>
                            <Badge variant="dot" color="error">
                                <NotificationsOutlined sx={{ fontSize: 22 }} />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {/* Profile Dropdown */}
                    <Box
                        onClick={handleProfileClick}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            ml: 0.5,
                            py: 0.5,
                            px: 1,
                            borderRadius: 2,
                            transition: 'all 0.15s',
                            '&:hover': { bgcolor: 'action.hover' },
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 34,
                                height: 34,
                                fontSize: '0.8rem',
                                bgcolor: 'primary.main',
                                fontWeight: 700,
                            }}
                        >
                            {getInitials(user?.name)}
                        </Avatar>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.2, color: 'text.primary' }}>
                                {user?.name}
                            </Typography>
                            <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary', lineHeight: 1.2 }}>
                                {getRoleBadge()}
                            </Typography>
                        </Box>
                        <KeyboardArrowDown sx={{ fontSize: 18, color: '#8896AB', display: { xs: 'none', md: 'block' } }} />
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={profileOpen}
                        onClose={handleProfileClose}
                        onClick={handleProfileClose}
                        slotProps={{
                            paper: {
                                sx: {
                                    mt: 1,
                                    minWidth: 200,
                                    borderRadius: 2,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Box sx={{ px: 2, py: 1.5 }}>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{user?.email}</Typography>
                        </Box>
                        <Divider />
                        <MenuItem
                            onClick={() => router.visit(route('profile.edit'))}
                            sx={{ py: 1, px: 2, fontSize: '0.875rem' }}
                        >
                            <ListItemIcon><PersonOutline sx={{ fontSize: 20 }} /></ListItemIcon>
                            <ListItemText primaryTypographyProps={{ fontSize: '0.875rem' }}>Profile</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => router.post(route('logout'))}
                            sx={{ py: 1, px: 2, color: 'error.main' }}
                        >
                            <ListItemIcon><LogoutOutlined sx={{ fontSize: 20, color: 'error.main' }} /></ListItemIcon>
                            <ListItemText primaryTypographyProps={{ fontSize: '0.875rem', color: 'error.main' }}>Log Out</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Main Content - offset for fixed AppBar */}
            <Box component="main" sx={{ flexGrow: 1, mt: '64px' }}>
                {children}
            </Box>
        </Box>
    );
}
