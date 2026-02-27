import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ projects = [], tasks_count = 0, completed_count = 0, ongoing_count = 0, pending_count = 0 }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-3xl font-bold text-blue-800">{projects.length}</span>
                            <span className="text-blue-700 mt-2">Projects</span>
                        </div>
                        <div className="bg-gradient-to-br from-green-100 to-green-300 rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-3xl font-bold text-green-800">{tasks_count}</span>
                            <span className="text-green-700 mt-2">Total Tasks</span>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-3xl font-bold text-yellow-800">{ongoing_count}</span>
                            <span className="text-yellow-700 mt-2">Ongoing</span>
                        </div>
                        <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-3xl font-bold text-gray-800">{pending_count}</span>
                            <span className="text-gray-700 mt-2">Pending</span>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-100 to-emerald-300 rounded-xl shadow p-6 flex flex-col items-center md:col-span-2 lg:col-span-4">
                            <span className="text-3xl font-bold text-emerald-800">{completed_count}</span>
                            <span className="text-emerald-700 mt-2">Completed</span>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-900">Your Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.length === 0 ? (
                                <div className="text-gray-400">No projects yet.</div>
                            ) : (
                                projects.map(project => (
                                    <div key={project.id} className="border rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition">
                                        <div className="font-bold text-blue-800 text-lg mb-1">{project.title}</div>
                                        <div className="text-gray-600 mb-2">{project.description}</div>
                                        <div className="text-sm text-blue-700">Tasks: {project.tasks_count}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
