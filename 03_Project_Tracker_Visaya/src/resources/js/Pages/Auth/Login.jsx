import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Box, Paper, Stack, Typography } from '@mui/material';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const footerHeight = 36;

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    pb: `${footerHeight + 16}px`,
                }}
            >
                {/* Background */}
                <Box
                    aria-hidden
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        background:
                            'radial-gradient(900px 420px at 12% 10%, rgba(99,102,241,0.18), transparent 55%),' +
                            'radial-gradient(820px 420px at 88% 18%, rgba(19, 165, 116, 0.14), transparent 55%)',
                    }}
                />

                {/* Content (no Container) */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: { xs: 2, sm: 3 },
                        py: { xs: 5, sm: 7 },
                        position: 'relative',
                    }}
                >
                    <Paper
                        elevation={0}
                        variant="outlined"
                        sx={{
                            width: '100%',
                            maxWidth: 700,
                            borderRadius: 3,
                            p: { xs: 4, sm: 5 },
                            borderColor: 'rgba(255,255,255,0.35)',
                            background:
                                'linear-gradient(180deg, rgba(255,255,255,0.70), rgba(255,255,255,0.45))',
                            backdropFilter: 'blur(14px)',
                            WebkitBackdropFilter: 'blur(14px)',
                            boxShadow: '0 18px 55px rgba(0,0,0,0.08)',
                        }}
                    >
                        <Stack spacing={3}>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: { xs: 22, sm: 26 } }}>
                                    Log in
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{ mt: 1, color: 'text.secondary', fontSize: 13 }}
                                >
                                    Enter your email and password to continue.
                                </Typography>
                            </Box>

                            {status && (
                                <Typography variant="body2" sx={{ color: 'success.main', fontSize: 13 }}>
                                    {status}
                                </Typography>
                            )}

                            <Box component="form" onSubmit={submit}>
                                <Stack spacing={2.5}>
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                    </label>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={1.5}
                                        alignItems={{ xs: 'stretch', sm: 'center' }}
                                        justifyContent="space-between"
                                    >
                                        {canResetPassword ? (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                            >
                                                Forgot your password?
                                            </Link>
                                        ) : (
                                            <span />
                                        )}

                                        <PrimaryButton disabled={processing}>Log in</PrimaryButton>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>

                {/* Footer (no Container) */}
                <Box
                    component="footer"
                    sx={{
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: footerHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTop: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: 'rgba(255,255,255,0.55)',
                        backdropFilter: 'blur(12px)',
                        px: 2,
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', fontSize: 12, textAlign: 'center' }}
                    >
                       
                    </Typography>
                </Box>
            </Box>
        </GuestLayout>
    );
}