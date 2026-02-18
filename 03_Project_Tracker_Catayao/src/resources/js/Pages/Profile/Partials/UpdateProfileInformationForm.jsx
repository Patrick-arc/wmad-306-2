import { Link, useForm, usePage } from '@inertiajs/react'
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'

export default function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    })

    const submit = (event) => {
        event.preventDefault()
        patch(route('profile.update'))
    }

    return (
        <section>
            <Typography variant="h6" fontWeight={700}>Profile Information</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                Update your account name and email.
            </Typography>

            <form onSubmit={submit}>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        value={data.name}
                        onChange={(event) => setData('name', event.target.value)}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(event) => setData('email', event.target.value)}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        fullWidth
                    />

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <Alert severity="warning">
                            Your email is unverified.{' '}
                            <Link href={route('verification.send')} method="post" as="button" style={{ textDecoration: 'underline' }}>
                                Click to resend verification email
                            </Link>.
                        </Alert>
                    )}

                    {status === 'verification-link-sent' && (
                        <Alert severity="success">A new verification link has been sent.</Alert>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none' }}>
                            Save
                        </Button>
                        {recentlySuccessful && <Typography color="success.main">Saved.</Typography>}
                    </Box>
                </Stack>
            </form>
        </section>
    )
}
