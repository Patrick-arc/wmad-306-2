import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, projects = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">My Projects</h3>
                            <Link href={route('projects.create')} className="bg-red-700 text-white px-4 py-2 rounded-lg font-bold">
                                + New Project
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <div key={project.id} className="border p-4 rounded-xl shadow-sm">
                                        <h4 className="font-bold text-xl mb-2">{project.name}</h4>
                                        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                                        <div className="text-xs font-black text-gray-400 uppercase">
                                            Tasks: {project.tasks_count || 0}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10 text-gray-500">
                                    No projects found. Start by creating one!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}