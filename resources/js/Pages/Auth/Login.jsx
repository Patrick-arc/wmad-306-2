import * as React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Box, Button, Checkbox, CssBaseline, Divider, FormControlLabel,
    FormLabel, FormControl, TextField, Typography, Stack, Card as MuiCard
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '@/Components/CustomIcons';
import AppTheme from './theme/AppTheme';
import ColorModeSelect from './theme/ColorModeSelect';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    [theme.breakpoints.up('sm')]: { maxWidth: '450px' },
    boxShadow: '0px 5px 15px rgba(0,0,0,0.5)',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(2),
    background: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
}));

export default function Login(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '', password: '', remember: false,
    });

    React.useEffect(() => { return () => { reset('password'); }; }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Head title="Log in" />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <SignInContainer direction="column" justifyContent="center">
                <Card variant="outlined">
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <SitemarkIcon />
                    </Box>
                    <Typography component="h1" variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Sign in</Typography>
                    <form onSubmit={submit}>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>Email</FormLabel>
                                <TextField fullWidth id="email" placeholder="your@email.com" value={data.email} onChange={(e) => setData('email', e.target.value)} error={!!errors.email} helperText={errors.email} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }}}} />
                            </FormControl>
                            <FormControl>
                                <FormLabel sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>Password</FormLabel>
                                <TextField fullWidth id="password" type="password" placeholder="••••••" value={data.password} onChange={(e) => setData('password', e.target.value)} error={!!errors.password} helperText={errors.password} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }}}} />
                            </FormControl>
                            <Button fullWidth type="submit" variant="contained" disabled={processing} sx={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>Sign in</Button>
                        </Stack>
                    </form>
                    <Typography variant="body2" align="center">Don't have an account? <Link href={route('register')} className="text-sky-400 font-bold">Sign up</Link></Typography>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}