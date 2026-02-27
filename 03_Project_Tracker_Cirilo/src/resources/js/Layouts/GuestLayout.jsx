import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function GuestLayout({ children }) {
    const page = usePage();
    const prevKey = useRef(page.url);
    const contentRef = useRef();

    useEffect(() => {
        if (prevKey.current !== page.url && contentRef.current) {
            const el = contentRef.current;
            el.classList.remove('crossfade-enter-active');
            el.classList.add('crossfade-exit');
            setTimeout(() => {
                el.classList.add('crossfade-exit-active');
                setTimeout(() => {
                    el.classList.remove('crossfade-exit', 'crossfade-exit-active');
                    el.classList.add('crossfade-enter');
                    setTimeout(() => {
                        el.classList.add('crossfade-enter-active');
                        setTimeout(() => {
                            el.classList.remove('crossfade-enter', 'crossfade-enter-active');
                        }, 350);
                    }, 10);
                }, 350);
            }, 10);
            prevKey.current = page.url;
        }
    }, [page.url]);

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div
                ref={contentRef}
                className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg crossfade-enter crossfade-enter-active"
            >
                {children}
            </div>
        </div>
    );
}
