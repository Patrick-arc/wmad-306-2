import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, projects = [] }) {
    // Section 3: Form state management using Inertia's useForm hook
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        project_id: '',
        status: 'pending',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Task</h2>}
        >
            <Head title="Create Task" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                        <div className="mb-10 text-center md:text-left">
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">New Task</h1>
                            <p className="text-gray-500">Assign a new task to one of your existing projects.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Task Title */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Task Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-red-600 focus:border-red-600 transition"
                                    placeholder="Enter task name..."
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-600 text-xs mt-2 font-bold uppercase">{errors.title}</div>}
                            </div>

                            {/* Project Dropdown - Section 6: Relationship Selection */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Select Project</label>
                                <select
                                    className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-red-600 focus:border-red-600 transition"
                                    value={data.project_id}
                                    onChange={e => setData('project_id', e.target.value)}
                                >
                                    <option value="">Select a project...</option>
                                    {projects.map(project => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))}
                                </select>
                                {errors.project_id && <div className="text-red-600 text-xs mt-2 font-bold uppercase">{errors.project_id}</div>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Description</label>
                                <textarea
                                    className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-red-600 focus:border-red-600 h-32 transition"
                                    placeholder="Optional task details..."
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-6">
                                <Link 
                                    href={route('tasks.index')} 
                                    className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-600 transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-red-700 text-white px-12 py-4 rounded-full font-black text-sm hover:bg-red-800 transition shadow-lg uppercase tracking-widest disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}