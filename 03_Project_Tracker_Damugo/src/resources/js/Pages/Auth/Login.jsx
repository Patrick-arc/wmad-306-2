import { Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Alert, Link as MuiLink, CircularProgress, Fade, InputAdornment, IconButton, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function Login({ status }) {
        const theme = useTheme();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <Grid container sx={{ minHeight: '100vh', width: '100vw', m: 0, p: 0, flexWrap: 'nowrap', background: 'radial-gradient(ellipse at 60% 40%, #18181b 70%, #0a0a0a 100%)' }}>
                {/* LEFT SIDE: Login Form (50%) */}
                {/* LEFT: Full-height image with dark overlay */}
                <Grid item xs={12} md={6} sx={{
                    height: '100vh',
                    width: '50vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    p: 0,
                    m: 0,
                    boxSizing: 'border-box',
                }}>
                    <Box component={Paper} elevation={8} sx={{
                        width: { xs: '98%', md: '90%', lg: '85%' },
                        height: { xs: 400, md: '85%', lg: '90%' },
                        minHeight: 340,
                        maxHeight: '95vh',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        borderRadius: 12,
                        overflow: 'hidden',
                        background: 'rgba(20,20,20,0.7)',
                        boxShadow: '0 16px 64px 0 rgba(0,0,0,0.40)',
                        position: 'relative',
                        transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                    }}>
                        {/* ProTrack Logo: joined 'ProTrack' */}
                        <Box sx={{
                            position: 'absolute',
                            top: 32,
                            left: 36,
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0,
                        }}>
                            <RocketLaunchIcon sx={{ color: '#bfa76a', fontSize: 32, mr: 1 }} />
                            <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: 1.2, fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif', display: 'flex', alignItems: 'center' }}>
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
                        </Box>
                        <Box
                            component="img"
                            src="/images/loginBg.png"
                            alt="Login Background"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 12,
                                filter: 'brightness(1.18) contrast(1.12) saturate(1.12)',
                            }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'radial-gradient(circle at 8% 8%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0) 65%), linear-gradient(120deg, rgba(20,20,20,0.04) 60%, rgba(20,20,20,0.18) 100%)',
                            zIndex: 2,
                        }} />
                    </Box>
                </Grid>
                        {/* Remove old login form from left side. Only use right-side card. */}

                {/* RIGHT SIDE: Card with Image and Welcome Text (50%) */}
                {/* RIGHT: Glassmorphism login card */}
                <Grid item xs={12} md={6} sx={{
                    height: '100vh',
                    width: '50vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    p: 0,
                    m: 0,
                    boxSizing: 'border-box',
                }}>
                    <Box sx={{ width: { xs: '98%', md: '90%', lg: '85%' }, maxWidth: 700, px: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        {/* No card, just floating login form */}
                        <Box sx={{
                            width: '100%',
                            minHeight: { xs: 420, md: 520 },
                            height: { xs: 'auto', md: '85%', lg: '90%' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: { xs: 4, md: 8 },
                        }}>
                            {/* Back button */}
                            <IconButton
                                onClick={() => window.location.href = '/'}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.08)',
                                    color: '#fff',
                                    mb: 3,
                                    alignSelf: 'flex-start',
                                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                                    '&:hover': { background: 'rgba(255,255,255,0.18)' },
                                    '&:focus': { outline: 'none', boxShadow: 'none' },
                                }}
                                size="medium"
                            >
                                <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
                            </IconButton>
                            <Typography variant="h4" fontWeight={800} align="left" sx={{
                                mb: 3,
                                letterSpacing: 0.5,
                                fontSize: '2.1rem',
                                lineHeight: 1.15,
                                background: 'linear-gradient(90deg, #fff 0%, #ffe6a3 40%, #c07641 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent',
                                display: 'inline-block',
                            }}>
                                Log in to ProTrack
                            </Typography>
                            <Typography variant="body1" align="left" sx={{ mb: 3, color: '#e0e0e0', fontWeight: 400, fontSize: '1.1rem' }}>
                                Sign in to track milestones, manage team tasks, and turn your vision into reality.
                            </Typography>
                            {/* Login form fields/buttons start */}
                            <Box component="form" onSubmit={submit} sx={{ width: '100%' }}>
                                <TextField
                                    fullWidth
                                    placeholder="Email address"
                                    margin="normal"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{
                                        mb: 2,
                                        input: { color: '#fff', background: 'rgba(255,255,255,0.04)' },
                                        '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & .MuiOutlinedInput-input:-webkit-autofill, & input:-internal-autofill-selected': {
                                            WebkitBoxShadow: '0 0 0 1000px rgba(191,167,106,0.60) inset !important',
                                            WebkitTextFillColor: '#fff !important',
                                            backgroundColor: 'rgba(191,167,106,0.10) !important',
                                        },
                                        '& input:focus, & .MuiOutlinedInput-input:focus': {
                                            outline: 'none !important',
                                            boxShadow: 'none !important',
                                        },
                                        label: { color: '#bbb' },
                                        '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                color: '#fff',
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#bfa76a' },
                                                outline: 'none',
                                                boxShadow: 'none',
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    margin="normal"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="large" sx={{ color: '#bbb' }}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        mb: 2,
                                        input: { color: '#fff', background: 'rgba(255,255,255,0.04)' },
                                        '& input:focus, & .MuiOutlinedInput-input:focus': {
                                            outline: 'none !important',
                                            boxShadow: 'none !important',
                                        },
                                        label: { color: '#bbb' },
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#fff',
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#bfa76a' },
                                            outline: 'none',
                                            boxShadow: 'none',
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} sx={{ color: '#bbb' }} />}
                                    label={<Typography variant="body2" sx={{ color: '#bbb' }}>Remember me</Typography>}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={processing}
                                    sx={{
                                        mt: 2,
                                        py: 1.5,
                                        borderRadius: 3,
                                        background: 'linear-gradient(90deg, #232323 0%, #444 100%)',
                                        color: '#fff',
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)',
                                        textTransform: 'none',
                                        '&:hover': { background: 'linear-gradient(90deg, #232323 0%, #232323 100%)' },
                                        '&:focus': { outline: 'none', boxShadow: 'none' },
                                    }}
                                >
                                    {processing ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
                                </Button>
                            </Box>
                            <Typography variant="body2" align="center" sx={{ mt: 3, color: '#bbb' }}>
                                Don't have an account?{' '}
                                <MuiLink href={route('register')} sx={{ color: '#fff', fontWeight: 700, textDecoration: 'underline' }}>
                                    Register
                                </MuiLink>
                            </Typography>
                            {/* Login form fields/buttons end */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </GuestLayout>
    );
}