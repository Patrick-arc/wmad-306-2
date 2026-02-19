import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

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
        <div className={`bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen relative overflow-hidden ${className}`}>
            {/* Animated Background Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8 animate-fade-in">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                            Delete Account
                        </h1>
                        <p className="text-gray-100 text-lg font-medium">
                            Permanently remove your account and all associated data
                        </p>
                    </div>

                    {/* Warning Card */}
                    <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl p-8 mb-6 animate-fade-in-delayed">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0">
                                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Warning: This action cannot be undone</h3>
                                <p className="text-gray-100 leading-relaxed">
                                    Once your account is deleted, all of its resources and data will be permanently deleted. 
                                    Before deleting your account, please download any data or information that you wish to retain.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="text-red-400">•</span>
                                All your projects will be permanently deleted
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-red-400">•</span>
                                Task history and comments will be removed
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-red-400">•</span>
                                Team memberships will be cancelled
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-red-400">•</span>
                                This action is irreversible
                            </div>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <div className="text-center animate-fade-in-delayed">
                        <DangerButton 
                            onClick={confirmUserDeletion}
                            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 border-0"
                        >
                            Delete Account
                        </DangerButton>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-2xl border border-white/10">
                    <form onSubmit={deleteUser} className="p-8">
                        <div className="text-center mb-6">
                            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Are you absolutely sure?
                            </h2>
                            <p className="text-gray-300">
                                This action cannot be undone. Please enter your password to confirm you want to permanently delete your account.
                            </p>
                        </div>

                        <div className="mb-6">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-gray-200 font-medium"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="mt-1 block w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400"
                                isFocused
                                placeholder="Enter your password to confirm"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-400"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <SecondaryButton 
                                onClick={closeModal}
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20"
                            >
                                Cancel
                            </SecondaryButton>

                            <DangerButton 
                                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 border-0"
                                disabled={processing}
                            >
                                {processing ? 'Deleting...' : 'Delete Account'}
                            </DangerButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-delayed {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    50% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }

                .animate-fade-in-delayed {
                    animation: fade-in-delayed 0.8s ease-out;
                }
            `}</style>
        </div>
    );
}
