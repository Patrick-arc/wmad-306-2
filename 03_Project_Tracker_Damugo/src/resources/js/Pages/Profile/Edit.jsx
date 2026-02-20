import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Box, Container, Card, CardContent, Typography } from '@mui/material';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h4"
                    sx={{
                        color: '#bfa76a',
                        fontWeight: 900,
                        fontSize: { xs: 20, md: 32 },
                        letterSpacing: 0.6,
                    }}
                >
                    Profile
                </Typography>
            }
        >
            <Head title="Profile" />

            <Box sx={{ py: 6, background: '#232323', minHeight: '70vh' }}>
                <Container maxWidth="lg" sx={{ display: 'grid', gap: 3 }}>
                    <Card sx={{ background: 'linear-gradient(180deg, #121212, #181818)', color: '#fff', borderRadius: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.6)', border: '1px solid rgba(191,167,106,0.06)' }}>
                        <CardContent>
                            <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="" />
                        </CardContent>
                    </Card>

                    <Card sx={{ background: 'linear-gradient(180deg, #121212, #181818)', color: '#fff', borderRadius: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.6)', border: '1px solid rgba(191,167,106,0.06)' }}>
                        <CardContent>
                            <UpdatePasswordForm className="" />
                        </CardContent>
                    </Card>

                    <Card sx={{ background: 'linear-gradient(180deg, #121212, #181818)', color: '#fff', borderRadius: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.6)', border: '1px solid rgba(191,167,106,0.06)' }}>
                        <CardContent>
                            <DeleteUserForm className="" />
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}
