import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 sm:px-6">
            <div className="mb-8">
                <Link href="/">
                    <ApplicationLogo />
                </Link>
            </div>

            <div className="w-full overflow-hidden rounded-xl bg-white px-8 py-8 shadow-lg sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
