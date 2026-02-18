import { Box, Card, CardContent, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { colors } from '@/theme/colors'

export default function AuthShell({ title, subtitle, width = 460, children }) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                background: colors.background.authGradient,
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    maxWidth: width,
                    borderRadius: 4,
                    color: 'text.primary',
                    background: alpha(colors.white, 0.8),
                    backdropFilter: 'blur(18px)',
                    border: `1px solid ${colors.auth.cardBorder}`,
                    boxShadow: '0 20px 50px rgba(15,23,42,0.16)',
                }}
            >
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Typography variant="h4" fontWeight={800} textAlign="center" gutterBottom>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body2" textAlign="center" sx={{ opacity: 0.78, mb: 3 }}>
                            {subtitle}
                        </Typography>
                    )}
                    {children}
                </CardContent>
            </Card>
        </Box>
    )
}
