import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Project Title</th>
                                    <th className="px-4 py-2 text-left">Tasks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {projects.map((project) => (
                                    <tr key={project.id}>
                                        <td className="px-4 py-4">{project.title}</td>
                                        <td className="px-4 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {project.tasks_count} Tasks
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}