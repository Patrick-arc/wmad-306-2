import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { TextField, Button, FormControlLabel, Checkbox, Box, Typography, Alert } from '@mui/material';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Typography variant="h5" fontWeight="700" textAlign="center" gutterBottom>
                Sign in to TaskFlow
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" mb={4}>
                Welcome back! Please enter your details.
            </Typography>

            {status && <Alert severity="success" sx={{ mb: 3 }}>{status}</Alert>}

            <Box component="form" onSubmit={submit} noValidate>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                    }}
                />

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                value="remember" 
                                color="primary" 
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                        }
                        label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
                    />
                    
                    {canResetPassword && (
                        <Link 
                            href={route('password.request')}
                            style={{ textDecoration: 'none', color: '#0071e3', fontSize: '0.875rem', fontWeight: 500 }}
                        >
                            Forgot password?
                        </Link>
                    )}
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={processing}
                    sx={{
                        mt: 4,
                        mb: 2,
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        backgroundColor: '#0071e3',
                        boxShadow: '0 4px 14px rgba(0, 113, 227, 0.3)',
                        '&:hover': { backgroundColor: '#005bb5' }
                    }}
                >
                    Sign In
                </Button>

                <Box textAlign="center" mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <Link 
                            href={route('register')} 
                            style={{ textDecoration: 'none', color: '#0071e3', fontWeight: 600 }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </GuestLayout>
    );
}