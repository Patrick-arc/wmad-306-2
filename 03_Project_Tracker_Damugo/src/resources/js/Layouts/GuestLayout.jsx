import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        // We remove 'items-center' and 'bg-gray-100' so your login page controls the full screen
        <div className="min-h-screen w-full flex flex-col bg-white">
            <div className="w-full flex-grow">
                {children}
            </div>
        </div>
    );
}