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
import { Lock, Email, Person } from '@mui/icons-material';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Container maxWidth="sm">
                <Card sx={{ mt: 8, mb: 4 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                Create Account
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sign up to get started with Project Tracker
                            </Typography>
                        </Box>

                        <form onSubmit={submit}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Full Name"
                                value={data.name}
                                autoComplete="name"
                                autoFocus
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name}
                                onChange={(e) => setData('name', e.target.value)}
                                InputProps={{
                                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                                }}
                            />

                            <TextField
                                fullWidth
                                id="email"
                                type="email"
                                name="email"
                                label="Email Address"
                                value={data.email}
                                autoComplete="username"
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
                                autoComplete="new-password"
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password}
                                onChange={(e) => setData('password', e.target.value)}
                                InputProps={{
                                    startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
                                }}
                            />

                            <TextField
                                fullWidth
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                label="Confirm Password"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                margin="normal"
                                error={!!errors.password_confirmation}
                                helperText={errors.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                InputProps={{
                                    startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
                                }}
                            />

                            <Box sx={{ textAlign: 'center', mt: 3, mb: 2 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>
                            </Box>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <Link
                                        href={route('login')}
                                        style={{
                                            color: '#1976d2',
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Sign in
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
