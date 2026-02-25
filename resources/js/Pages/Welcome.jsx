import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Welcome to Project Tracker" />
            <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center">
                <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl text-center">
                    
                    {/* Header Navigation */}
                    <nav className="absolute top-0 right-0 p-6 flex justify-end space-x-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-white hover:text-red-500">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-white hover:text-red-500">Log in</Link>
                                <Link href={route('register')} className="text-white hover:text-red-500">Register</Link>
                            </>
                        )}
                    </nav>

                    {/* Main Content */}
                    <main className="mt-6">
                        <h1 className="text-6xl font-bold text-red-600 mb-4 uppercase">
                            Project Tracker
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                            A premium management system developed for WMAD-306 to streamline your workflow.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-lg shadow-xl transition-all uppercase tracking-widest"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-lg shadow-xl transition-all uppercase tracking-widest"
                                    >
                                        Sign In Now
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-10 py-4 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-black rounded-lg transition-all uppercase tracking-widest"
                                    >
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </main>

                    <footer className="mt-16 text-sm text-gray-600">
                        Laravel v{window.laravel_version} | PHP v{window.php_version}
                    </footer>
                </div>
            </div>
        </>
    );
}