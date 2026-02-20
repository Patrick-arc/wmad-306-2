import AuthShell from '@/Components/AuthShell'
import { authFieldSx, colors } from '@/theme/colors'
import { Head, Link, router, useForm } from '@inertiajs/react'
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (event) => {
        event.preventDefault()
        if (processing) {
            return
        }
        post(route('login'), {
            onSuccess: () => router.visit(route('dashboard'), { replace: true }),
            onFinish: () => reset('password'),
        })
    }

    return (
        <>
            <Head title="Login" />
            <AuthShell title="Welcome Back" subtitle="Sign in to continue to your project tracker.">
                {status && (
                    <Typography sx={{ mb: 2, color: colors.feedback.success, textAlign: 'center' }}>
                        {status}
                    </Typography>
                )}

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
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(event) => setData('remember', event.target.checked)}
                                    sx={{ color: colors.brand.deep }}
                                />
                            )}
                            label="Remember me"
                            sx={{ color: colors.auth.textMuted }}
                        />
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none', py: 1.2 }}>
                            {processing ? <CircularProgress size={20} sx={{ color: colors.white }} /> : 'Sign In'}
                        </Button>
                        <Divider sx={{ borderColor: colors.auth.divider }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {canResetPassword ? (
                                <Link href={route('password.request')} style={{ color: colors.brand.link, fontSize: 14 }}>
                                    Forgot password?
                                </Link>
                            ) : <span />}
                            <Link href={route('register')} style={{ color: colors.brand.link, fontSize: 14 }}>
                                Create account
                            </Link>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link href={route('fake-email.index')} style={{ color: colors.brand.link, fontSize: 13 }}>
                                Open fake email inbox
                            </Link>
                        </Box>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
