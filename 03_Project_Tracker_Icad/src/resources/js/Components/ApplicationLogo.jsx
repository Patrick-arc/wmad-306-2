export default function ApplicationLogo({ className = '' }) {
    return (
        <div className={"flex items-center gap-3 " + className}>
            <div className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 text-white font-semibold">
                PT
            </div>
            <span className="text-xl font-bold text-gray-800">Project Tracker</span>
        </div>
    );
}
