import { createTheme } from '@mui/material/styles';

// Font utility exports - separate from theme
export const fonts = {
  code: '"Cascadia Code", monospace',
  courier: '"Courier New", Courier, monospace',
};

// Base theme configuration with current colors and fonts
export const baseThemeConfig = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#cccccc',
      contrastText: '#000000',
    },
    secondary: {
      main: '#aaaaaa',
      light: '#bbbbbb',
      dark: '#888888',
      contrastText: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
      disabled: 'rgba(255, 255, 255, 0.38)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    // Custom colors used in project
    accent: {
      main: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.1)',
      overlay: 'rgba(0, 0, 0, 0.3)',
      modal: 'rgba(0, 0, 0, 0.95)',
      glass: 'rgba(255, 255, 255, 0.05)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
    },
    // Platform colors
    platforms: {
      spotify: '#1ED760',
      apple: '#FA243C',
      amazon: '#0077C1',
      bandcamp: '#408294',
      tidal: '#00FFFF',
      deezer: '#ac41ff',
      youtube: '#FF0000',
      tiktok: '#EE1D52',
      instagram: '#DD2A7B',
    }
  },
  typography: {
    fontFamily: '"Konkhmer Sleokchher", serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },
  // Custom component styles
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.5)',
          color: '#ffffff',
          '&:hover': {
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
};

// Light theme variant
export const lightTheme = createTheme({
  ...baseThemeConfig,
  palette: {
    ...baseThemeConfig.palette,
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    accent: {
      main: '#000000',
      hover: 'rgba(0, 0, 0, 0.1)',
      border: 'rgba(0, 0, 0, 0.1)',
      overlay: 'rgba(255, 255, 255, 0.3)',
      modal: 'rgba(255, 255, 255, 0.95)',
      glass: 'rgba(0, 0, 0, 0.05)',
      glassBorder: 'rgba(0, 0, 0, 0.1)',
    },
  },
  typography: {
    ...baseThemeConfig.typography,
  },
});

// Dark theme (current theme)
export const darkTheme = createTheme(baseThemeConfig);

// Additional theme variants can be added here
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default darkTheme;