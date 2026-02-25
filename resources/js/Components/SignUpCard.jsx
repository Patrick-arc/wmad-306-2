import * as React from 'react';
import { Link } from '@inertiajs/react';
import { 
    Box, Button, FormControl, FormLabel, TextField, 
    Typography, Card as MuiCard, Divider
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

export default function SignUpCard({ form }) {
    const { data, setData, post, processing, errors, reset } = form;

    const handleSubmit = (event) => {
        event.preventDefault();
        // Laravel registration route
        post(route('register'), { 
            onFinish: () => reset('password', 'password_confirmation') 
        });
    };

    return (
        <Card variant="outlined">
            <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <TextField
                        id="name" name="name" placeholder="Jon Snow" required fullWidth
                        value={data.name} onChange={(e) => setData('name', e.target.value)}
                        error={!!errors.name} helperText={errors.name}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        id="email" type="email" name="email" placeholder="your@email.com" required fullWidth
                        value={data.email} onChange={(e) => setData('email', e.target.value)}
                        error={!!errors.email} helperText={errors.email}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        name="password" placeholder="••••••" type="password" id="password" required fullWidth
                        value={data.password} onChange={(e) => setData('password', e.target.value)}
                        error={!!errors.password} helperText={errors.password}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password_confirmation">Confirm Password</FormLabel>
                    <TextField
                        name="password_confirmation" placeholder="••••••" type="password" id="password_confirmation" required fullWidth
                        value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)}
                        error={!!errors.password_confirmation} helperText={errors.password_confirmation}
                    />
                </FormControl>
                <Button type="submit" fullWidth variant="contained" disabled={processing} sx={{ py: 1.5 }}>
                    Sign up
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account? <Link href={route('login')} style={{ color: '#0071e3', textDecoration: 'none' }}>Sign in</Link>
                </Typography>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button fullWidth variant="outlined" onClick={() => alert('Google signup is not yet configured')} startIcon={<span>G</span>} sx={{ textTransform: 'none' }}>
                    Sign up with Google
                </Button>
            </Box>
        </Card>
    );
}