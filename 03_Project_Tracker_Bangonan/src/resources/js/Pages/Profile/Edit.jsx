import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ project }) {
    // useForm gives you built-in handling for data & errors
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('projects.update', project.id)); // sends PUT request
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Project</h2>}
        >
            <Head title="Edit Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                            <div>
                                <label className="block font-medium text-sm text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                                {errors.title && <div className="text-red-600">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.description && <div className="text-red-600">{errors.description}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
