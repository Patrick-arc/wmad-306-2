import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, project }) {
    // Initialize form with existing project data
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Use 'put' for updating existing resources
        put(route('projects.update', project.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-2xl text-white uppercase tracking-tighter">Edit <span className="text-[#FF2D20]">Operation</span></h2>}
        >
            <Head title={`Edit ${project.title}`} />

            <div className="py-12 bg-[#0a0a0a] min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#111111] border border-white/5 p-8 shadow-2xl sm:rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-2">Project Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#181818] border-white/10 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1 uppercase font-bold">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-2">Operation Description</label>
                                <textarea
                                    className="w-full bg-[#181818] border-white/10 text-white rounded-xl focus:ring-2 focus:ring-orange-500 min-h-[150px]"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1 uppercase font-bold">{errors.description}</div>}
                            </div>

                            <div className="flex items-center gap-4">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Save Changes'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}