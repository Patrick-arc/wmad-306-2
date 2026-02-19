import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// Inline SVG Icons
const EnvelopeIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
    </svg>
);

const LockClosedIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

          <div className="min-h-screen w-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">

    {/* Animated Background Elements */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    {/* FULL SCREEN LOGIN CONTAINER */}
    <div className="w-full h-screen flex flex-col justify-center items-center px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 text-white">
                        <LockClosedIcon />
                    </div>
                </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                Welcome Back
            </h1>
            <p className="text-blue-200 text-sm font-medium">
                Sign in to your account
            </p>
        </div>

        {/* FULL WIDTH CARD */}
        <div className="relative w-full max-w-2xl group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-75 transition duration-300"></div>

            <div className="relative bg-slate-800 w-full rounded-2xl shadow-2xl backdrop-blur">

                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="px-10 py-12">

                    {status && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl text-sm font-medium text-green-300 animate-slide-down flex items-start gap-3">
                            <CheckCircleIcon />
                            <span>{status}</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">

                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email Address" className="text-white font-semibold" />
                            <div className="relative mt-3">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
                                    <EnvelopeIcon />
                                </div>

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="pl-12 w-full px-4 py-4 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>

                            {errors.email && (
                                <InputError message={errors.email} className="mt-2 text-red-400 text-sm animate-shake" />
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-white font-semibold" />
                            <div className="relative mt-3">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
                                    <LockClosedIcon />
                                </div>

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="pl-12 w-full px-4 py-4 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>

                            {errors.password && (
                                <InputError message={errors.password} className="mt-2 text-red-400 text-sm animate-shake" />
                            )}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-500 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                                />
                                <span className="ms-3 text-sm text-slate-300">
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-6 py-4 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {processing ? "Signing in..." : (
                                <>
                                    <span>Sign in</span>
                                    <ArrowRightIcon />
                                </>
                            )}
                        </button>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-slate-700/50 border-t border-slate-600 text-center">
                    <p className="text-sm text-slate-300">
                        Don't have an account?{" "}
                        <Link
                            href={route('register')}
                            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </div>

            </div>
        </div>

    </div>
</div>



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
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-delayed {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    50% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-delayed-2 {
                    0% {
                        opacity: 0;
                    }
                    70% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    25% {
                        transform: translateX(-5px);
                    }
                    75% {
                        transform: translateX(5px);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }

                .animate-fade-in-delayed {
                    animation: fade-in-delayed 0.8s ease-out;
                }

                .animate-fade-in-delayed-2 {
                    animation: fade-in-delayed-2 1.2s ease-out;
                }

                .animate-slide-down {
                    animation: slide-down 0.4s ease-out;
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </GuestLayout>
    );
}