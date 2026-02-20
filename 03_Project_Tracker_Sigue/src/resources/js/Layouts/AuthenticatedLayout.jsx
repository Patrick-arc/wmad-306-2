import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        // 1. Deep Black/Red Background
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 selection:bg-red-500 selection:text-white">
            
            {/* 2. Navigation with Laravel Red Border */}
            <nav className="border-b border-red-500/20 bg-[#111111]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    {/* 3. Logo changed to Laravel Red */}
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-[#FF2D20]" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-gray-400 hover:text-[#FF2D20] transition-colors duration-300"
                                >
                                    Dashboard
                                </NavLink>

                                {       }
                                <NavLink
                                    href={route('projects.index')}
                                    active={route().current('projects.index')}
                                    className="text-gray-400 hover:text-[#FF2D20] transition-colors duration-300"
                                >
                                    Projects
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                // 4. Charcoal button with Red hover
                                                className="inline-flex items-center rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition duration-300 hover:border-red-500/50 hover:text-white focus:outline-none"
                                            >
                                                {user.name}
                                                <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-[#181818] border border-white/10 shadow-2xl">
                                        <Dropdown.Link href={route('profile.edit')} className="text-gray-400 hover:bg-red-500 hover:text-white">Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-gray-400 hover:bg-red-500 hover:text-white">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-white/5 hover:text-red-500 transition-all duration-300"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 5. Header Section with Glow Effect */}
            {header && (
                <header className="relative overflow-hidden bg-[#111111] border-b border-white/5">
                    {/* Background Radial Glow */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-red-600/10 blur-[80px]"></div>
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative">
                {/* Global Background Glow */}
                <div className="fixed top-0 left-0 -ml-40 -mt-40 h-[500px] w-[500px] rounded-full bg-red-900/10 blur-[120px] pointer-events-none"></div>
                <div className="relative z-10">{children}</div>
            </main>
        </div>
    );
}