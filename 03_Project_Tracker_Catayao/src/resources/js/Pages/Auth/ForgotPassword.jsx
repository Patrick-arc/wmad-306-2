import AuthShell from '@/Components/AuthShell'
import { authFieldSx, colors } from '@/theme/colors'
import { Head, Link, useForm } from '@inertiajs/react'
import { Alert, Box, Button, CircularProgress, Stack, TextField } from '@mui/material'

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' })

    const submit = (event) => {
        event.preventDefault()
        post(route('password.email'))
    }

    return (
        <>
            <Head title="Forgot Password" />
            <AuthShell title="Forgot Password" subtitle="Enter your email and we will send a password reset link.">
                {status && <Alert severity="success" sx={{ mb: 2 }}>{status}</Alert>}
                <form onSubmit={submit}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            fullWidth
                            sx={authFieldSx}
                        />
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none', py: 1.2 }}>
                            {processing ? <CircularProgress size={20} sx={{ color: colors.white }} /> : 'Send Reset Link'}
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link href={route('fake-email.index')} style={{ color: colors.brand.link, fontSize: 13 }}>
                                Check fake email inbox
                            </Link>
                        </Box>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
