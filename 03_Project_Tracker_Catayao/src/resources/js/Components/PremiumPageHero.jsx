import { Box, Chip, Stack, Typography } from '@mui/material'
import TaskRoundedIcon from '@mui/icons-material/TaskRounded'

export default function PremiumPageHero({
    title,
    subtitle,
    chips = [],
    rightSlot = null,
}) {
    return (
        <Stack spacing={1.6}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1.5} flexWrap="wrap">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Box className="premium-kicker-icon">
                        <TaskRoundedIcon fontSize="inherit" />
                    </Box>
                    <Typography variant="caption" className="premium-kicker-text">
                        Premium Workspace
                    </Typography>
                </Stack>
                {rightSlot}
            </Stack>

            <Stack spacing={0.6}>
                <Typography variant="h4" fontWeight={900} className="premium-title">
                    {title}
                </Typography>
                {subtitle ? (
                    <Typography color="text.secondary" className="premium-subtitle">
                        {subtitle}
                    </Typography>
                ) : null}
            </Stack>

            {chips.length > 0 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {chips.map((chip) => (
                        <Chip
                            key={chip.label}
                            label={chip.label}
                            color={chip.color ?? 'default'}
                            variant={chip.variant ?? 'outlined'}
                            size="small"
                        />
                    ))}
                </Stack>
            ) : null}
        </Stack>
    )
}
