export const surfacesCustomizations = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        backgroundColor: (theme.vars || theme).palette.background.paper,
        boxShadow: (theme.vars || theme).shadows[1],
      }),
    },
  },
};