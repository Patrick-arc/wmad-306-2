import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Card,
    CardContent,
    Avatar,
    Stack,
} from '@mui/material';
import {
    Lock as LockIcon,
    Security as SecurityIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put('/password', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Box className={className}>
            <Card 
                sx={{ 
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    }
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Avatar sx={{ 
                            bgcolor: '#10b981',
                            width: 56,
                            height: 56,
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                        }}>
                            <SecurityIcon sx={{ fontSize: 28 }} />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
                                Update Password
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ensure your account is using a long, random password to stay secure
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
                                Password updated successfully!
                            </Typography>
                        </Alert>
                    )}

                    <form onSubmit={updatePassword}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                id="current_password"
                                label="Current Password"
                                type="password"
                                inputRef={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                error={!!errors.current_password}
                                helperText={errors.current_password}
                                autoComplete="current-password"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(16, 185, 129, 0.3)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(16, 185, 129, 0.5)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#10b981',
                                        },
                                    }
                                }}
                            />

                            <TextField
                                fullWidth
                                id="password"
                                label="New Password"
                                type="password"
                                inputRef={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                autoComplete="new-password"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(16, 185, 129, 0.3)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(16, 185, 129, 0.5)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#10b981',
                                        },
                                    }
                                }}
                            />

                            <TextField
                                fullWidth
                                id="password_confirmation"
                                label="Confirm New Password"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                error={!!errors.password_confirmation}
                                helperText={errors.password_confirmation}
                                autoComplete="new-password"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(16, 185, 129, 0.3)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(16, 185, 129, 0.5)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#10b981',
                                        },
                                    }
                                }}
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={processing}
                                    startIcon={<LockIcon />}
                                    sx={{
                                        py: 1.5,
                                        px: 4,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #059669, #047857)',
                                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                                        },
                                        '&.Mui-disabled': {
                                            background: 'rgba(0, 0, 0, 0.12)',
                                            color: 'rgba(0, 0, 0, 0.26)'
                                        }
                                    }}
                                >
                                    {processing ? 'Updating...' : 'Update Password'}
                                </Button>

                                {recentlySuccessful && (
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 1,
                                        color: '#10b981'
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
                </CardContent>
            </Card>
        </Box>
    );
}
