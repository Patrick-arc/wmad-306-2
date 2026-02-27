import { Head, Link } from '@inertiajs/react';
import {
    AppBar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const isLoggedIn = !!auth?.user;

    const footerHeight = 36;

    return (
        <>
            <Head title="Welcome" />

            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    pb: `${footerHeight + 16}px`,
                }}
            >
                {/* Background */}
                <Box
                    aria-hidden
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        background:
                            'radial-gradient(900px 420px at 12% 10%, rgba(99,102,241,0.22), transparent 55%),' +
                            'radial-gradient(820px 420px at 88% 18%, rgba(16,185,129,0.18), transparent 55%),' +
                            'radial-gradient(980px 520px at 50% 95%, rgba(59,130,246,0.14), transparent 60%)',
                    }}
                />

                {/* subtle noise */}
                <Box
                    aria-hidden
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        opacity: 0.06,
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 160 160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.35%27/%3E%3C/svg%3E")',
                    }}
                />

                {/* Top bar */}
                <AppBar position="static" elevation={0} color="transparent">
                    <Toolbar disableGutters sx={{ px: { xs: 2, sm: 3 }, minHeight: 64 }}>
                        {/* No left title; keep buttons pinned to the far right */}
                        <Box sx={{ flexGrow: 1 }} />

                        <Stack direction="row" spacing={1} sx={{ pr: { xs: 1, sm: 2 } }}>
                            {isLoggedIn ? (
                                <Button
                                    component={Link}
                                    href={route('dashboard')}
                                    variant="contained"
                                    size="small"
                                    sx={{ textTransform: 'none', borderRadius: 2 }}
                                >
                                    Dashboard
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        component={Link}
                                        href={route('login')}
                                        variant="text"
                                        size="small"
                                        sx={{ textTransform: 'none', borderRadius: 2 }}
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        component={Link}
                                        href={route('register')}
                                        variant="contained"
                                        size="small"
                                        sx={{ textTransform: 'none', borderRadius: 2 }}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Toolbar>
                </AppBar>

                {/* Content */}
                <Container
                    maxWidth="md"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        py: { xs: 5, sm: 7 },
                        position: 'relative',
                    }}
                >
                    <Paper
                        elevation={0}
                        variant="outlined"
                        sx={{
                            width: '100%',
                            borderRadius: 4,
                            p: { xs: 3, sm: 4 },
                            borderColor: 'rgba(255,255,255,0.35)',
                            background:
                                'linear-gradient(180deg, rgba(255,255,255,0.70), rgba(255,255,255,0.45))',
                            backdropFilter: 'blur(14px)',
                            WebkitBackdropFilter: 'blur(14px)',
                            boxShadow: '0 18px 55px rgba(0,0,0,0.10)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* inner highlight for more glass */}
                        <Box
                            aria-hidden
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                pointerEvents: 'none',
                                background:
                                    'radial-gradient(900px 260px at 20% 0%, rgba(255,255,255,0.55), transparent 60%)',
                            }}
                        />

                        <Stack spacing={2} sx={{ position: 'relative' }}>
                            {/* badges */}
                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                {[
                                    { label: `Laravel ${laravelVersion}` },
                                    { label: `PHP ${phpVersion}` },
                                ].map((x) => (
                                    <Chip
                                        key={x.label}
                                        label={x.label}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            fontSize: 11.5,
                                            height: 24,
                                            bgcolor: 'rgba(255,255,255,0.50)',
                                            borderColor: 'rgba(0,0,0,0.08)',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    />
                                ))}
                            </Stack>

                            {/* hero */}
                            <Box sx={{ mt: 0.5 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        letterSpacing: -0.8,
                                        lineHeight: 1.08,
                                        fontSize: { xs: 26, sm: 36 },
                                    }}
                                >
                                    Simple project tracking,
                                    <Box component="span" sx={{ display: 'block' }}>
                                        built for focus.
                                    </Box>
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1.25,
                                        color: 'text.secondary',
                                        maxWidth: 560,
                                        fontSize: 13,
                                        lineHeight: 1.8,
                                    }}
                                >
                                    Create projects, add tasks, set priority, and toggle status — in a clean workspace
                                    that stays out of your way.
                                </Typography>
                            </Box>

                            <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />

                            {/* actions */}
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={1.25}
                                alignItems={{ xs: 'stretch', sm: 'center' }}
                            >
                                <Button
                                    component={Link}
                                    href={route('project')}
                                    variant="contained"
                                    size="medium"
                                    sx={{ textTransform: 'none', borderRadius: 2 }}
                                >
                                    Open Projects
                                </Button>

                                <Button
                                    component={Link}
                                    href={route('tasks')}
                                    variant="outlined"
                                    size="medium"
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        borderColor: 'rgba(0,0,0,0.18)',
                                        bgcolor: 'rgba(255,255,255,0.35)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    View Tasks
                                </Button>

                                {!isLoggedIn && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: 12,
                                            ml: { sm: 1.5 },
                                        }}
                                    >
                                        Sign in to manage your own data.
                                    </Typography>
                                )}
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>

                {/* Fixed bottom footer bar */}
                <Box
                    component="footer"
                    sx={{
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: footerHeight,
                        display: 'flex',
                        alignItems: 'center',
                        zIndex: 10,
                        borderTop: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: 'rgba(255,255,255,0.55)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                    }}
                >
                    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontSize: 12,
                                display: 'block',
                                textAlign: 'center',
                            }}
                        >
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </>
    );
}