import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const route = (name) => `/${name}`;

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">

                {/* HERO */}
                <section className="relative py-32 bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[url('/hero-pattern.svg')] bg-cover mix-blend-overlay"></div>

                    <div className="relative container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left */}
                        <div>
                            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                                Create Next-Level Applications with
                                <span className="block bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                                    Laravel
                                </span>
                            </h1>
                            <p className="mb-8 text-lg lg:text-xl max-w-lg">
                                Laravel makes building scalable, secure, and modern web apps simple. Enjoy developer-friendly syntax, powerful features, and a thriving ecosystem.
                            </p>

                            <div className="flex gap-4 flex-wrap">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-6 py-3 rounded-lg border border-yellow-400 hover:bg-yellow-400 hover:text-black transition font-semibold"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>

                            <p className="mt-6 text-sm opacity-80">
                                Laravel v{laravelVersion} | PHP v{phpVersion}
                            </p>
                        </div>

                        {/* Right */}
                        <div className="relative p-10 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Why Developers Choose Laravel</h3>
                            <ul className="space-y-2 text-white/90">
                                <li>✨ Clean & intuitive syntax</li>
                                <li>🚀 Powerful ORM and tools</li>
                                <li>🔒 Built-in authentication</li>
                                <li>⚡ Efficient jobs & queue system</li>
                                <li>🛠️ Testing & debugging made easy</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* RESOURCES */}
                <section className="py-24 bg-gray-100">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-indigo-800">Learn Laravel Quickly</h2>
                        <p className="text-gray-700 mt-4 max-w-xl mx-auto">
                            Explore these resources to master Laravel and modern web development.
                        </p>
                    </div>

                    <div className="container mx-auto px-6 grid gap-8 md:grid-cols-3">
                        {[
                            { title: 'Official Docs', text: 'Complete guides for beginners and pros.', link: 'https://laravel.com/docs', button: 'Read Docs' },
                            { title: 'Laracasts', text: 'High-quality video tutorials.', link: 'https://laracasts.com', button: 'Watch Videos' },
                            { title: 'Laravel News', text: 'Latest news, packages, and tutorials.', link: 'https://laravel-news.com', button: 'Explore News' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
                                <h3 className="text-xl font-semibold mb-3 text-indigo-700">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.text}</p>
                                <Link href={item.link} className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                                    {item.button}
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="py-24 bg-indigo-50">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-indigo-800">What Developers Say</h2>
                    </div>

                    <div className="container mx-auto px-6 grid gap-8 md:grid-cols-3">
                        {[
                            { text: 'Laravel makes complex apps effortless.', name: '— Jane Doe' },
                            { text: 'Clean syntax and tools saved me hours.', name: '— John Smith' },
                            { text: 'The ecosystem is everything a developer needs.', name: '— Alice Brown' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                                <p className="italic text-gray-700 mb-4">"{item.text}"</p>
                                <p className="font-semibold text-indigo-600">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-gradient-to-r from-yellow-400 to-red-400 text-white text-center relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Start Your Laravel Project Today</h2>
                        <p className="mb-8 max-w-2xl mx-auto">Join thousands of developers creating amazing applications effortlessly.</p>

                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link href={route('register')} className="px-6 py-3 rounded-lg bg-white text-yellow-500 font-semibold hover:scale-105 transition">
                                Get Started
                            </Link>
                            <Link href="https://laravel.com/docs" className="px-6 py-3 rounded-lg border border-white hover:bg-white hover:text-red-500 transition font-semibold">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE */}
                <section className="py-24 bg-gray-50">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-indigo-800">Why Choose Laravel?</h2>
                    </div>

                    <div className="container mx-auto px-6 grid gap-8 md:grid-cols-3">
                        {[
                            { title: 'Elegant Syntax', text: 'Clean, expressive, and enjoyable development experience.' },
                            { title: 'Robust Ecosystem', text: 'Forge, Vapor, Nova, Envoyer, and more.' },
                            { title: 'Active Community', text: 'A vibrant, supportive global community.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
                                <h3 className="text-xl font-semibold mb-2 text-yellow-500">{item.title}</h3>
                                <p className="text-gray-700">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-gray-800 text-gray-200 py-16">
                    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-yellow-400 mb-4">Laravel App</h3>
                            <p className="text-sm">Crafted with ❤️ by the Laravel Community</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href={route('login')} className="hover:text-yellow-400 transition">Login</Link></li>
                                <li><Link href={route('register')} className="hover:text-yellow-400 transition">Register</Link></li>
                                <li><Link href="https://laravel.com/docs" className="hover:text-yellow-400 transition">Documentation</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="https://laracasts.com" target="_blank" className="hover:text-yellow-400 transition">Laracasts</a></li>
                                <li><a href="https://laravel-news.com" target="_blank" className="hover:text-yellow-400 transition">Laravel News</a></li>
                                <li><a href="https://github.com/laravel" target="_blank" className="hover:text-yellow-400 transition">GitHub</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 text-center text-sm text-gray-400">
                        Laravel v{laravelVersion} (PHP v{phpVersion})
                    </div>
                </footer>

            </div>
        </>
    );
}