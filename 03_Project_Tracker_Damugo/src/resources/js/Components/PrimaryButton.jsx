export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold text-black uppercase tracking-wide transition duration-150 ease-in-out bg-[#bfa76a] hover:bg-[#a08a4a] focus:outline-none focus:ring-2 focus:ring-[#bfa76a] ${
                    disabled ? 'opacity-40 cursor-not-allowed' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
