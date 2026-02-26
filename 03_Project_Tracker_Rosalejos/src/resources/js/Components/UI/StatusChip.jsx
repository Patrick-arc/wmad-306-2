import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

export default function StatusChip({ status, sx }) {
    const map = {
        todo: { label: 'To Do', color: 'default' },
        in_progress: { label: 'In Progress', color: 'info' },
        active: { label: 'Active', color: 'primary' },
        done: { label: 'Done', color: 'success' },
    };

    const cfg = map[status] ?? { label: String(status ?? ''), color: 'default' };

    return <Chip label={cfg.label} color={cfg.color} size="small" sx={{ ml: 1, ...(sx || {}) }} />;
}

StatusChip.propTypes = {
    status: PropTypes.string,
};
