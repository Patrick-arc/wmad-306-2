import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Delete Account</Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </Typography>
            </header>

            <Button variant="contained" color="error" onClick={confirmUserDeletion} sx={{ textTransform: 'none', background: 'linear-gradient(90deg,#FF6B6B,#F44336)' }}>Delete Account</Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'error.light' }}>
                            <WarningAmberIcon sx={{ color: 'error.main' }} />
                        </Avatar>

                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Are you sure you want to delete your account?</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                            </Typography>
                        </Box>
                    </Box>

                    <div className="mt-6">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="outlined" onClick={closeModal} sx={{ textTransform: 'none', minWidth: 140 }}>Cancel</Button>

                        <Button variant="contained" color="error" type="submit" disabled={processing} sx={{ textTransform: 'none', minWidth: 140, background: 'linear-gradient(90deg,#FF6B6B,#F44336)' }}>Delete Account</Button>
                    </Box>
                </form>
            </Modal>
        </section>
    );
}
