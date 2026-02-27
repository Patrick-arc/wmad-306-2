export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${disabled ? 'opacity-40' : ''} ` + className}
            style={{
                background: 'linear-gradient(90deg,#7C62FF,#5E3BFF)',
                boxShadow: '0 8px 30px rgba(110,86,249,0.18)',
                border: '1px solid rgba(124,98,255,0.12)'
            }}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
