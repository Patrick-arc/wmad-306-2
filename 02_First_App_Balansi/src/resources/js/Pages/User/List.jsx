export default function List({ users }) {
    return (
        <div className="min-h-screen bg-[#f5f5f7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f]">
                            Users
                        </h1>
                        <p className="text-[#86868b] mt-1 text-lg">
                            Manage your team members and permissions.
                        </p>
                    </div>
                    <button className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-5 py-2 rounded-full font-medium transition-all text-sm">
                        Add User
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#d2d2d7]/50 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#d2d2d7]/30 bg-[#f5f5f7]/50">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#86868b]">Name</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#86868b]">Email</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#86868b]">Gender</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#d2d2d7]/30">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-[#f5f5f7]/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-[#1d1d1f]">
                                            {user.first_name} {user.last_name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#424245]">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize 
                                            ${user.gender === 'male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
                                            {user.gender}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}