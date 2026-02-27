import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function PrimaryButton({ children, sx, ...props }) {
    const baseSx = {
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        fontSize: '0.8125rem',
        textTransform: 'none',
        boxShadow: '0 2px 8px rgba(99,102,241,0.12)',
        transition: 'transform 120ms ease, box-shadow 120ms ease, opacity 100ms ease',
        '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 6px 14px rgba(99,102,241,0.14)',
        },
        '&:active': {
            transform: 'translateY(0) scale(0.998)',
            boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
        },
    };

    return (
        <Button variant="contained" color="primary" sx={{ ...baseSx, ...(sx || {}) }} {...props}>
            {children}
        </Button>
    );
}

PrimaryButton.propTypes = {
    children: PropTypes.node,
};
