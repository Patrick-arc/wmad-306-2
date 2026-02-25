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

const RegisterContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(2),
    background: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
}));

export default function Register(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
    });

    React.useEffect(() => { return () => { reset('password', 'password_confirmation'); }; }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('register'));
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Head title="Register" />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <RegisterContainer direction="column" justifyContent="center">
                <Card variant="outlined">
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <SitemarkIcon />
                    </Box>
                    <Typography component="h1" variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Sign up</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>Full name</FormLabel>
                            <TextField required fullWidth placeholder="Jon Snow" value={data.name} onChange={(e) => setData('name', e.target.value)} error={!!errors.name} helperText={errors.name} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }}}} />
                        </FormControl>
                        <FormControl>
                            <FormLabel sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>Email</FormLabel>
                            <TextField required fullWidth placeholder="your@email.com" value={data.email} onChange={(e) => setData('email', e.target.value)} error={!!errors.email} helperText={errors.email} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }}}} />
                        </FormControl>
                        <FormControl>
                            <FormLabel sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>Password</FormLabel>
                            <TextField required fullWidth type="password" placeholder="••••••" value={data.password} onChange={(e) => setData('password', e.target.value)} error={!!errors.password} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }}}} />
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" disabled={processing} sx={{ py: 1.5, fontWeight: 'bold', backgroundColor: 'white', color: 'black' }}>Sign up</Button>
                        <Typography variant="body2" sx={{ textAlign: 'center' }}>Already have an account? <Link href={route('login')} className="text-sky-400 font-bold">Sign in</Link></Typography>
                    </Box>
                </Card>
            </RegisterContainer>
        </AppTheme>
    );
}