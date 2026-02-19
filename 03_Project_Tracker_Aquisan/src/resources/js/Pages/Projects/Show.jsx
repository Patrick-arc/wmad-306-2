import { Head, Link } from '@inertiajs/react';

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

export default function ProjectsShow({ project }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this project?')) {
            window.location.href = route('projects.destroy', project.id);
        }
    };

    return (
        <>
            <Head title={project.name} />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-4xl mx-auto px-6 py-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <Link
                                    href={route('projects.index')}
                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-2 inline-block"
                                >
                                    ← Back to Projects
                                </Link>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={route('projects.edit', project.id)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="max-w-4xl mx-auto px-6 py-12">
                    {/* Status */}
                    <div className="mb-6">
                        <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${statusColors[project.status]}`}
                        >
                            {statusLabels[project.status]}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                            {project.description || 'No description provided'}
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Progress</h2>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                {project.progress}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-indigo-600 to-blue-600 h-4 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📅 Timeline</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
                                    <p className="text-gray-900 dark:text-white font-semibold">
                                        {new Date(project.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                {project.due_date && (
                                    <div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Due Date</span>
                                        <p className="text-gray-900 dark:text-white font-semibold">
                                            {new Date(project.due_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Stats</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                                    <p className="text-gray-900 dark:text-white font-semibold">
                                        {statusLabels[project.status]}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Completion</span>
                                    <p className="text-gray-900 dark:text-white font-semibold">
                                        {project.progress}% Complete
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
