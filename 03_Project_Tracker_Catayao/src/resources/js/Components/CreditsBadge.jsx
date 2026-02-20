import { Box, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { colors } from '@/theme/colors'

function CodexMark() {
    return (
        <Box
            component="svg"
            viewBox="0 0 28 28"
            aria-label="Codex logo"
            sx={{ width: 22, height: 22 }}
        >
            <defs>
                <linearGradient id="codex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f766e" />
                    <stop offset="100%" stopColor="#164e63" />
                </linearGradient>
            </defs>
            <path
                d="M14 2 24 8v12l-10 6L4 20V8l10-6Z"
                fill="url(#codex-gradient)"
                opacity="0.22"
            />
            <path
                d="M14 5.5 21 9.5v9l-7 4-7-4v-9l7-4Z"
                fill="none"
                stroke="url(#codex-gradient)"
                strokeWidth="1.8"
            />
            <path
                d="M11 14h6M14 11v6"
                stroke="#0f172a"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </Box>
    )
}

export default function CreditsBadge() {
    return (
        <Box
            sx={{
                mt: 4,
                mb: 1,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 999,
                    backgroundColor: alpha(colors.white, 0.8),
                    border: `1px solid ${alpha(colors.brand.deep, 0.12)}`,
                }}
            >
                <Typography variant="caption" sx={{ fontWeight: 700, color: colors.brand.deep }}>
                    Made by Khenert Catayao
                </Typography>
                <Typography variant="caption" sx={{ color: alpha(colors.brand.deep, 0.6) }}>
                    |
                </Typography>
                <CodexMark />
                <Typography variant="caption" sx={{ fontWeight: 700, color: colors.brand.deep }}>
                    Built with Codex
                </Typography>
            </Stack>
        </Box>
    )
}
