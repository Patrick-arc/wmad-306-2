import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Box, Typography, Card, CardContent } from '@mui/material';

export default function Edit({ mustVerifyEmail, status }) {
    // Gradient button style
    const gradientButton = {
        background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
        color: '#fff',
        textTransform: 'none',
        '&:hover': {
            background: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
            boxShadow: '0 0 20px rgba(139,92,246,0.5)',
        },
    };

    // Form input styles
    const formInputStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#8B5CF6',
            },
            '&:hover fieldset': {
                borderColor: '#6366F1',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4C1D95',
                borderWidth: 2,
            },
        },
        '& .MuiInputLabel-root': {
            color: '#4C1D95',
            '&.Mui-focused': {
                color: '#6366F1',
            },
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h4" sx={{ color: '#4C1D95', fontWeight: 'bold' }}>
                    Profile
                </Typography>
            }
        >
            <Head title="Profile" />

            <Box sx={{ py: 6, px: { xs: 2, sm: 3, md: 6 }, background: 'linear-gradient(135deg,#1e1b4b,#312e81,#6366F1)', minHeight: '100vh' }}>
                <Box sx={{ mx: 'auto', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 4 }}>

                    {/* Update Profile Information */}
                    <Card sx={{ borderRadius: 3, background: '#F3F4F6', '&:hover': { boxShadow: '0 8px 20px rgba(139,92,246,0.2)' }, transition: '0.3s' }}>
                        <CardContent>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                                sx={{
                                    button: gradientButton,
                                    ...formInputStyle,
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Update Password */}
                    <Card sx={{ borderRadius: 3, background: '#F3F4F6', '&:hover': { boxShadow: '0 8px 20px rgba(139,92,246,0.2)' }, transition: '0.3s' }}>
                        <CardContent>
                            <UpdatePasswordForm 
                                className="max-w-xl"
                                sx={{
                                    button: gradientButton,
                                    ...formInputStyle,
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Delete Account */}
                    <Card sx={{ borderRadius: 3, background: '#F3F4F6', '&:hover': { boxShadow: '0 8px 20px rgba(139,92,246,0.2)' }, transition: '0.3s' }}>
                        <CardContent>
                            <DeleteUserForm 
                                className="max-w-xl"
                                sx={{ button: gradientButton }}
                            />
                        </CardContent>
                    </Card>

                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
