import { Head, Link, useForm } from '@inertiajs/react';

export default function ProjectsEdit({ project }) {
    const { data, setData, patch, errors, processing } = useForm({
        name: project.name,
        description: project.description || '',
        status: project.status,
        due_date: project.due_date || '',
        progress: project.progress,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('projects.update', project.id));
    };

    return (
        <>
            <Head title={`Edit: ${project.name}`} />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-2xl mx-auto px-6 py-6">
                        <Link
                            href={route('projects.show', project.id)}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-2 inline-block"
                        >
                            ← Back to Project
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Project</h1>
                    </div>
                </header>

                {/* Form */}
                <main className="max-w-2xl mx-auto px-6 py-12">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                        {/* Project Name */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Project Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="e.g., Website Redesign"
                            />
                            {errors.name && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="5"
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                    errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="Describe the project..."
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Status *
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                    errors.status ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                            </select>
                            {errors.status && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.status}</p>}
                        </div>

                        {/* Due Date */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                    errors.due_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                            />
                            {errors.due_date && (
                                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.due_date}</p>
                            )}
                        </div>

                        {/* Progress */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Progress: {data.progress}% *
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={data.progress}
                                onChange={(e) => setData('progress', parseInt(e.target.value))}
                                className="w-full"
                            />
                            {errors.progress && (
                                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.progress}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Project'}
                            </button>
                            <Link
                                href={route('projects.show', project.id)}
                                className="flex-1 px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition font-semibold text-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}
