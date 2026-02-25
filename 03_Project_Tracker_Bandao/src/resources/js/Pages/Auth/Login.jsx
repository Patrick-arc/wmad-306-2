import { Head, Link, useForm } from '@inertiajs/react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography,
    Alert,
    InputAdornment,
    IconButton,
    Divider,
    Container,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, LoginRounded } from '@mui/icons-material';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #2563eb 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 10s ease infinite',
                    px: 2,
                }}
            >
                <Grid item xs={12} sm={8} md={5}>
                    <Paper
                        elevation={8}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            animation: 'fadeInUp 1.2s ease',
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ 
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
                            backgroundClip: 'text', 
                            WebkitBackgroundClip: 'text', 
                            WebkitTextFillColor: 'transparent', 
                            color: '#3b82f6',
                            mb: 1,
                        }}>
                            Welcome Back 👋
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                            Sign in to access your dashboard
                        </Typography>

                        {status && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {status}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
                            {/* Email */}
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: '#3b82f6' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#d1d5db',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#8b5cf6',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3b82f6',
                                            borderWidth: '2px',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '12px 14px',
                                    },
                                }}
                            />

                            {/* Password with toggle */}
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: '#3b82f6' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                onClick={togglePasswordVisibility} 
                                                edge="end"
                                                sx={{
                                                    color: '#3b82f6',
                                                    transition: '0.2s',
                                                    '&:hover': {
                                                        backgroundColor: '#f0f7ff',
                                                        transform: 'scale(1.1)',
                                                    },
                                                }}
                                                title={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#d1d5db',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#8b5cf6',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3b82f6',
                                            borderWidth: '2px',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '12px 14px',
                                    },
                                }}
                            />

                            {/* Remember Me */}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        color="primary"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f0f7ff',
                                            },
                                        }}
                                    />
                                }
                                label={<Typography variant="body2">Remember me</Typography>}
                                sx={{ mt: 2, mb: 1 }}
                            />

                            {/* Forgot Password + Submit */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mt: 3,
                                    gap: 2,
                                }}
                            >
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#3b82f6',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.textDecoration = 'underline';
                                            e.target.style.color = '#8b5cf6';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.textDecoration = 'none';
                                            e.target.style.color = '#3b82f6';
                                        }}
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={processing}
                                    endIcon={<LoginRounded />}
                                    sx={{
                                        px: 3,
                                        py: 1.2,
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        textTransform: 'none',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
                                        },
                                        '&:active': {
                                            transform: 'translateY(0)',
                                        },
                                        '&:disabled': {
                                            opacity: 0.6,
                                            cursor: 'not-allowed',
                                        },
                                    }}
                                >
                                    {processing ? 'Logging in...' : 'Log in'}
                                </Button>
                            </Box>

                            {/* Register Link */}
                            <Divider sx={{ my: 3 }} />
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Don't have an account?
                                </Typography>
                                <Link
                                    href={route('register')}
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            color: '#3b82f6',
                                            borderColor: '#3b82f6',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                backgroundColor: '#f0f7ff',
                                                borderColor: '#8b5cf6',
                                                color: '#8b5cf6',
                                            },
                                        }}
                                    >
                                        Create an account
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Animations */}
            <style>
                {`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>
        </>
    );
}
