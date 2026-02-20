import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

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

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-600 via-white to-red-600 p-8">

                {/* Registration Form without container */}
                <form
                    onSubmit={submit}
                    className="w-full max-w-md flex flex-col space-y-5 text-gray-900"
                >
                    <h2 className="text-3xl font-bold text-center mb-2">
                        Create Account 🚀
                    </h2>
                    <p className="text-center mb-6">
                        Join us and start your journey
                    </p>

                    {/* Name */}
                    <div>
                        <InputLabel htmlFor="name" value="Full Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 w-full rounded-lg border border-gray-400 bg-white placeholder-gray-500 text-black focus:border-red-500 focus:ring-2 focus:ring-red-500 py-3 px-4"
                            autoComplete="name"
                            isFocused
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2 text-red-600" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email Address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 w-full rounded-lg border border-gray-400 bg-white placeholder-gray-500 text-black focus:border-red-500 focus:ring-2 focus:ring-red-500 py-3 px-4"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2 text-red-600" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 w-full rounded-lg border border-gray-400 bg-white placeholder-gray-500 text-black focus:border-red-500 focus:ring-2 focus:ring-red-500 py-3 px-4"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2 text-red-600" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 w-full rounded-lg border border-gray-400 bg-white placeholder-gray-500 text-black focus:border-red-500 focus:ring-2 focus:ring-red-500 py-3 px-4"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2 text-red-600" />
                    </div>

                    {/* Register Button */}
                    <PrimaryButton
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-300 text-white font-semibold"
                        disabled={processing}
                    >
                        {processing ? 'Creating Account...' : 'Register'}
                    </PrimaryButton>

                    <p className="text-center text-sm mt-6 text-gray-900">
                        Already have an account?{' '}
                        <Link href={route('login')} className="hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>
                </form>

            </div>
        </>
    );
}
