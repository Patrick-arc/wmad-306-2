import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Project Tracker" />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header with Navigation */}
                <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-sm sticky top-0">
                    <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            📊 Project Tracker
                        </div>
                        <div className="flex gap-4">
                            {auth.user ? (
                                <>
                                    <span className="text-gray-700 dark:text-gray-300">Welcome, {auth.user.name}!</span>
                                    <Link
                                        href={route('dashboard')}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center px-6 py-20">
                    <div className="max-w-2xl w-full">
                        <div className="text-center mb-12">
                            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                Manage Your Projects Effortlessly
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                A simple and powerful project tracking system to keep your team organized and productive.
                            </p>
                            {!auth.user && (
                                <div className="flex gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-lg border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition font-semibold"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-6 mt-16">
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                                <div className="text-4xl mb-3">✅</div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                    Track Tasks
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Create and manage tasks with ease. Assign them to team members and track progress.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                                <div className="text-4xl mb-3">📈</div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                    Monitor Progress
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Visualize project timelines and track completion status at a glance.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                                <div className="text-4xl mb-3">👥</div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                    Team Collaboration
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Work together seamlessly with your team in real-time updates.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600 dark:text-gray-400">
                        <p>&copy; 2026 Project Tracker. Organize, Collaborate, Deliver.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
