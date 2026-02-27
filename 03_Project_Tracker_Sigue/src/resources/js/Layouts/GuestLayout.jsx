import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-black overflow-hidden font-sans">
            
            {/* 1. Red Atmospheric Glow (Mirroring Welcome Page) */}
            <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-red-600/20 via-red-900/5 to-transparent blur-3xl z-0"></div>

            {/* 2. Concentric Decorative Circles */}
            <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] border border-red-600/20 rounded-full"></div>
                <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] border border-red-500/10 rounded-full"></div>
            </div>

            {/* Logo Section */}
            <div className="relative z-10 mb-8">
                <Link href="/">
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-white italic">
                        PROJECT <span className="text-red-600">ARCHIVE</span>
                    </h1>
                </Link>
            </div>

            {/* The Form Container (This is what was likely missing or broken) */}
            <div className="relative z-10 w-full sm:max-w-md mt-6 px-8 py-10 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 shadow-2xl overflow-hidden sm:rounded-sm">
                
                {/* Visual Accent: Top Red Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
                
                <div className="text-gray-300">
                    {/* CRITICAL: This renders the Login/Register form */}
                    {children}
                </div>
            </div>

            {/* Bottom Glow Decor */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-900/10 blur-[100px] z-0"></div>
        </div>
    );
}