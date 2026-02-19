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
                    {/* Welcome Card */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-2">Welcome to Project Tracker! 📊</h3>
                            <p className="text-gray-600">Organize, manage, and track your projects with ease.</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Create Project */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="text-4xl mb-4">➕</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Create Project</h4>
                                <p className="text-sm text-gray-600 mb-4">Start a new project and begin tracking</p>
                                <Link
                                    href={route('projects.create')}
                                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-sm"
                                >
                                    New Project
                                </Link>
                            </div>
                        </div>

                        {/* View Projects */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="text-4xl mb-4">📋</div>
                                <h4 className="font-semibold text-gray-900 mb-2">View Projects</h4>
                                <p className="text-sm text-gray-600 mb-4">Manage all your projects</p>
                                <Link
                                    href={route('projects.index')}
                                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                                >
                                    All Projects
                                </Link>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="text-4xl mb-4">⚙️</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Profile Settings</h4>
                                <p className="text-sm text-gray-600 mb-4">Update your profile information</p>
                                <Link
                                    href={route('profile.edit')}
                                    className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-sm"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-4">Key Features</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <span className="text-2xl mr-3">✅</span>
                                    <div>
                                        <h5 className="font-semibold text-gray-900">Multiple Projects</h5>
                                        <p className="text-sm text-gray-600">Create and manage multiple projects simultaneously</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-2xl mr-3">📈</span>
                                    <div>
                                        <h5 className="font-semibold text-gray-900">Track Progress</h5>
                                        <p className="text-sm text-gray-600">Monitor completion status with progress bars</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-2xl mr-3">📅</span>
                                    <div>
                                        <h5 className="font-semibold text-gray-900">Due Dates</h5>
                                        <p className="text-sm text-gray-600">Set deadlines and stay on track</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-2xl mr-3">🎯</span>
                                    <div>
                                        <h5 className="font-semibold text-gray-900">Status Management</h5>
                                        <p className="text-sm text-gray-600">Track project status with multiple options</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
