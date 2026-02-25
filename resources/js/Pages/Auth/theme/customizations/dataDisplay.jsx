export const dataDisplayCustomizations = {
  MuiTypography: {
    styleOverrides: {
      root: {
        color: 'inherit',
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: (theme.vars || theme).palette.divider,
      }),
    },
  },
};