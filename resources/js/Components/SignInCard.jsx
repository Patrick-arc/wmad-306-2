import * as React from 'react';
import { Link } from '@inertiajs/react';
import { 
    Box, Button, Checkbox, FormControlLabel, FormLabel, FormControl, 
    TextField, Typography, Card as MuiCard, Divider, Alert 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// This definition resolves the "Card is not defined" error
const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: { maxWidth: '450px' },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export default function SignInCard({ form, canResetPassword, status }) {
    const { data, setData, post, processing, errors, reset } = form;

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('login'), { 
            onFinish: () => reset('password') 
        });
    };

    return (
        <Card variant="outlined">
            <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                Sign in
            </Typography>
            {status && <Alert severity="success" sx={{ mb: 2 }}>{status}</Alert>}
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        id="email" type="email" name="email" placeholder="your@email.com"
                        autoComplete="email" autoFocus required fullWidth variant="outlined"
                        value={data.email} onChange={(e) => setData('email', e.target.value)}
                        error={!!errors.email} helperText={errors.email}
                    />
                </FormControl>
                <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        {canResetPassword && (
                            <Link href={route('password.request')} style={{ fontSize: '0.8rem', color: '#0071e3', textDecoration: 'none' }}>
                                Forgot password?
                            </Link>
                        )}
                    </Box>
                    <TextField
                        name="password" placeholder="••••••" type="password" id="password"
                        autoComplete="current-password" required fullWidth variant="outlined"
                        value={data.password} onChange={(e) => setData('password', e.target.value)}
                        error={!!errors.password} helperText={errors.password}
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} color="primary" />}
                    label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" disabled={processing} sx={{ py: 1.5 }}>
                    Sign in
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Don't have an account? <Link href={route('register')} style={{ color: '#0071e3', textDecoration: 'none' }}>Sign up</Link>
                </Typography>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button fullWidth variant="outlined" onClick={() => alert('Google login is not yet configured')} startIcon={<span>G</span>}>
                    Sign in with Google
                </Button>
            </Box>
        </Card>
    );
}