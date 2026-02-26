import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const user = auth && auth.user ? auth.user : null;

    const initials = user && user.name
        ? user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()
        : '';
    return (
        <>
            <Head title="Welcome" />

            <style>{`
                .hero-card { animation: float 6s ease-in-out infinite; will-change: transform; transition: box-shadow 220ms ease, transform 220ms ease; }
                .hero-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 60px 120px rgba(94,59,255,0.08); }
                @keyframes float {
                    0% { transform: translateY(0px) rotate(-0.4deg); }
                    50% { transform: translateY(-12px) rotate(0.4deg); }
                    100% { transform: translateY(0px) rotate(-0.4deg); }
                }
            `}</style>

            <div
                className="min-h-screen w-full flex items-center justify-center"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(180deg, #F7F4FF 0%, #EFEAFF 100%)',
                }}
            >
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
                    <div
                        style={{
                            position: 'absolute',
                            left: '-20%',
                            top: '2%',
                            width: '70%',
                            height: '80%',
                            borderRadius: '40%',
                            background: 'radial-gradient(circle at 20% 20%, rgba(124,98,255,0.28), rgba(124,98,255,0.18) 30%, transparent 55%)',
                            filter: 'blur(80px)',
                            opacity: 1,
                            mixBlendMode: 'screen',
                        }}
                    />

                    <div
                        style={{
                            position: 'absolute',
                            right: '-10%',
                            top: '6%',
                            width: '60%',
                            height: '70%',
                            borderRadius: '40%',
                            background: 'radial-gradient(circle at 70% 30%, rgba(94,59,255,0.24), rgba(110,86,249,0.12) 40%, transparent 65%)',
                            filter: 'blur(110px)',
                            opacity: 1,
                            mixBlendMode: 'screen',
                        }}
                    />

                    <div
                        style={{
                            position: 'absolute',
                            left: '5%',
                            bottom: '-12%',
                            width: '90%',
                            height: '50%',
                            borderRadius: '40%',
                            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95), rgba(255,255,255,0.7) 20%, rgba(124,98,255,0.06) 60%)',
                            filter: 'blur(48px)',
                            opacity: 1,
                            mixBlendMode: 'screen',
                        }}
                    />
                </div>

                {/* photographic overlay for subtle depth */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 12,
                        backgroundImage: 'url("/build/images/overlay.png")',
                        backgroundSize: '120% auto',
                        backgroundPosition: '50% 35%',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.28,
                        mixBlendMode: 'normal',
                        filter: 'blur(4px)',
                    }}
                />

                <div className="container mx-auto px-6 lg:px-20" style={{ position: 'relative', zIndex: 20 }}>
                    <header className="flex items-center justify-between py-8">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center">
                                <Link href={user ? route('dashboard') : '/'}>
                                    <ApplicationLogo hideWordmark={false} size={48} />
                                </Link>
                            </div>
                        </div>

                        <nav className="flex items-center gap-4">
                            {user ? (
                                <Link href={route('dashboard')} className="text-sm text-gray-700 flex items-center gap-2">
                                    {user && user.profile_photo_url ? (
                                        <img src={user.profile_photo_url} alt={user.name} className="h-6 w-6 rounded-full object-cover" onError={(e) => (e.target.style.display = 'none')} />
                                    ) : (
                                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#7C62FF] to-[#5E3BFF] flex items-center justify-center text-white text-xs font-medium">
                                            {initials}
                                        </div>
                                    )}

                                    <span>Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm text-gray-700 px-3 py-2 rounded-md transition transform duration-150 hover:bg-[#F3E9FF] hover:text-[#5E3BFF] hover:-translate-y-0.5 active:scale-95"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="ml-3 rounded-full px-4 py-2 bg-white text-sm font-medium shadow transition transform duration-150 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                                        style={{ border: '1px solid rgba(0,0,0,0.06)' }}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
                        <section>
                            <div className="max-w-2xl">
                                <p
                                    className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium"
                                    style={{ background: 'rgba(124,98,255,0.08)', color: '#5E3BFF' }}
                                >
                                    Secure Data Sharing
                                </p>

                                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight" style={{ color: '#0F172A' }}>
                                    Build brilliant digital asset operations effortlessly.
                                </h1>

                                <p className="mt-6 text-lg text-gray-600">
                                    A beautifully lightweight project and task tracker designed to keep your team organized, collaborative, and moving at top speed.
                                </p>

                                <div className="mt-8 flex items-center gap-4">
                                    <Link
                                        href={route('projects.index')}
                                        className="rounded-full px-6 py-3 text-white font-medium transition transform duration-150 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                                        style={{ background: 'linear-gradient(90deg,#7C62FF,#5E3BFF)', boxShadow: '0 8px 30px rgba(110,86,249,0.18)', cursor: 'pointer' }}
                                    >
                                        Build Project
                                    </Link>

                                    <Link href={route('dashboard')} className="text-sm text-gray-700 transition-colors duration-150 hover:text-[#5E3BFF] active:scale-95" style={{ cursor: 'pointer' }}>
                                        Learn more
                                    </Link>
                                </div>

                                <div className="mt-12 flex items-center gap-6 opacity-80">
                                    <img src="/assets/logos/google.svg" alt="google" className="h-6 opacity-80" onError={(e) => (e.target.style.display = 'none')} />
                                    <img src="/assets/logos/aws.svg" alt="aws" className="h-6 opacity-80" onError={(e) => (e.target.style.display = 'none')} />
                                    <img src="/assets/logos/microsoft.svg" alt="microsoft" className="h-6 opacity-80" onError={(e) => (e.target.style.display = 'none')} />
                                </div>
                            </div>
                        </section>

                        <section className="flex items-center justify-center">
                            <div style={{ width: 600, height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div aria-hidden className="hero-card" style={{
                                    width: '96%',
                                    height: '96%',
                                    borderRadius: 0,
                                    position: 'relative',
                                    overflow: 'visible',
                                    boxShadow: 'none',
                                    background: 'transparent',
                                }}>
                                    <img
                                        src="/build/images/homeBackg.png"
                                        alt="hero"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            mixBlendMode: 'normal',
                                            backgroundColor: 'transparent',
                                            filter: 'saturate(1.05) contrast(1.02) drop-shadow(0 18px 30px rgba(16,24,40,0.08))',
                                            pointerEvents: 'none',
                                            transform: 'scale(0.95)'
                                        }}
                                    />
                                </div>
                            </div>
                        </section>
                    </main>

                    <footer className="py-16 text-center text-sm text-gray-600">
                        Laravel v{laravelVersion} (PHP v{phpVersion})
                    </footer>
                </div>
            </div>
        </>
    );
}
