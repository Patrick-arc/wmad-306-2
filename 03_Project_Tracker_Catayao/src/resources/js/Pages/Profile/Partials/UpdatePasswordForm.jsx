import { useForm } from '@inertiajs/react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'

export default function UpdatePasswordForm() {
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const updatePassword = (event) => {
        event.preventDefault()
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                reset('password', 'password_confirmation')
            },
        })
    }

    return (
        <section>
            <Typography variant="h6" fontWeight={700}>Update Password</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                Use a long, unique password to keep your account secure.
            </Typography>

            <form onSubmit={updatePassword}>
                <Stack spacing={2}>
                    <TextField
                        label="Current Password"
                        type="password"
                        value={data.current_password}
                        onChange={(event) => setData('current_password', event.target.value)}
                        error={Boolean(errors.current_password)}
                        helperText={errors.current_password}
                        fullWidth
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        value={data.password}
                        onChange={(event) => setData('password', event.target.value)}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(event) => setData('password_confirmation', event.target.value)}
                        error={Boolean(errors.password_confirmation)}
                        helperText={errors.password_confirmation}
                        fullWidth
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none' }}>
                            Save Password
                        </Button>
                        {recentlySuccessful && <Typography color="success.main">Saved.</Typography>}
                    </Box>
                </Stack>
            </form>
        </section>
    )
}
