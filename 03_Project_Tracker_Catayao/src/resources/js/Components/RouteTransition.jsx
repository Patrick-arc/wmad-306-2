import { Box } from '@mui/material'

export default function RouteTransition({ children }) {
    return (
        <Box className="route-enter">
            {children}
        </Box>
    )
}
