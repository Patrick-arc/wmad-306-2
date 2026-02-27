import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';

export default function AvatarIcon({ name, src, size = 40, bg = '#7C62FF', className = '', children }) {
    const initials = name
        ? name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
        : '';

    const style = {
        bgcolor: bg,
        width: size,
        height: size,
        fontSize: Math.max(10, Math.floor(size / 3.2)),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    // If children provided, render them (used for warning icon, etc.)
    if (children) {
        return (
            <Avatar src={src} sx={style} className={className}>
                {children}
            </Avatar>
        );
    }

    // If image src provided, show image
    if (src) {
        return <Avatar src={src} sx={style} className={className} />;
    }

    // If no name/initials, show generic person silhouette
    if (!initials) {
        const iconBg = '#D1D5DB'; // light gray background matching pasted image
        return (
            <Avatar sx={{ ...style, bgcolor: iconBg }} className={className}>
                <PersonIcon sx={{ color: '#ffffff', fontSize: Math.max(14, Math.floor(size / 2.4)) }} />
            </Avatar>
        );
    }

    // Default: show initials
    return (
        <Avatar sx={style} className={className}>
            {initials}
        </Avatar>
    );
}

AvatarIcon.propTypes = {
    name: PropTypes.string,
    src: PropTypes.string,
    size: PropTypes.number,
    bg: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};
