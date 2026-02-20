import { createTheme } from '@mui/material/styles'
import { colors } from './theme/colors'

const theme = createTheme({
    palette: {
        primary: {
            main: colors.brand.primary,
        },
        secondary: {
            main: colors.brand.secondary,
        },
        background: {
            default: colors.background.default,
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: ['Manrope', 'Segoe UI', 'Tahoma', 'sans-serif'].join(','),
        h4: {
            fontWeight: 800,
        },
        h5: {
            fontWeight: 700,
        },
    },
})

export default theme
