import { Head, Link, useForm } from '@inertiajs/react';
import {
    Container,
    Card,
    CardContent,
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    FormControlLabel,
    Checkbox,
    CircularProgress,
} from '@mui/material';
import { Lock, Email } from '@mui/icons-material';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Container maxWidth="sm">
                <Card sx={{ mt: 8, mb: 4 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                Welcome Back
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sign in to your Project Tracker account
                            </Typography>
                        </Box>

                        {status && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                {status}
                            </Alert>
                        )}

                        <form onSubmit={submit}>
                            <TextField
                                fullWidth
                                id="email"
                                type="email"
                                name="email"
                                label="Email Address"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email}
                                onChange={(e) => setData('email', e.target.value)}
                                InputProps={{
                                    startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                                }}
                            />

                            <TextField
                                fullWidth
                                id="password"
                                type="password"
                                name="password"
                                label="Password"
                                value={data.password}
                                autoComplete="current-password"
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password}
                                onChange={(e) => setData('password', e.target.value)}
                                InputProps={{
                                    startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
                                }}
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        style={{
                                            color: '#1976d2',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={processing}
                                sx={{ mb: 2 }}
                            >
                                {processing ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?{' '}
                                    <Link
                                        href={route('register')}
                                        style={{
                                            color: '#1976d2',
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Sign up
                                    </Link>
                                </Typography>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </GuestLayout>
    );
}
