import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react'; // 1. Import useForm

export default function Index({ auth, projects }) {
    // 2. Initialize the Form Hook
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => reset(), // Clears form after success
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Projects Dashboard" />

            <div className="relative min-h-screen bg-black overflow-hidden font-sans pb-12">
                {/* Background Glows stay the same... */}
                
                <div className="relative z-10 max-w-5xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                    <header className="mb-10">
                        <h1 className="text-3xl font-black tracking-tighter uppercase text-white italic">
                            PROJECT <span className="text-red-600">ARCHIVE</span>
                        </h1>
                        <div className="h-[2px] w-16 bg-red-600 mt-2"></div>
                    </header>

                    {/* 3. Updated Form Logic */}
                    <section className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 border-l-4 border-l-red-600 rounded-lg p-8 shadow-2xl mb-10">
                        <h2 className="text-[10px] font-bold tracking-[0.3em] text-red-600 uppercase mb-6 flex items-center">
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></span>
                            Initialize New Operation
                        </h2>
                        
                        <form onSubmit={submit} className="space-y-4">
                            <input 
                                type="text" 
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Project Title" 
                                className="w-full bg-[#111111] border-gray-800 text-white rounded-md focus:border-red-600 focus:ring-red-600" 
                            />
                            {errors.title && <div className="text-red-600 text-xs">{errors.title}</div>}

                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Description" 
                                rows="3" 
                                className="w-full bg-[#111111] border-gray-800 text-white rounded-md focus:border-red-600 focus:ring-red-600"
                            ></textarea>
                            {errors.description && <div className="text-red-600 text-xs">{errors.description}</div>}

                            <button 
                                disabled={processing}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'INITIALIZING...' : 'Create Project'}
                            </button>
                        </form>
                    </section>

                    {/* 4. Updated Projects List Section */}
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 rounded-lg p-6 flex justify-between items-center hover:bg-[#111111] transition-all group">
                                <div className="max-w-2xl">
                                    <h3 className="text-xl font-bold text-white mb-2 italic group-hover:text-red-500 transition-colors">{project.title}</h3>
                                    <p className="text-gray-500 text-sm">{project.description}</p>
                                </div>
                                
                                <div className="flex items-center space-x-6 text-[10px] font-mono">
                                    {/* 5. Fixed Edit Button */}
                                    <Link 
                                        href={route('projects.edit', project.id)} 
                                        className="text-gray-500 hover:text-white uppercase tracking-widest transition"
                                    >
                                        Edit
                                    </Link>

                                    {/* 6. Fixed Delete Button */}
                                    <Link 
                                        href={route('projects.destroy', project.id)} 
                                        method="delete" 
                                        as="button"
                                        className="text-gray-500 hover:text-red-500 transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </Link>

                                    {/* 7. Fixed View Button */}
                                    <Link 
                                        href={route('projects.show', project.id)} 
                                        className="text-white font-bold flex items-center group-hover:text-red-600 transition"
                                    >
                                        VIEW <span className="ml-2">→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Footer Decor stays the same... */}
            </div>
        </AuthenticatedLayout>
    );
}