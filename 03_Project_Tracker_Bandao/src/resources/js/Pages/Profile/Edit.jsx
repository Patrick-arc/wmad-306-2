import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Box, Container, Typography, Paper, Stack } from '@mui/material';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="#eceff2ff"
                >
                    Profile
                </Typography>
            }
        >
            <Head title="Profile" />

            {/* Page Background */}
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fb', py: 8 }}>
                <Container maxWidth="md">
                    <Stack spacing={6}>
                        {/* Profile Information */}
                        <Paper
                            elevation={3}
                            sx={{
                                p: { xs: 3, sm: 6 },
                                borderRadius: 3,
                                backgroundColor: '#ffffff',
                                color: '#2c3e50',
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Profile Information
                            </Typography>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </Paper>

                        {/* Update Password */}
                        <Paper
                            elevation={3}
                            sx={{
                                p: { xs: 3, sm: 6 },
                                borderRadius: 3,
                                backgroundColor: '#ffffff',
                                color: '#2c3e50',
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Update Password
                            </Typography>
                            <UpdatePasswordForm className="max-w-xl" />
                        </Paper>

                        {/* Delete Account */}
                        <Paper
                            elevation={3}
                            sx={{
                                p: { xs: 3, sm: 6 },
                                borderRadius: 3,
                                backgroundColor: '#fff5f5',
                                color: '#b71c1c',
                                border: '1px solid #f5c6cb',
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                mb={2}
                                color="#b71c1c"
                            >
                                Delete Account
                            </Typography>
                            <Typography variant="body2" mb={2} sx={{ color: '#b71c1c', opacity: 0.9 }}>
                                Warning: Deleting your account is irreversible. All your data will be permanently removed.
                            </Typography>
                            <Box sx={{ maxWidth: '400px' }}>
                                <DeleteUserForm className="w-full" />
                            </Box>
                        </Paper>
                    </Stack>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}