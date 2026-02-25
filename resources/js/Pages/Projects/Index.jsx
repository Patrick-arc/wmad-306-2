import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Your Projects</h1>
                            <p className="text-gray-500">Overview of all active development projects.</p>
                        </div>
                        <Link 
                            href={route('projects.create')} 
                            className="bg-red-700 text-white px-8 py-4 rounded-full font-black text-sm hover:bg-red-800 transition shadow-lg uppercase tracking-widest"
                        >
                            + Add Project
                        </Link>
                    </div>

                    {/* Projects Table */}
                    <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Project Name</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Description</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Tasks Count</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-8 py-6">
                                            <span className="font-bold text-gray-900">{project.name}</span>
                                        </td>
                                        <td className="px-8 py-6 text-gray-500 text-sm">
                                            {project.description || 'No description provided.'}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full font-bold text-xs">
                                                {project.tasks_count} Tasks
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-4">
                                            <button className="text-gray-400 hover:text-red-600 font-bold text-xs uppercase tracking-widest transition">Edit</button>
                                            <button className="text-gray-400 hover:text-red-600 font-bold text-xs uppercase tracking-widest transition">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-12 text-center text-gray-400">
                                            No projects found. Click "+ Add Project" to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}