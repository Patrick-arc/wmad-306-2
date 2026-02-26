import * as React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
                <Box sx={{ position: 'relative', width: '100%', maxWidth: 460, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{
                        position: 'absolute',
                        width: '120%',
                        height: '120%',
                        top: 0,
                        left: '-10%',
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(94,59,255,0.12), rgba(124,98,255,0.06))',
                        filter: 'blur(24px)',
                        zIndex: 1,
                        pointerEvents: 'none'
                    }}></Box>

                    <Card sx={{ width: '100%', borderRadius: 3, boxShadow: '0 20px 60px rgba(94,59,255,0.06)', border: '1px solid rgba(94,59,255,0.12)', position: 'relative', zIndex: 2 }}>
                        <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#5E3BFF' }}>Sign In</Typography>
                        </Box>

                        {status && (
                            <Typography variant="body2" color="success.main" sx={{ mb: 1, textAlign: 'center' }}>
                                {status}
                            </Typography>
                        )}

                        <Box component="form" onSubmit={submit} noValidate>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                margin="normal"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon sx={{ color: '#5E3BFF' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '9999px', background: '#fff', boxShadow: '0 6px 18px rgba(16,24,40,0.04)' } }}
                                autoComplete="username"
                            />

                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                margin="normal"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon sx={{ color: '#5E3BFF' }} />
                                        </InputAdornment>
                                    ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={() => setShowPassword((s) => !s)} aria-label="toggle password visibility">
                                                        {showPassword ? <VisibilityOff sx={{ color: '#5E3BFF' }} /> : <Visibility sx={{ color: '#5E3BFF' }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '9999px', background: '#fff', boxShadow: '0 6px 18px rgba(16,24,40,0.04)' } }}
                                autoComplete="current-password"
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                                <FormControlLabel
                                    control={<MuiCheckbox checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />}
                                    label={<Typography variant="body2">Remember me</Typography>}
                                />

                                <Box>
                                    {canResetPassword && (
                                            <Link href={route('password.request')}> 
                                                <Typography variant="body2" sx={{ textDecoration: 'underline', color: '#5E3BFF' }}>Forgot your password?</Typography>
                                            </Link>
                                        )}
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={processing}
                                    sx={{
                                        background: 'linear-gradient(90deg,#7C62FF,#5E3BFF)',
                                        boxShadow: '0 18px 40px rgba(124,98,255,0.18)',
                                        borderRadius: 99,
                                        px: 6,
                                        py: 1.5,
                                        minWidth: 160,
                                        transition: 'transform 260ms cubic-bezier(.22,.9,.31,1), box-shadow 260ms cubic-bezier(.22,.9,.31,1)',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 30px 60px rgba(94,59,255,0.14)'
                                        },
                                        '&:active': {
                                            transform: 'scale(0.98)'
                                        }
                                    }}
                                >
                                    LOG IN
                                </Button>
                            </Box>

                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Don't have an account? <Link href={route('register')}><span style={{ color: '#5E3BFF', textDecoration: 'underline' }}>Register here</span></Link></Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
        </GuestLayout>
    );
}
