import { Head, Link, useForm } from '@inertiajs/react';
import {
    Container,
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Divider,
    Fade,
    Slide,
} from '@mui/material';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [checked, setChecked] = useState(true);

    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            {/* FULL BACKGROUND */}
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                        'linear-gradient(135deg, #3a0ca3, #4361ee, #4cc9f0)',
                    padding: 3,
                }}
            >
                <Container maxWidth="lg">
                    <Slide direction="up" in={checked} timeout={600}>
                        <Paper
                            elevation={12}
                            sx={{
                                borderRadius: 4,
                                overflow: 'hidden',
                                display: 'flex',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            <Grid container>

                                {/* LEFT SIDE */}
                                <Fade in={checked} timeout={1000}>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        sx={{
                                            background:
                                                'linear-gradient(135deg, #7209b7, #4361ee)',
                                            color: 'white',
                                            p: { xs: 4, md: 6 },
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            textAlign: 'left',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.02)',
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            fontWeight="bold"
                                            gutterBottom
                                            sx={{ letterSpacing: 1 }}
                                        >
                                            Welcome Back
                                        </Typography>

                                        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                                            Already have an account? Sign in and continue managing your projects efficiently.
                                        </Typography>

                                        <Button
                                            component={Link}
                                            href="/login"
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                background: 'linear-gradient(90deg, #4361ee, #4cc9f0)',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                px: 4,
                                                py: 1.2,
                                                borderRadius: 2,
                                                boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, #3a0ca3, #4361ee)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0px 6px 18px rgba(0,0,0,0.3)',
                                                },
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </Grid>
                                </Fade>

                                {/* RIGHT SIDE */}
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    sx={{
                                        p: { xs: 4, md: 6 },
                                        backgroundColor: '#ffffff',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        gutterBottom
                                    >
                                        Create Account
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        mb={2}
                                    >
                                        Join thousands of teams managing their projects
                                    </Typography>

                                    <Divider sx={{ mb: 2 }} />

                                    <Box component="form" onSubmit={submit}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            margin="normal"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            error={!!errors.name}
                                            helperText={errors.name}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            margin="normal"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            error={!!errors.email}
                                            helperText={errors.email}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            margin="normal"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData('password', e.target.value)
                                            }
                                            error={!!errors.password}
                                            helperText={errors.password}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Confirm Password"
                                            type="password"
                                            margin="normal"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value
                                                )
                                            }
                                            error={!!errors.password_confirmation}
                                            helperText={
                                                errors.password_confirmation
                                            }
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            disabled={processing}
                                            sx={{
                                                mt: 3,
                                                py: 1.5,
                                                background:
                                                    'linear-gradient(90deg, #7209b7, #4361ee)',
                                                fontWeight: 'bold',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow:
                                                        '0px 6px 15px rgba(0,0,0,0.2)',
                                                },
                                            }}
                                        >
                                            {processing
                                                ? 'Creating Account...'
                                                : 'Create Account'}
                                        </Button>
                                    </Box>

                                    <Box textAlign="center" mt={3}>
                                        <Typography variant="body2">
                                            Already have an account?{' '}
                                            <Link
                                                href="/login"
                                                style={{
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold',
                                                    color: '#3a0ca3',
                                                }}
                                            >
                                                Sign In
                                            </Link>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Slide>
                </Container>
            </Box>
        </>
    );
}
