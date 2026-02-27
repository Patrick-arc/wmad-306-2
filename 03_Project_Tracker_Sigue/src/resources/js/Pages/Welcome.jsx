import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Project Archive" />
            
            {/* Main Wrapper: Black base with hidden overflow to contain the glow effects */}
            <div className="relative min-h-screen bg-[#000000] overflow-hidden font-sans selection:bg-red-600 selection:text-white">
                
                {/* 1. Large Red Atmospheric Glow (Top Left) */}
                <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-red-600/20 via-red-900/5 to-transparent blur-3xl z-0"></div>

                {/* 2. Concentric Decorative Circles (Matching the original layout) */}
                <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30 pointer-events-none">
                    <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] border border-red-600/20 rounded-full"></div>
                    <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] border border-red-500/10 rounded-full"></div>
                    <div className="absolute top-[-50px] left-[-50px] w-[400px] h-[400px] border border-red-400/5 rounded-full"></div>
                </div>

                {/* Navigation Layer */}
                <nav className="relative z-20 flex justify-end px-8 py-6">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-400 hover:text-white uppercase tracking-widest font-bold transition">Dashboard</Link>
                    ) : (
                        <div className="space-x-6">
                            <Link href={route('login')} className="text-sm text-gray-400 hover:text-white uppercase tracking-widest font-bold transition">Log in</Link>
                            <Link href={route('register')} className="text-sm text-white border border-red-600 px-4 py-2 uppercase tracking-widest font-bold hover:bg-red-600 transition">Register</Link>
                        </div>
                    )}
                </nav>

                {/* Main Content Layer */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
                    
                    {/* Hero Branding */}
                    <div className="mb-12">
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase text-white italic">
                            PROJECT <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">ARCHIVE</span>
                        </h1>
                        <div className="h-1 w-32 bg-red-600 mx-auto mt-4 shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
                    </div>

                    {/* Central Access Card */}
                    <div className="w-full max-w-2xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-12 shadow-2xl relative overflow-hidden group">
                        {/* Red Accent line on hover */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                        
                        <p className="text-gray-400 text-xs uppercase tracking-[0.5em] mb-4 font-mono">
                             SECURED SYSTEM INTERFACE 
                        </p>
                        
                        <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-md mx-auto italic">
                            Authorized personnel only. All access attempts are logged and monitored by the system administrator.
                        </p>
                        
                        {!auth.user && (
                            <Link
                                href={route('login')}
                                className="inline-block bg-red-600 hover:bg-red-700 text-white font-black py-5 px-16 transition-all uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] active:scale-95"
                            >
                                Initialize Access
                            </Link>
                        )}
                    </div>
                </div>

                {/* Subtle Grid Footer Decor */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none"></div>
            </div>
        </>
    );
}