import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function AuthSplitLayout({ title = '', subtitle = '', children }) {
    return (
        <div className="min-h-screen w-full flex items-stretch" style={{ background: 'linear-gradient(180deg, #F7F4FF 0%, #EFEAFF 100%)' }}>
            <aside className="hidden lg:flex w-1/2 items-center justify-center px-20">
                <div className="max-w-md">
                    <div className="flex items-center gap-4 mb-6">
                        <ApplicationLogo className="h-10 w-10" hideWordmark={false} />
                    </div>

                    <h2 className="text-4xl font-extrabold leading-tight mb-4" style={{ color: '#0F172A' }}>{title || 'Get started'}</h2>
                    <p className="text-gray-600 mb-8">{subtitle || 'Answer a couple of questions to make sure your account is set up correctly.'}</p>

                    <div className="bg-white rounded-lg p-4 shadow-sm" style={{ border: '1px solid rgba(124,98,255,0.06)' }}>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">J</div>
                            <div>
                                <div className="font-medium">Jeremy Winson</div>
                                <div className="text-xs text-gray-500">Founder @ Elite</div>
                            </div>
                        </div>

                        <p className="mt-3 text-sm text-gray-600">“Was paying a lot in fees with JPM. I like the pricing transparency and feature offerings.”</p>
                    </div>
                </div>
            </aside>

            <main className="flex w-full lg:w-1/2 items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-10 w-10" hideWordmark={false} />
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-md" style={{ border: '1px solid rgba(124,98,255,0.06)' }}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
