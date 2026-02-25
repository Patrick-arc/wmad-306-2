export const colorSchemes = {
  light: {
    palette: {
      primary: {
        main: 'hsl(210, 100%, 45%)',
        dark: 'hsl(210, 100%, 35%)',
      },
      background: {
        default: 'hsl(0, 0%, 100%)',
        paper: 'hsl(0, 0%, 98%)',
      },
      divider: 'hsl(210, 20%, 90%)',
    },
  },
  dark: {
    palette: {
      primary: {
        main: 'hsl(210, 100%, 65%)',
        dark: 'hsl(210, 100%, 55%)',
      },
      background: {
        default: 'hsl(220, 30%, 5%)',
        paper: 'hsl(220, 30%, 7%)',
      },
      divider: 'hsl(210, 20%, 25%)',
    },
  },
};

export const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontSize: '3rem', fontWeight: 600 },
  h4: { fontSize: '2.125rem', fontWeight: 600 },
};

export const shadows = Array(25).fill('none');
export const shape = { borderRadius: 8 };