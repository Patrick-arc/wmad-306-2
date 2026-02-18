import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, project }) {
    const { delete: destroyProject } = useForm();
    const { data, setData, post, processing, reset, delete: destroyTask } = useForm({
        title: '',
        priority: 'low',
    });

    const handleCreateTask = (e) => {
        e.preventDefault();
        post(route('projects.tasks.store', project.id), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-white tracking-tighter">{project.title}</h2>}
        >
            <Head title={project.title} />

            <div className="py-12 bg-[#0a0a0a] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Project Header Card */}
                    <div className="bg-[#111111] border border-white/5 p-6 shadow-2xl sm:rounded-xl">
                        <div className="flex justify-between items-center mb-6">
                            <Link href={route('projects.index')} className="text-gray-500 hover:text-red-500 transition-colors font-bold text-xs uppercase tracking-widest">
                                ← Back to Archive
                            </Link>
                            <button 
                                onClick={() => confirm('Erase project?') && destroyProject(route('projects.destroy', project.id))} 
                                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1 rounded-lg text-xs font-black transition-all border border-red-500/20"
                            >
                                TERMINATE
                            </button>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed">{project.description}</p>
                    </div>

                    {/* Task Creator Form */}
                    <div className="bg-[#111111] border border-white/5 p-6 sm:rounded-xl">
                        <h3 className="text-xs font-black text-red-500 uppercase tracking-widest mb-4">Add Task Item</h3>
                        <form onSubmit={handleCreateTask} className="flex flex-col md:flex-row gap-4">
                            <input 
                                type="text" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Task designation..."
                                className="flex-1 bg-[#181818] border-white/10 text-white rounded-lg focus:ring-2 focus:ring-red-500"
                            />
                            <select 
                                value={data.priority} 
                                onChange={e => setData('priority', e.target.value)}
                                className="bg-[#181818] border-white/10 text-white rounded-lg focus:ring-2 focus:ring-red-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <button type="submit" className="bg-[#FF2D20] text-white px-8 py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-lg shadow-red-600/20">
                                Deploy
                            </button>
                        </form>
                    </div>

                    {/* Task List */}
                    <div className="bg-[#111111] border border-white/5 p-6 sm:rounded-xl">
                        <div className="space-y-3">
                            {project.tasks.map(task => (
                                <div key={task.id} className="p-4 bg-[#181818] border border-white/5 rounded-xl flex justify-between items-center group hover:border-red-500/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        {/* Neon Priority LED */}
                                        <div className={`h-2 w-2 rounded-full shadow-[0_0_10px] ${
                                            task.priority === 'high' ? 'bg-red-500 shadow-red-500' : 
                                            task.priority === 'medium' ? 'bg-orange-500 shadow-orange-500' : 'bg-gray-500'
                                        }`}></div>
                                        <span className="text-gray-200 font-medium">{task.title}</span>
                                    </div>
                                    <button 
                                        onClick={() => confirm('Delete task?') && destroyTask(route('tasks.destroy', task.id))}
                                        className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}