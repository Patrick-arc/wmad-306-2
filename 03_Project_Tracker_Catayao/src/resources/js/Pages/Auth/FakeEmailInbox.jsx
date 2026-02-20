import { colors } from '@/theme/colors'
import { Head, Link } from '@inertiajs/react'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    Typography,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { alpha } from '@mui/material/styles'

export default function FakeEmailInbox({ emails = [], logFileExists = false }) {
    return (
        <>
            <Head title="Fake Email Inbox" />
            <Box sx={{ minHeight: '100vh', py: 6, background: colors.background.surfaceGradient }}>
                <Container maxWidth="md">
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5}>
                            <Button component={Link} href={route('password.request')} startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
                                Forgot Password
                            </Button>
                            <Typography variant="h4" fontWeight={800}>Fake Email Inbox</Typography>
                        </Stack>

                        <Card
                            sx={{
                                borderRadius: 4,
                                background: alpha(colors.white, 0.78),
                                backdropFilter: 'blur(12px)',
                                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                            }}
                        >
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Development-only inbox. Reset emails are read from `storage/logs/laravel.log`.
                                </Typography>
                            </CardContent>
                        </Card>

                        {!logFileExists && (
                            <Card sx={{ borderRadius: 4 }}>
                                <CardContent>
                                    <Typography>No log file found yet. Request a reset link first.</Typography>
                                </CardContent>
                            </Card>
                        )}

                        {logFileExists && emails.length === 0 && (
                            <Card sx={{ borderRadius: 4 }}>
                                <CardContent>
                                    <Typography>No password reset emails detected yet.</Typography>
                                </CardContent>
                            </Card>
                        )}

                        <Stack spacing={2}>
                            {emails.map((mail, index) => (
                                <Card key={`${mail.reset_url}-${index}`} sx={{ borderRadius: 4 }}>
                                    <CardContent>
                                        <Stack spacing={1.2}>
                                            <Typography fontWeight={700}>To: {mail.to}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {mail.logged_at ? `Logged at: ${mail.logged_at}` : 'Logged at: unavailable'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                                {mail.reset_url}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                endIcon={<OpenInNewIcon />}
                                                component="a"
                                                href={mail.reset_url}
                                                sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                                            >
                                                Open reset link
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
