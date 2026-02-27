
// D2D Logo SVG, fun and branded
export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ animation: 'spin 2.5s linear infinite', ...props.style }}
        >
            <defs>
                <radialGradient id="d2d-fun-gradient" cx="60" cy="60" r="60" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="60%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#10b981" />
                </radialGradient>
            </defs>
            <rect width="120" height="120" rx="24" fill="url(#d2d-fun-gradient)" />
            <circle cx="60" cy="60" r="38" fill="#fff" />
            <text x="60" y="72" textAnchor="middle" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#2563eb">D2D</text>
            <text x="60" y="95" textAnchor="middle" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="12" fill="#2563eb">Your day to day helper</text>
        </svg>
    );
}

// Add spinning animation globally if not present
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (!document.getElementById('d2d-spin-style')) {
        const style = document.createElement('style');
        style.id = 'd2d-spin-style';
        style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
    }
}
