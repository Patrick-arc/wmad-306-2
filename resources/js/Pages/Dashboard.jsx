import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Hero Banner Section */}
                    <div className="bg-red-700 rounded-[2rem] p-10 mb-10 flex flex-col md:flex-row justify-between items-center shadow-xl relative">
                        <div className="text-white text-center md:text-left mb-6 md:mb-0">
                            <h1 className="text-5xl font-black mb-2 uppercase tracking-tighter">
                                WELCOME, {auth.user.name.toUpperCase()}!
                            </h1>
                            <p className="text-lg opacity-90">You have {stats?.pendingTasks || 0} pending tasks in your tracker.</p>
                        </div>
                        
                        {/* High z-index and explicit cursor to ensure clickability */}
                        <Link 
                            href={route('tasks.create')} 
                            className="relative z-50 bg-white text-red-700 px-10 py-4 rounded-full font-black text-lg hover:bg-gray-100 transition shadow-lg active:scale-95 cursor-pointer flex items-center justify-center"
                        >
                            + NEW TASK
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatCard label="Total Projects" count={stats?.totalProjects || 0} icon="📁" />
                        <StatCard label="Total Tasks" count={stats?.totalTasks || 0} icon="📋" />
                        <StatCard label="Pending Status" count={stats?.pendingTasks || 0} icon="⏳" />
                        <StatCard label="Tasks Completed" count={stats?.completedTasks || 0} icon="✅" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ label, count, icon }) {
    return (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center transition hover:shadow-md border border-gray-100">
            <div className="text-4xl mb-4">{icon}</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{count}</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</div>
        </div>
    );
}