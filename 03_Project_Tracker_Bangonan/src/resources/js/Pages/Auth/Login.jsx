import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

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
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-red-600 via-white to-red-600">

                {/* Left Side - Login Form */}
                <div className="flex w-full md:w-1/2 items-center justify-center p-8 relative">
                    {/* Optional Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1601758123927-7f4b8f0dc7d4?auto=format&fit=crop&w=1770&q=80"
                            alt="Background"
                            className="w-full h-full object-cover opacity-30"
                        />
                    </div>

                    {/* Login Form */}
                    <form 
                        onSubmit={submit} 
                        className="relative z-10 w-full max-w-md flex flex-col space-y-6 text-gray-900"
                    >
                        <h2 className="text-3xl font-bold text-center mb-2">
                            Welcome Back 👋
                        </h2>
                        <p className="text-center mb-8">
                            Log in to your account
                        </p>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 text-center">
                                {status}
                            </div>
                        )}

                        {/* Email */}
                        <div className="flex flex-col">
                            <InputLabel htmlFor="email" value="Email" className="text-gray-900" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 w-full rounded-xl border border-gray-400 bg-white placeholder-gray-500 text-black focus:border-red-500 focus:ring-2 focus:ring-red-500 py-3 px-4"
                                autoComplete="username"
                                isFocused
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                            />
                            <InputError message={errors.email} className="mt-2 text-red-600" />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <InputLabel htmlFor="password" value="Password" className="text-gray-900" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 w-full rounded-xl border border-gray-400 bg-white placeholder-gray-500 text-black focus:border-red-500 focus:ring-2 focus:ring-red-500 py-3 px-4"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="mt-2 text-red-600" />
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-gray-900">
                            <label className="flex items-center space-x-2">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="text-sm">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <PrimaryButton
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-300 text-white font-semibold"
                            disabled={processing}
                        >
                            {processing ? 'Logging in...' : 'Log In'}
                        </PrimaryButton>

                        <p className="text-center text-sm mt-6 text-gray-900">
                            Don’t have an account?{' '}
                            <Link
                                href={route('register')}
                                className="hover:underline font-medium"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Right Side - Laravel Info */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-red-500 to-red-700 relative items-center justify-center p-12">
                    <div className="text-left text-white max-w-lg space-y-6">
                        <h1 className="text-4xl font-bold mb-4">About Laravel</h1>
                        <p className="text-lg">
                            Laravel is a modern PHP framework designed for web application development. 
                            It provides elegant syntax, powerful tools, and a large ecosystem for rapid development.
                        </p>
                        <p className="text-lg">
                            With Laravel, you can build secure, scalable, and maintainable applications. 
                            It comes with built-in features like authentication, routing, queues, caching, and more.
                        </p>
                        <p className="text-lg">
                            The Laravel ecosystem includes Laracasts, Forge, Nova, and a vibrant community that helps developers grow and share knowledge.
                        </p>
                        <p className="text-lg">
                            Start building your next project with Laravel and experience the power of modern PHP development.
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}
