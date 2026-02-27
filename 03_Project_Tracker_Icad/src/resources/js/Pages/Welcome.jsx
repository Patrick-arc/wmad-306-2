import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-slate-50 dark:from-indigo-900 dark:via-slate-900 dark:to-slate-950">
                <div className="mx-auto max-w-7xl px-6 py-24">
                    <header className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="rounded-md bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-2 text-white font-bold">PT</div>
                            <h1 className="text-2xl font-extrabold text-gray-800">Project Tracker</h1>
                        </div>

                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="rounded-md px-4 py-2 text-sm bg-white/80 shadow hover:bg-white">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="rounded-md px-4 py-2 text-sm bg-white/90 shadow hover:bg-white">Log in</Link>
                                    <Link href={route('register')} className="rounded-md px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700">Register</Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="grid gap-12 lg:grid-cols-2">
                        <section className="flex flex-col justify-center">
                            <h2 className="text-4xl font-extrabold leading-tight text-gray-900 mb-4">Manage projects and tasks with ease</h2>
                            <p className="text-lg text-gray-600 mb-6">A simple Project → Task tracker with React + Inertia + Material UI frontend. Create projects, add tasks, set priorities and track status.</p>

                            <div className="flex gap-4">
                                <Link href={route('register')} className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700">Get started</Link>
                                <Link href={route('projects.index')} className="inline-block rounded-md px-6 py-3 border border-gray-200 bg-white hover:bg-gray-50">Explore demo</Link>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h3 className="text-lg font-semibold">Organize your work</h3>
                                <p className="mt-2 text-gray-600">Group tasks by project, set priorities, and toggle status to keep progress visible.</p>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h3 className="text-lg font-semibold">Built with modern tools</h3>
                                <p className="mt-2 text-gray-600">Inertia, React, and MUI deliver a responsive and snappy interface.</p>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h3 className="text-lg font-semibold">Privacy-first</h3>
                                <p className="mt-2 text-gray-600">Your data stays in your environment — deploy anywhere.</p>
                            </div>
                        </section>
                    </main>
                </div>
                <footer className="text-center text-sm text-gray-500 pb-8">© {new Date().getFullYear()} Project Tracker</footer>
            </div>
        </>
    );
}
