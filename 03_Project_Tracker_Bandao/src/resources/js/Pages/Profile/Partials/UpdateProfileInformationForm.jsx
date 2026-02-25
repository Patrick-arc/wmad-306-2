import { useForm, usePage } from '@inertiajs/react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Avatar,
    Stack,
} from '@mui/material';
import {
    Person as PersonIcon,
    Edit as EditIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    try {
        const page = usePage();
        const user = page?.props?.auth?.user || { name: '', email: '' };

        const { data, setData, patch, errors, processing, recentlySuccessful } =
            useForm({
                name: user.name,
                email: user.email,
            });

        const submit = (e) => {
            e.preventDefault();
            patch('/profile');
        };

        return (
            <Box className={className}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ 
                        bgcolor: '#4361ee',
                        width: 56,
                        height: 56,
                        boxShadow: '0 4px 12px rgba(67, 97, 238, 0.3)'
                    }}>
                        <PersonIcon sx={{ fontSize: 28 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
                            Profile Information
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Update your account information and personal details
                        </Typography>
                    </Box>
                </Box>

                {recentlySuccessful && (
                    <Alert 
                        severity="success" 
                        sx={{ mb: 3 }}
                        icon={<CheckIcon />}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Profile updated successfully!
                        </Typography>
                    </Alert>
                )}

                <form onSubmit={submit}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            autoComplete="name"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(67, 97, 238, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(67, 97, 238, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4361ee',
                                    },
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            autoComplete="username"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(67, 97, 238, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(67, 97, 238, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4361ee',
                                    },
                                }
                            }}
                        />

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Your email address is unverified.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    component="a"
                                    href="/email/verification-notification"
                                    method="post"
                                    as="button"
                                    sx={{
                                        borderColor: 'rgba(67, 97, 238, 0.5)',
                                        color: '#4361ee',
                                        '&:hover': {
                                            borderColor: '#4361ee',
                                            bgcolor: 'rgba(67, 97, 238, 0.04)',
                                        }
                                    }}
                                >
                                    Click here to re-send the verification email.
                                </Button>
                            </Box>
                        )}

                        {status === 'verification-link-sent' && (
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    A new verification link has been sent to your email address.
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                                startIcon={<EditIcon />}
                                sx={{
                                    py: 1.5,
                                    px: 4,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg, #4361ee, #764ba2)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #764ba2, #4361ee)',
                                        boxShadow: '0 4px 12px rgba(67, 97, 238, 0.3)',
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(0, 0, 0, 0.12)',
                                        color: 'rgba(0, 0, 0, 0.26)'
                                    }
                                }}
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </Button>

                            {recentlySuccessful && (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    color: '#4361ee'
                                }}>
                                    <CheckIcon sx={{ fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        Saved
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Stack>
                </form>
            </Box>
        );
    } catch (error) {
        console.error('Error in UpdateProfileInformationForm:', error);
        return (
            <Box className={className}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                        Error loading profile information. Please refresh the page and try again.
                    </Typography>
                </Alert>
            </Box>
        );
    }
}
