
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Landing() {
    return (
        <>
            <Head title="D2D - Your day to day helper" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
                <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-md">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-12 w-12 rounded-lg shadow" />
                        <span className="text-2xl font-bold text-blue-800 tracking-tight">D2D</span>
                    </div>
                    <nav className="flex gap-6">
                        <Link href={route('login')} className="text-blue-700 font-medium hover:underline">Login</Link>
                        <Link href={route('register')} className="text-blue-700 font-medium hover:underline">Register</Link>
                    </nav>
                </header>
                <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow">Your day to day helper</h1>
                    <p className="text-lg md:text-2xl text-blue-800 mb-8 max-w-2xl">Organize your projects, tasks, and productivity with D2D. The professional project tracker for modern teams and individuals.</p>
                    <Link href={route('register')} className="px-8 py-3 bg-blue-700 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-800 transition">Get Started</Link>
                </main>
                <footer className="text-center py-6 text-blue-700/70 text-sm bg-white/60 mt-auto">
                    &copy; {new Date().getFullYear()} D2D. All rights reserved.
                </footer>
            </div>
        </>
    );
}
