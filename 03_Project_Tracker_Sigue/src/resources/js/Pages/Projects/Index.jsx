import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Index({ auth, projects, flash = {} }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'), { onSuccess: () => reset() });
    };

    // Helper for quick deletion
    const deleteProject = (id) => {
        if (confirm('Are you sure you want to delete this project? This will also remove all associated tasks.')) {
            router.delete(route('projects.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-2xl text-white uppercase tracking-tighter">Project <span className="text-[#FF2D20]">Archive</span></h2>}
        >
            <Head title="Projects Dashboard" />

            <div className="py-12 bg-[#0a0a0a] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Success Alert */}
                    {flash.message && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl shadow-[0_0_15px_rgba(255,45,32,0.1)]">
                            {flash.message}
                        </div>
                    )}

                    {/* New Project Form */}
                    <div className="bg-[#111111] border border-white/5 p-8 shadow-2xl sm:rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FF2D20]"></div>
                        <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.3em] mb-6">Initialize New Operation</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Project Title"
                                    className="w-full bg-[#181818] border-white/10 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-600 transition-all"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1 uppercase font-bold">{errors.title}</div>}
                            </div>
                            <div>
                                <textarea
                                    placeholder="Description"
                                    className="w-full bg-[#181818] border-white/10 text-white rounded-xl focus:ring-2 focus:ring-red-500 placeholder-gray-600 min-h-[100px]"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1 uppercase font-bold">{errors.description}</div>}
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-[#FF2D20] hover:bg-red-700 text-white font-bold px-10 py-3 rounded-xl transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                            >
                                {processing ? 'Deploying...' : 'Create Project'}
                            </button>
                        </form>
                    </div>

                    {/* Project List Cards */}
                    <div className="grid gap-6">
                        {projects.map((project) => (
                            <div key={project.id} className="group bg-[#111111] border border-white/5 p-6 sm:rounded-2xl hover:border-red-500/30 transition-all">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">{project.title}</h3>
                                        <p className="text-gray-500 line-clamp-1">{project.description}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        {/* Edit Link - Orange for distinction */}
                                        <Link 
                                            href={route('projects.edit', project.id)} 
                                            className="text-gray-500 hover:text-orange-500 font-bold text-xs uppercase tracking-widest transition-colors"
                                        >
                                            Edit
                                        </Link>

                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => deleteProject(project.id)}
                                            className="text-gray-500 hover:text-red-600 transition-colors"
                                            title="Terminate Project"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>

                                        {/* View Link */}
                                        <Link 
                                            href={route('projects.show', project.id)} 
                                            className="text-gray-400 hover:text-white flex items-center gap-2 font-bold text-sm uppercase tracking-widest border-l border-white/10 pl-6"
                                        >
                                            View <span className="text-red-500">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}