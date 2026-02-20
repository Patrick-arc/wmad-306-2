import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { colors } from '@/theme/colors'

export default function PremiumBackdrop() {
    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: -140,
                    left: -120,
                    width: 360,
                    height: 360,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(colors.brand.primary, 0.26)} 0%, transparent 64%)`,
                    filter: 'blur(14px)',
                    animation: 'premiumFloatA 11s ease-in-out infinite',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    right: -90,
                    top: 130,
                    width: 320,
                    height: 320,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(colors.brand.accent, 0.25)} 0%, transparent 65%)`,
                    filter: 'blur(20px)',
                    animation: 'premiumFloatB 13s ease-in-out infinite',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    left: '24%',
                    bottom: -120,
                    width: 260,
                    height: 260,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(colors.brand.secondary, 0.2)} 0%, transparent 64%)`,
                    filter: 'blur(18px)',
                    animation: 'premiumFloatC 15s ease-in-out infinite',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            />
        </>
    )
}
