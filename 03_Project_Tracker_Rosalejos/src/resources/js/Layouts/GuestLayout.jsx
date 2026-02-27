import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div
            className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
            style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #F7F4FF 0%, #EFEAFF 100%)' }}
        >
            {/* photographic overlay (shared with Welcome page) */}
            <div aria-hidden="true" style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 1,
                backgroundImage: 'url("/build/images/overlay.png")',
                backgroundSize: '120% auto',
                backgroundPosition: '50% 35%',
                backgroundRepeat: 'no-repeat',
                opacity: 0.28,
                mixBlendMode: 'normal',
                filter: 'blur(4px)'
            }} />

            {/* Hero area for auth pages — logo and optional intro live here */}
            <div className="w-full flex justify-center" style={{ paddingTop: 40, paddingBottom: 8, position: 'relative', zIndex: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <Link href="/">
                        <ApplicationLogo hideWordmark={false} size={48} />
                    </Link>
                </div>
            </div>

            <div className="mt-2 w-full px-0 sm:max-w-md" style={{ position: 'relative', zIndex: 20 }}>
                {children}
            </div>
        </div>
    );
}
