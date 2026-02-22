import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

// 1. Updated Props to receive taskCount and recentTasks from the backend
export default function Dashboard({ auth, projectCount, taskCount, recentTasks }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="System Dashboard" />

            <div className="relative min-h-screen bg-black overflow-hidden font-sans pb-12">
                
                {/* Background Design */}
                <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-red-600/15 via-red-900/5 to-transparent blur-3xl z-0 pointer-events-none"></div>
                
                <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] border border-red-600/20 rounded-full"></div>
                    <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] border border-red-500/10 rounded-full"></div>
                </div>

                {/* Dashboard Content */}
                <div className="relative z-10 max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <header className="mb-10">
                        <h1 className="text-3xl font-black tracking-tighter uppercase text-white italic">
                            SYSTEM <span className="text-red-600">OVERVIEW</span>
                        </h1>
                        <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-mono">
                            Welcome back, Agent {auth.user.name} // Status: Operational
                        </p>
                    </header>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 p-6 rounded-sm">
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Active Projects</p>
                            {/* Dynamic project count */}
                            <p className="text-3xl font-black text-white italic">{projectCount}</p>
                        </div>
                        
                        {/* Task Counter Card */}
                        <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 p-6 rounded-sm border-l-2 border-l-red-600">
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Total Task Items</p>
                            {/* Dynamic task count */}
                            <p className="text-3xl font-black text-white italic">{taskCount}</p>
                        </div>

                        <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 p-6 rounded-sm">
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">System Health</p>
                            <p className="text-3xl font-black text-red-600 italic">98.4%</p>
                        </div>
                    </div>

                    {/* Main Action Hub */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Recent Activity Log */}
                        <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 p-8 rounded-lg shadow-2xl min-h-[220px]">
                            <h2 className="text-xs font-bold tracking-[0.3em] text-red-600 uppercase mb-6 flex items-center">
                                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></span>
                                Recent Activity Log
                            </h2>
                            <div className="space-y-4 font-mono text-[11px]">
                                {recentTasks && recentTasks.length > 0 ? (
                                    recentTasks.map((task) => (
                                        <div key={task.id} className="flex justify-between border-b border-white/5 pb-2 text-gray-400">
                                            <span className="truncate mr-4">
                                                <span className="text-red-600 mr-2">{'>'}</span> 
                                                New task on <span className="text-white uppercase font-bold">{task.project.title}</span>
                                            </span>
                                            <span className="text-gray-600 text-[10px] shrink-0">
                                                {new Date(task.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-600 italic uppercase tracking-widest">
                                        {'>'} No recent activity detected.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col justify-between p-8 bg-red-600/5 border border-red-600/20 rounded-lg">
                            <div>
                                <h2 className="text-xl font-black text-white italic uppercase mb-2">Initialize New Data</h2>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                    Ready to archive a new operation? Your repository is currently synced with the global master node.
                                </p>
                            </div>
                            <Link 
                                href={route('projects.index')} 
                                className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 text-center transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-105"
                            >
                                Open Projects Archive
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Subtle Grid Footer Decor */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none"></div>
            </div>
        </AuthenticatedLayout>
    );
}