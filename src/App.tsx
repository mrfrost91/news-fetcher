import { RouterProvider } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { router } from 'router';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { themeSettings } from 'theme';
import { useMemo } from 'react';
import { COLOR_SETTINGS } from 'constants';
import { useColorSettingContext } from 'hooks';

const App = () => {
  const { colorSetting, colorModeDefinedByTheSystem } = useColorSettingContext();

  const theme = useMemo(() => {
    const colorMode =
      colorSetting === COLOR_SETTINGS.definedByTheSystem
        ? colorModeDefinedByTheSystem
        : colorSetting;

    return createTheme({
      ...themeSettings,
      palette: {
        mode: colorMode,
      },
    });
  }, [colorSetting, colorModeDefinedByTheSystem]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
