import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { FiCheckCircle, FiZap, FiShield } from 'react-icons/fi';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => { 
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    const route = (name) => `/${name}`;

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-6 py-12">
                
                <div className="flex w-full max-w-7xl items-center justify-between space-x-6">

                    {/* Left Feature Cards */}
                    <div className="hidden md:flex flex-col gap-8 w-1/4">
                        <div className="flex items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-x-4 hover:scale-105 transition">
                            <FiCheckCircle className="text-pink-400 text-3xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-white text-lg">Elegant Syntax</h3>
                                <p className="text-white/80 text-sm">
                                    Laravel provides clean, readable, and expressive syntax that makes development intuitive and enjoyable.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-x-4 hover:scale-105 transition">
                            <FiZap className="text-pink-400 text-3xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-white text-lg">Fast Development</h3>
                                <p className="text-white/80 text-sm">
                                    With built-in authentication, routing, queues, and caching, Laravel accelerates application development and deployment.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="w-full md:w-2/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-12 space-y-8">
                        <h2 className="text-3xl font-bold text-center text-white">Welcome Back!</h2>
                        <p className="text-center text-white/80 text-lg mb-4">Sign in to continue to your account and explore the power of Laravel</p>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-400 text-center">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email */}
                            <div className="flex flex-col">
                                <label className="text-white font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-xl border border-white/30 bg-white/10 placeholder-white/50 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-lg"
                                    placeholder="you@example.com"
                                    autoComplete="username"
                                />
                                <InputError message={errors.email} className="mt-1 text-red-400 text-sm" />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <label className="text-white font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-xl border border-white/30 bg-white/10 placeholder-white/50 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-lg"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <InputError message={errors.password} className="mt-1 text-red-400 text-sm" />
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between text-white">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 focus:ring-pink-400"
                                    />
                                    <span className="text-sm">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-sm hover:underline">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            {/* Submit Button */}
                            <PrimaryButton
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-lg transition"
                                disabled={processing}
                            >
                                {processing ? 'Logging in...' : 'Sign In'}
                            </PrimaryButton>
                        </form>

                        <p className="text-center text-white/80 text-sm mt-6">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="text-pink-300 hover:underline font-medium">
                                Register
                            </Link>
                        </p>
                    </div>

                    {/* Right Feature Cards */}
                    <div className="hidden md:flex flex-col gap-8 w-1/4">
                        <div className="flex items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-x-4 hover:scale-105 transition">
                            <FiShield className="text-pink-400 text-3xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-white text-lg">Secure & Scalable</h3>
                                <p className="text-white/80 text-sm">
                                    Laravel offers robust security, including hashed passwords, CSRF protection, and scalable architecture for apps of any size.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-x-4 hover:scale-105 transition">
                            <FiCheckCircle className="text-pink-400 text-3xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-white text-lg">Rich Ecosystem</h3>
                                <p className="text-white/80 text-sm">
                                    Explore Laracasts, Forge, Nova, official packages, and a large supportive community that makes Laravel development faster and easier.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}