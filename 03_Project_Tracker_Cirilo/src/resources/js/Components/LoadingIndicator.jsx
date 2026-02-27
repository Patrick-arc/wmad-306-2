import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingIndicator({ message = 'Processing...' }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
            <CircularProgress color="primary" />
            <Typography variant="body2" sx={{ mt: 2, color: '#2563eb' }}>
                {message}
            </Typography>
        </Box>
    );
}
