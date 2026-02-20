import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const statusColors = {
    pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300',
    on_hold: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300',
};

const statusLabels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    on_hold: 'On Hold',
};

export default function ProjectsIndex({ projects }) {
    const { flash } = usePage().props;
    const [showAlert, setShowAlert] = useState(!!flash?.success);

    return (
        <>
            <Head title="Projects" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your projects</p>
                        </div>
                        <Link
                            href={route('projects.create')}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                        >
                            + New Project
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="max-w-7xl mx-auto px-6 py-12">
                    {showAlert && flash?.success && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 dark:bg-green-700 dark:border-green-600 dark:text-green-100 rounded-lg">
                            {flash.success}
                        </div>
                    )}

                    {projects.data.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
                            <div className="text-5xl mb-4">📋</div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Projects Yet</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Create your first project to get started tracking your work.
                            </p>
                            <Link
                                href={route('projects.create')}
                                className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                            >
                                Create First Project
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {projects.data.map((project) => (
                                <Link
                                    key={project.id}
                                    href={route('projects.show', project.id)}
                                    className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-indigo-600"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                {project.name}
                                            </h3>
                                            {project.description && (
                                                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                                                    {project.description}
                                                </p>
                                            )}
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ml-4 ${statusColors[project.status]}`}
                                        >
                                            {statusLabels[project.status]}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {project.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-indigo-600 h-2 rounded-full transition-all"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                                        <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                        {project.due_date && (
                                            <span>
                                                Due: {new Date(project.due_date).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {projects.last_page > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            {projects.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 rounded ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
