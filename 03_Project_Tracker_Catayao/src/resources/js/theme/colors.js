import { alpha } from '@mui/material/styles'

export const colors = {
    white: '#ffffff',
    brand: {
        deep: '#0b1f2a',
        dark: '#103344',
        accent: '#0e7490',
        primary: '#0ea5a4',
        secondary: '#f97316',
        link: '#0e7490',
    },
    background: {
        default: '#f4fbff',
        surfaceGradient: 'linear-gradient(150deg, #e9fbff 0%, #f4f9ff 48%, #fff5ec 100%)',
        landingGradient: 'linear-gradient(150deg, #e9fbff 0%, #f4f9ff 48%, #fff5ec 100%)',
        authGradient: 'linear-gradient(150deg, #e9fbff 0%, #f4f9ff 48%, #fff5ec 100%)',
    },
    feedback: {
        success: '#22c55e',
        errorSoft: '#fecaca',
        danger: '#dc2626',
    },
    auth: {
        textMuted: 'rgba(15,23,42,0.78)',
        labelMuted: 'rgba(15,23,42,0.72)',
        border: 'rgba(15,23,42,0.25)',
        borderHover: 'rgba(15,23,42,0.45)',
        divider: 'rgba(15,23,42,0.2)',
        cardBorder: 'rgba(15,23,42,0.12)',
    },
}

export const authFieldSx = {
    '& .MuiInputBase-input': { color: 'text.primary' },
    '& .MuiFormHelperText-root': { color: 'error.main' },
    '& .MuiOutlinedInput-root': {
        backgroundColor: alpha(colors.white, 0.72),
        '& fieldset': { borderColor: colors.auth.border },
        '&:hover fieldset': { borderColor: colors.auth.borderHover },
    },
    '& .MuiInputLabel-root': { color: colors.auth.labelMuted },
}
