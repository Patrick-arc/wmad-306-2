export default function ApplicationLogo(props) {
    return (
        /* The viewBox must match the internal coordinates to prevent clipping */
        <svg {...props} viewBox="0 0 316 316" xmlns="http://www.w3.org/2000/svg">
           
            <path d="M92 100h75c20 0 35 15 35 35s-15 35-35 35h-45v50H92V100zm30 45h45c5 0 10-5 10-10s-5-10-10-10h-45v20z" />
            
            <path d="M190 100h85v25h-30v95h-25v-95h-30V100z" />
        </svg>
    );
}