import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Guest({ children }) {
    // State to toggle between Login and Register views
    const [activeTab, setActiveTab] = useState('login');

    return (
        /* Light Purple Background */
        <div className="min-h-screen flex items-center justify-center bg-[#D8B4FE] p-6">
            <div className="flex w-full max-w-5xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden min-h-[600px] relative">
                
                {/* Dark Wine-Purple Side Panel */}
                <div className="hidden md:block md:w-5/12 bg-[#5e123e] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4c0d32] to-[#5e123e]"></div>
                    
                    {/* The Interactive Sidebar Tabs */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end z-20">
                        <button 
                            onClick={() => setActiveTab('login')}
                            className={`py-4 px-10 font-bold rounded-l-full transition-all duration-300 ${
                                activeTab === 'login' ? 'bg-white text-[#5e123e] w-48 shadow-lg' : 'text-white opacity-70 w-40'
                            }`}
                        >
                            LOGIN
                        </button>
                        <button 
                            onClick={() => setActiveTab('register')}
                            className={`mt-4 py-4 px-10 font-bold rounded-l-full transition-all duration-300 ${
                                activeTab === 'register' ? 'bg-white text-[#5e123e] w-48 shadow-lg' : 'text-white opacity-70 w-40'
                            }`}
                        >
                            SIGN IN
                        </button>
                    </div>
                </div>

                {/* Form Area */}
                <div className="w-full md:w-7/12 p-12 flex flex-col justify-center items-center">
                    
                    {/* Logo - Boxless and Professional */}
                    <div className="mb-4">
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20 fill-current text-[#5e123e]" />
                        </Link>
                    </div>
                    
                    {/* Dynamic Header: Swaps between LOGIN and REGISTER */}
                    <h2 className="text-[#5e123e] text-3xl font-black mb-10 tracking-tighter uppercase">
                        {activeTab === 'login' ? 'Login' : 'Register'}
                    </h2>

                    <div className="w-full max-w-md">
                        {/* Logic Check: If children belong to a 'Register' page, show them. 
                            Otherwise, show the login form or a prompt to go to the Register page.
                        */}
                        {activeTab === 'login' ? children : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 mb-6 font-medium">Create your Project Tracker account</p>
                                <Link 
                                    href={route('register')} 
                                    className="inline-block bg-[#5e123e] text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-[#4c0d32] transition-all transform hover:scale-105"
                                >
                                    START SIGN UP
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}