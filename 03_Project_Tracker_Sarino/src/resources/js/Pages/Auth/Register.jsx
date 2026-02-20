import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { FiZap, FiShield, FiBookOpen, FiCode } from 'react-icons/fi';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 px-6 py-12">

                {/* Centered Container */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">

                    {/* Registration Form Card */}
                    <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 space-y-6">
                        <h2 className="text-3xl font-bold text-center text-white">Create Your Account</h2>
                        <p className="text-center text-white/80 text-lg mb-6">
                            Join us today and start building amazing applications with Laravel!
                        </p>

                        <form onSubmit={submit} className="space-y-5">

                            {/* Full Name */}
                            <div className="flex flex-col">
                                <InputLabel htmlFor="name" value="Full Name" className="text-white" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 placeholder-white/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-lg"
                                    autoComplete="name"
                                    required
                                />
                                <InputError message={errors.name} className="mt-1 text-red-400 text-sm" />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <InputLabel htmlFor="email" value="Email Address" className="text-white" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 placeholder-white/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-lg"
                                    autoComplete="username"
                                    required
                                />
                                <InputError message={errors.email} className="mt-1 text-red-400 text-sm" />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <InputLabel htmlFor="password" value="Password" className="text-white" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 placeholder-white/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-lg"
                                    autoComplete="new-password"
                                    required
                                />
                                <InputError message={errors.password} className="mt-1 text-red-400 text-sm" />
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col">
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-white" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 placeholder-white/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-lg"
                                    autoComplete="new-password"
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-1 text-red-400 text-sm" />
                            </div>

                            {/* Register Button */}
                            <PrimaryButton
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-lg transition"
                                disabled={processing}
                            >
                                {processing ? 'Creating Account...' : 'Register'}
                            </PrimaryButton>
                        </form>

                        <p className="text-center text-white/80 text-sm mt-6">
                            Already have an account?{' '}
                            <Link href={route('login')} className="text-pink-300 hover:underline font-medium">
                                Sign In
                            </Link>
                        </p>
                    </div>

                    {/* Laravel Features Side Panel */}
                    <div className="hidden md:flex flex-col w-1/2 space-y-6 p-6">
                        <h3 className="text-2xl font-bold text-white text-center mb-4">Why Laravel Rocks?</h3>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-x-3 hover:scale-105 transition">
                                <FiZap className="text-pink-400 text-2xl mt-1" />
                                <div>
                                    <h4 className="font-semibold text-white">Rapid Development</h4>
                                    <p className="text-white/80 text-sm">Artisan commands and built-in tools speed up your development process.</p>
                                </div>
                            </div>

                            <div className="flex items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-x-3 hover:scale-105 transition">
                                <FiShield className="text-pink-400 text-2xl mt-1" />
                                <div>
                                    <h4 className="font-semibold text-white">Secure & Robust</h4>
                                    <p className="text-white/80 text-sm">Authentication, encryption, and secure routing to protect your app.</p>
                                </div>
                            </div>

                            <div className="flex items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-x-3 hover:scale-105 transition">
                                <FiBookOpen className="text-pink-400 text-2xl mt-1" />
                                <div>
                                    <h4 className="font-semibold text-white">Rich Learning Resources</h4>
                                    <p className="text-white/80 text-sm">Laracasts, tutorials, and community support to help you grow.</p>
                                </div>
                            </div>

                            <div className="flex items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-x-3 hover:scale-105 transition">
                                <FiCode className="text-pink-400 text-2xl mt-1" />
                                <div>
                                    <h4 className="font-semibold text-white">Elegant & Readable Code</h4>
                                    <p className="text-white/80 text-sm">Follow best practices and write clean, maintainable code easily.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}