import AuthShell from '@/Components/AuthShell'
import { authFieldSx, colors } from '@/theme/colors'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (event) => {
        event.preventDefault()
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') })
    }

    return (
        <>
            <Head title="Register" />
            <AuthShell title="Create Account" subtitle="Set up your workspace and start managing projects.">
                <form onSubmit={submit}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            fullWidth
                            sx={authFieldSx}
                        />
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
                        <TextField
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            fullWidth
                            sx={authFieldSx}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(event) => setData('password_confirmation', event.target.value)}
                            error={Boolean(errors.password_confirmation)}
                            helperText={errors.password_confirmation}
                            fullWidth
                            sx={authFieldSx}
                        />
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none', py: 1.2 }}>
                            {processing ? <CircularProgress size={20} sx={{ color: colors.white }} /> : 'Register'}
                        </Button>
                        <Typography textAlign="center" sx={{ color: colors.auth.textMuted }}>
                            Already have an account?{' '}
                            <Link href={route('login')} style={{ color: colors.brand.link }}>
                                Login
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
