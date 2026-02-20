import { Head, Link, router } from '@inertiajs/react'
import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'
import { colors } from '@/theme/colors'
import DeleteUserForm from './Partials/DeleteUserForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />
            <Box
                sx={{
                    minHeight: '100vh',
                    py: { xs: 4, md: 6 },
                    background: colors.background.surfaceGradient,
                }}
            >
                <Container maxWidth="md">
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Button component={Link} href={route('dashboard')} startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
                                    Dashboard
                                </Button>
                                <Typography variant="h4" fontWeight={800}>Profile</Typography>
                            </Stack>
                            <Button variant="outlined" color="inherit" startIcon={<LogoutIcon />} onClick={() => router.post(route('logout'))} sx={{ textTransform: 'none' }}>
                                Logout
                            </Button>
                        </Stack>

                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                            </CardContent>
                        </Card>

                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <UpdatePasswordForm />
                            </CardContent>
                        </Card>

                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <DeleteUserForm />
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
