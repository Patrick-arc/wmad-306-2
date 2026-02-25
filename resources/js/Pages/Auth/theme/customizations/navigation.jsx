export const navigationCustomizations = {
  MuiLink: {
    defaultProps: { underline: 'hover' },
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.primary.main,
        fontWeight: 500,
      }),
    },
  },
};