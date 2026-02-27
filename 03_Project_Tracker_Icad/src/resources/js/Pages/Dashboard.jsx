import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="mb-8 text-3xl font-extrabold text-gray-900">Welcome back!</h1>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-md hover:shadow-lg transition">
                            <h3 className="mb-2 text-2xl font-bold text-blue-900">Projects</h3>
                            <p className="text-blue-700 mb-4">Manage and organize your projects</p>
                            <Link href={route('projects.index')} className="inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                                View Projects
                            </Link>
                        </div>

                        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-8 shadow-md hover:shadow-lg transition">
                            <h3 className="mb-2 text-2xl font-bold text-purple-900">Tasks</h3>
                            <p className="text-purple-700 mb-4">Create and track your tasks</p>
                            <Link href={route('projects.show', { project: 29 })} 
                            className="inline-block rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
                            >
                                View Tasks
                            </Link>
                        </div>

                        <div className="rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 p-8 shadow-md hover:shadow-lg transition">
                            <h3 className="mb-2 text-2xl font-bold text-pink-900">Profile</h3>
                            <p className="text-pink-700 mb-4">Update your profile settings</p>
                            <Link href={route('profile.edit')} className="inline-block rounded-lg bg-pink-600 px-4 py-2 font-medium text-white hover:bg-pink-700">
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 rounded-lg bg-white p-8 shadow-md">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Quick Start</h2>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
                                <span>Create a new project to group your tasks</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
                                <span>Add tasks to a project with title, description, priority, and status</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
                                <span>Toggle task status between To Do, In Progress, and Done</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
