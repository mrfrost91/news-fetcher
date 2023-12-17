export const COLOR_MODES = {
  dark: 'dark',
  light: 'light',
} as const;
export const COLOR_SETTINGS = {
  ...COLOR_MODES,
  definedByTheSystem: 'defined-by-the-system',
} as const;

export const COLOR_SETTING_KEY = 'colorSetting';

export const PREFERS_DARK_MODE_MEDIA_QUERY = `(prefers-color-scheme: ${COLOR_MODES.dark})`;
