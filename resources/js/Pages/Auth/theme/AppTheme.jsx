import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { inputsCustomizations } from '@/Pages/Auth/theme/customizations/inputs';
import { dataDisplayCustomizations } from '@/Pages/Auth/theme/customizations/dataDisplay';
import { feedbackCustomizations } from '@/Pages/Auth/theme/customizations/feedback';
import { navigationCustomizations } from '@/Pages/Auth/theme/customizations/navigation';
import { surfacesCustomizations } from '@/Pages/Auth/theme/customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

export default function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents } = props;
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            containerQueries: true,
          },
          colorSchemes, 
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}