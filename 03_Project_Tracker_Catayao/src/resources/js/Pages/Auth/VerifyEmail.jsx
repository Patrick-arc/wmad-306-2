import AuthShell from '@/Components/AuthShell'
import { colors } from '@/theme/colors'
import { Head, Link, useForm } from '@inertiajs/react'
import { Alert, Button, CircularProgress, Stack } from '@mui/material'

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({})

    const submit = (event) => {
        event.preventDefault()
        post(route('verification.send'))
    }

    return (
        <>
            <Head title="Email Verification" />
            <AuthShell
                title="Verify Email"
                subtitle="Click the verification link we sent to your inbox. Need another link? Request one below."
                width={520}
            >
                {status === 'verification-link-sent' && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        A new verification link has been sent.
                    </Alert>
                )}

                <form onSubmit={submit}>
                    <Stack spacing={2}>
                        <Button type="submit" variant="contained" size="large" disabled={processing} sx={{ textTransform: 'none' }}>
                            {processing ? <CircularProgress size={20} sx={{ color: colors.white }} /> : 'Resend Verification Email'}
                        </Button>
                        <Button component={Link} href={route('logout')} method="post" as="button" variant="outlined" color="inherit" sx={{ textTransform: 'none' }}>
                            Log Out
                        </Button>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
