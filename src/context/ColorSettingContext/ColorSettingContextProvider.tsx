import { createContext, Dispatch, FC, useMemo, useState } from 'react';
import { FCWithChildren } from 'types';
import { useMediaQuery } from '@mui/material';
import {
  COLOR_SETTING_KEY,
  COLOR_MODES,
  COLOR_SETTINGS,
  PREFERS_DARK_MODE_MEDIA_QUERY,
} from 'constants';

export type ColorSettings = (typeof COLOR_SETTINGS)[keyof typeof COLOR_SETTINGS];
type ColorModes = (typeof COLOR_MODES)[keyof typeof COLOR_MODES];
export type ColorSettingContextType = {
  colorSetting: ColorSettings;
  colorModeDefinedByTheSystem: ColorModes;
  setColorSetting: Dispatch<ColorSettings>;
};

export const ColorSettingContext = createContext<ColorSettingContextType | null>(null);

const getInitialColorModeValue = () => {
  const valueFromLocalStorage = localStorage.getItem(COLOR_SETTING_KEY) as ColorSettings | null;

  return valueFromLocalStorage ?? COLOR_SETTINGS.definedByTheSystem;
};

const ColorSettingContextProvider: FC<FCWithChildren> = ({ children }) => {
  const [colorSetting, setColorSetting] = useState<ColorSettings>(getInitialColorModeValue);
  const prefersDarkMode = useMediaQuery(PREFERS_DARK_MODE_MEDIA_QUERY);

  const contextProviderValue = useMemo<ColorSettingContextType>(() => {
    const colorModeDefinedByTheSystem: ColorModes = prefersDarkMode
      ? COLOR_MODES.dark
      : COLOR_MODES.light;

    return {
      colorSetting,
      colorModeDefinedByTheSystem,
      setColorSetting,
    };
  }, [colorSetting, prefersDarkMode]);

  return (
    <ColorSettingContext.Provider value={contextProviderValue}>
      {children}
    </ColorSettingContext.Provider>
  );
};

export default ColorSettingContextProvider;
