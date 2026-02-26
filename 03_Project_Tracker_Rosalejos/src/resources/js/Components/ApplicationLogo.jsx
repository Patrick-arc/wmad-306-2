import HubIcon from '@mui/icons-material/Hub';

export default function ApplicationLogo({ className = '', style = {}, size = 40, hideWordmark = true, ...props }) {
    const markSize = size;
    // When the wordmark is shown, scale the square mark down so it doesn't overpower the text
    const markDiameter = hideWordmark ? markSize : Math.round(markSize * 0.72);

    return (
        <div {...props} className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
            <div
                style={{
                    width: markDiameter,
                    height: markDiameter,
                    borderRadius: Math.round(markDiameter * 0.22),
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: '0 10px 30px rgba(94,59,255,0.12)',
                    background: 'linear-gradient(135deg, #7C62FF 0%, #5E3BFF 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* subtle two-tone overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.03) 100%)', mixBlendMode: 'overlay' }} />
                <HubIcon sx={{ color: '#fff', zIndex: 2, fontSize: Math.round(markDiameter * 0.55) }} />
            </div>

            {!hideWordmark && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', fontWeight: 700, fontSize: 18, color: '#0F172A', letterSpacing: '-0.02em' }}>Project</span>
                    <span style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', fontWeight: 800, fontSize: 20, background: 'linear-gradient(90deg,#7C62FF,#5E3BFF)', WebkitBackgroundClip: 'text', color: 'transparent', letterSpacing: '-0.02em' }}>Hub</span>
                </div>
            )}
        </div>
    );
}
