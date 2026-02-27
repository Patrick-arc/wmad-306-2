import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccountCircle sx={{ color: 'primary.main', fontSize: 36 }} />
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Profile Information</Typography>
                    <Typography variant="body2" color="text.secondary">Update your account's profile information and email address.</Typography>
                </Box>
            </Box>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <TextField
                        id="name"
                        label="Name"
                        fullWidth
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        variant="outlined"
                        size="small"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        variant="outlined"
                        size="small"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-1 underline"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </Typography>

                        {status === 'verification-link-sent' && (
                            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                                A new verification link has been sent to your email address.
                            </Typography>
                        )}
                    </div>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button disabled={processing} type="submit" variant="contained" sx={{ textTransform: 'none', background: 'linear-gradient(90deg,#7C62FF,#5E3BFF)' }}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <Typography variant="body2" color="text.secondary">Saved.</Typography>
                    </Transition>
                </Box>
            </form>
        </section>
    );
}
