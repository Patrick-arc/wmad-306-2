import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Project Tracker" />
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen relative overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="w-full">
                        {/* Header */}
                        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
                            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-200 font-bold text-xl">Project Tracker</span>
                                        <span className="text-gray-400 text-xs">Manage Your Work</span>
                                    </div>
                                </div>
                                <nav className="flex items-center gap-4">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="px-6 py-2 text-white/80 hover:text-white transition-colors duration-200"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </div>
                        </header>

                        {/* Main Content - Landscape Layout */}
                        <main className="pt-20 px-6">
                            <div className="max-w-7xl mx-auto">
                                {/* Hero Section */}
                                <div className="grid grid-cols-2 gap-12 items-center mb-20">
                                    {/* Left Side - Text Content */}
                                    <div className="animate-fade-in">
                                        <h2 className="text-5xl font-bold mb-6 leading-tight">
                                            Manage Projects with
                                            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                Confidence
                                            </span>
                                        </h2>
                                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                            Streamline your workflow, organize tasks, collaborate with your team, and track progress all in one powerful platform. Built for teams of all sizes.
                                        </p>
                                        <div className="flex gap-4">
                                            {auth.user ? (
                                                <Link
                                                    href={route('dashboard')}
                                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                                                >
                                                    Go to Dashboard
                                                </Link>
                                            ) : (
                                                <>
                                                    <Link
                                                        href={route('register')}
                                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                                                    >
                                                        Get Started
                                                    </Link>
                                                    <Link
                                                        href={route('login')}
                                                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20"
                                                    >
                                                        Sign In
                                                    </Link>
                                                </>
                                            )}
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
                                            <div>
                                                <p className="text-3xl font-bold text-blue-400">50K+</p>
                                                <p className="text-gray-400">Active Users</p>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-blue-400">99.9%</p>
                                                <p className="text-gray-400">Uptime</p>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-blue-400">4.9★</p>
                                                <p className="text-gray-400">Rating</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side - Feature Cards */}
                                    <div className="space-y-6 animate-fade-in-delayed">
                                        {[
                                            {
                                                title: 'Project Management',
                                                desc: 'Create and organize projects with ease',
                                                icon: '📊'
                                            },
                                            {
                                                title: 'Task Tracking',
                                                desc: 'Break down work into manageable tasks',
                                                icon: '✓'
                                            },
                                            {
                                                title: 'Team Collaboration',
                                                desc: 'Work together in real-time',
                                                icon: '👥'
                                            },
                                            {
                                                title: 'Analytics & Reports',
                                                desc: 'Track progress with detailed insights',
                                                icon: '📈'
                                            }
                                        ].map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <span className="text-3xl">{feature.icon}</span>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                                                        <p className="text-sm text-gray-400 mt-1">{feature.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Features Grid Section */}
                                <div className="mb-20">
                                    <h3 className="text-4xl font-bold text-center mb-12">
                                        Everything You Need
                                    </h3>
                                    <div className="grid grid-cols-2 gap-8">
                                        {[
                                            {
                                                title: 'Project Management',
                                                desc: 'Create, organize, and manage your projects with ease. Track project details, set deadlines, assign team members, and monitor progress all in one place.',
                                                icon: '📋'
                                            },
                                            {
                                                title: 'Task Tracking',
                                                desc: 'Break down your projects into manageable tasks. Create, assign, and track individual tasks with due dates, priorities, and status updates.',
                                                icon: '✅'
                                            },
                                            {
                                                title: 'Team Collaboration',
                                                desc: 'Collaborate seamlessly with your team members. Share project updates, assign tasks, and communicate effectively in real-time.',
                                                icon: '🤝'
                                            },
                                            {
                                                title: 'Progress Analytics',
                                                desc: 'Get insights into your project performance with detailed analytics and reporting. Track completion rates and make data-driven decisions.',
                                                icon: '📊'
                                            }
                                        ].map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="group p-8 bg-gradient-to-br from-white/5 to-white/5 hover:from-blue-500/10 hover:to-purple-500/10 border border-white/10 hover:border-blue-500/20 rounded-xl transition-all duration-300 backdrop-blur-sm hover:shadow-xl"
                                            >
                                                <div className="text-5xl mb-4">{feature.icon}</div>
                                                <h4 className="text-2xl font-semibold text-white mb-3">{feature.title}</h4>
                                                <p className="text-gray-400 leading-relaxed mb-6">{feature.desc}</p>
                                                <a
                                                    href="#"
                                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                                                >
                                                    Learn more
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Section */}
                                {!auth.user && (
                                    <div className="text-center py-20 px-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
                                        <h3 className="text-4xl font-bold mb-6">Ready to get started?</h3>
                                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                            Join thousands of teams using Project Tracker to manage their work efficiently and collaborate effectively.
                                        </p>
                                        <div className="flex gap-4 justify-center">
                                            <Link
                                                href={route('register')}
                                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                                            >
                                                Create Account
                                            </Link>
                                            <Link
                                                href={route('login')}
                                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20"
                                            >
                                                Sign In
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="mt-20 py-8 border-t border-white/10">
                            <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
                                <p>Project Tracker - Built with Laravel v{laravelVersion} (PHP v{phpVersion})</p>
                                <p className="text-sm mt-4">© {new Date().getFullYear()} Project Tracker. All rights reserved.</p>
                            </div>
                        </footer>
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
                            transform: translateX(-30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes fade-in-delayed {
                        0% {
                            opacity: 0;
                            transform: translateX(30px);
                        }
                        50% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
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
        </>
    );
}