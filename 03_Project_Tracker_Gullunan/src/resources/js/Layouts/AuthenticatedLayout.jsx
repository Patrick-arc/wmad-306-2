import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
      <img
        id="background"
        className="absolute -left-20 top-0 max-w-[877px]"
        src="https://laravel.com/assets/img/welcome/background.svg"
      />

      <div className="relative min-h-screen selection:bg-[#FF2D20] selection:text-white">
        <nav className="border-b border-gray-700 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-200 font-bold text-lg">Project Tracker</span>
                      <span className="text-gray-400 text-xs">Manage Your Work</span>
                    </div>
                  </Link>
                </div>

                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                  <NavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    href={route('profile.edit')}
                    active={route().current('profile.edit')}
                  >
                    Profile
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
                          className="inline-flex items-center rounded-md border border-transparent bg-gray-800/50 px-3 py-2 text-sm font-medium leading-4 text-gray-200 transition duration-150 ease-in-out hover:text-white hover:bg-gray-700/50 focus:outline-none"
                        >
                          {user.name}
                          <svg
                            className="-me-0.5 ms-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                      <Dropdown.Link href={route('logout')} method="post" as="button">
                        Log Out
                      </Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>

              <div className="-me-2 flex items-center sm:hidden">
                <button
                  onClick={() =>
                    setShowingNavigationDropdown((previous) => !previous)
                  }
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
            <div className="space-y-1 pb-3 pt-2">
              <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
              </ResponsiveNavLink>
            </div>

            <div className="border-t border-gray-200 pb-1 pt-4">
              <div className="px-4">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                  Log Out
                </ResponsiveNavLink>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
}