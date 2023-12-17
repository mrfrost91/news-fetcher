declare module '@mui/material/styles' {
  interface Theme {
    height: {
      header: number;
      footer: number;
    };
  }
  interface ThemeOptions {
    height: {
      header: number;
      footer: number;
    };
  }
}

const themeSettings = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1248,
      xl: 1536,
    },
  },
  height: {
    header: 48,
    footer: 40,
  },
};

export default themeSettings;
