import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <LockIcon sx={{ color: 'primary.main', fontSize: 34 }} />
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Update Password</Typography>
                    <Typography variant="body2" color="text.secondary">Ensure your account is using a long, random password to stay secure.</Typography>
                </Box>
            </Box>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <TextField
                        id="current_password"
                        label="Current Password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        fullWidth
                        size="small"
                        autoComplete="current-password"
                        variant="outlined"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <TextField
                        id="password"
                        label="New Password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        fullWidth
                        size="small"
                        autoComplete="new-password"
                        variant="outlined"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <TextField
                        id="password_confirmation"
                        label="Confirm Password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        fullWidth
                        size="small"
                        autoComplete="new-password"
                        variant="outlined"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

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
