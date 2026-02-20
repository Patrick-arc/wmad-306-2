import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-b from-red-600 via-white to-red-600 text-gray-900 dark:text-gray-100 flex flex-col">

                {/* Hero Section */}
                <header className="text-white py-28 text-center">
                    <div className="container mx-auto px-6">
                        <h1 className="text-5xl font-bold mb-4">Build Amazing Applications with Laravel</h1>
                        <p className="text-lg max-w-3xl mx-auto mb-8">
                            Laravel is a powerful PHP framework for modern web development. Build fast, scalable, and secure applications with elegant syntax and amazing developer experience.
                        </p>
                        <div className="flex justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-3 rounded-lg bg-white text-red-600 font-semibold hover:bg-gray-100 transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-6 py-3 rounded-lg bg-white text-red-600 font-semibold hover:bg-gray-100 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition"
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
                </header>

                {/* Expanded Resources Section */}
                <section className="container mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Resources to Learn Laravel</h2>
                    <div className="grid gap-8 lg:grid-cols-3">

                        {/* Documentation Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition text-left">
                            <h3 className="text-2xl font-semibold mb-4">Official Documentation</h3>
                            <p className="text-gray-700 mb-4">
                                Laravel's documentation is comprehensive and beginner-friendly. It covers everything from installation to advanced features like queues, broadcasting, and testing.
                            </p>
                            <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
                                <li>Step-by-step guides for every Laravel feature</li>
                                <li>Code examples for common use cases</li>
                                <li>API references for all classes and methods</li>
                                <li>Tips for best practices and performance</li>
                            </ul>
                            <Link
                                href="https://laravel.com/docs"
                                className="inline-block mt-2 px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition"
                            >
                                Read Docs
                            </Link>
                        </div>

                        {/* Laracasts Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition text-left">
                            <h3 className="text-2xl font-semibold mb-4">Laracasts</h3>
                            <p className="text-gray-700 mb-4">
                                Laracasts offers thousands of high-quality video tutorials for Laravel, PHP, and modern JavaScript. Perfect for developers who prefer learning by watching.
                            </p>
                            <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
                                <li>Beginner to advanced Laravel tutorials</li>
                                <li>Real-world project examples</li>
                                <li>Front-end integrations like Vue, React, and Livewire</li>
                                <li>Expert tips and coding best practices</li>
                            </ul>
                            <Link
                                href="https://laracasts.com"
                                className="inline-block mt-2 px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition"
                            >
                                Watch Videos
                            </Link>
                        </div>

                        {/* Laravel News Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition text-left">
                            <h3 className="text-2xl font-semibold mb-4">Laravel News</h3>
                            <p className="text-gray-700 mb-4">
                                Stay updated with the latest in the Laravel ecosystem, including new releases, tutorials, packages, and community highlights.
                            </p>
                            <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
                                <li>Latest Laravel releases and version updates</li>
                                <li>Top packages and tools in the ecosystem</li>
                                <li>Community tutorials and tips</li>
                                <li>Job postings and career opportunities</li>
                            </ul>
                            <Link
                                href="https://laravel-news.com"
                                className="inline-block mt-2 px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition"
                            >
                                Explore News
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-white py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-12">What Developers Say</h2>
                        <div className="grid gap-8 lg:grid-cols-3">
                            <div className="bg-red-50 p-6 rounded-xl shadow-lg">
                                <p className="text-gray-700 italic">
                                    "Laravel makes building complex applications a breeze. The community and resources are unmatched!"
                                </p>
                                <p className="mt-4 font-semibold">— Jane Doe, Developer</p>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl shadow-lg">
                                <p className="text-gray-700 italic">
                                    "I love Laravel’s clean syntax and powerful tools. It has saved me countless hours of development."
                                </p>
                                <p className="mt-4 font-semibold">— John Smith, Backend Engineer</p>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl shadow-lg">
                                <p className="text-gray-700 italic">
                                    "From Laracasts to Forge, Laravel’s ecosystem is everything a developer could ask for."
                                </p>
                                <p className="mt-4 font-semibold">— Alice Brown, Fullstack Developer</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-20 text-center bg-red-600 text-white">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Your Next Project?</h2>
                    <p className="max-w-xl mx-auto mb-8 opacity-90">
                        Join thousands of developers building modern web applications with Laravel.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href={route('register')}
                            className="px-6 py-3 rounded-lg bg-white text-red-600 font-semibold hover:bg-gray-100 transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="https://laravel.com/docs"
                            className="px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-red-600 transition"
                        >
                            Learn More
                        </Link>
                    </div>
                </section>

                {/* Why Choose Laravel? Section at the bottom */}
                <section className="bg-gradient-to-r from-red-100 via-white to-red-100 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-12">Why Choose Laravel?</h2>
                        <div className="grid gap-8 lg:grid-cols-3">
                            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
                                <h3 className="text-xl font-semibold mb-4">Elegant Syntax</h3>
                                <p className="text-gray-700 text-sm">
                                    Laravel’s clean syntax makes development intuitive and enjoyable. Write expressive code without sacrificing performance.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
                                <h3 className="text-xl font-semibold mb-4">Robust Ecosystem</h3>
                                <p className="text-gray-700 text-sm">
                                    Use first-party tools like Forge, Vapor, Nova, Envoyer, and Herd to deploy, manage, and scale your projects effortlessly.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
                                <h3 className="text-xl font-semibold mb-4">Active Community</h3>
                                <p className="text-gray-700 text-sm">
                                    Laravel has a vibrant, global community. Find tutorials, packages, and help quickly via Laracasts, Laravel News, and forums.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 text-center text-sm text-gray-600 border-t border-gray-200">
                    Laravel v{laravelVersion} (PHP v{phpVersion}) — Crafted with ❤️ by the Laravel Community
                </footer>

            </div>
        </>
    );
}
