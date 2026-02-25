import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Project</h2>}
        >
            <Head title="Create Project" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">New Project</h1>
                            <p className="text-gray-500">Start a new project to organize your tasks.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-red-600 focus:border-red-600"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-red-600 focus:border-red-600 h-32"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <Link href={route('projects.index')} className="text-gray-400 font-bold hover:text-gray-600 transition">CANCEL</Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-red-700 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-red-800 transition shadow-xl"
                                >
                                    SAVE PROJECT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}