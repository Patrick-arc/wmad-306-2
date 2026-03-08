import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import {
    Box,
    Typography,
    Snackbar,
    Alert,
    Container,
} from '@mui/material';
import { useThemeContext } from '@/Components/ThemeProvider';
import { useState } from 'react';

export default function UpdateProfileInformation({
    auth,
    mustVerifyEmail,
    status,
    className = '',
}) {
    const { theme } = useThemeContext();
    const user = auth?.user || { name: '', email: '' };
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => {
                setSnackbar({
                    open: true,
                    message: 'Profile updated successfully!',
                    severity: 'success'
                });
            },
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Error updating profile. Please check form.',
                    severity: 'error'
                });
            }
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box className={className}>
            {/* Form Container */}
            <Container component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Name Field */}
                <Box>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        helperText={errors.name}
                        required
                        autoComplete="name"
                    />
                </Box>

                {/* Email Field */}
                <Box>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        helperText={errors.email}
                        required
                        autoComplete="username"
                    />
                </Box>

                {/* Email Verification Section */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <Box sx={{ 
                        p: 3, 
                        backgroundColor: theme.palette.warning.light,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.warning.main}`
                    }}>
                        <Typography variant="body2" sx={{ color: theme.palette.warning.dark, mb: 2 }}>
                            Your email address is unverified.
                        </Typography>
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            sx={{
                                textDecoration: 'none',
                                color: theme.palette.warning.main,
                                '&:hover': {
                                    textDecoration: 'underline',
                                }
                            }}
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    color: theme.palette.warning.main,
                                    borderColor: theme.palette.warning.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.warning.main,
                                        color: theme.palette.warning.contrastText,
                                    }
                                }}
                            >
                                Click here to re-send verification email.
                            </Button>
                        </Link>
                    </Box>
                )}

                {/* Status Message */}
                {status === 'verification-link-sent' && (
                    <Box sx={{ 
                        p: 3, 
                        backgroundColor: theme.palette.success.light,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.success.main}`
                    }}>
                        <Typography variant="body2" sx={{ color: theme.palette.success.dark }}>
                            A new verification link has been sent to your email address.
                        </Typography>
                    </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    {recentlySuccessful && (
                        <Box
                            sx={{
                                p: 2,
                                mt: 2,
                                backgroundColor: theme.palette.success.light,
                                border: `1px solid ${theme.palette.success.main}`,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2" sx={{ color: theme.palette.success.dark }}>
                                Saved!
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
            
            {/* Success/Error Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
