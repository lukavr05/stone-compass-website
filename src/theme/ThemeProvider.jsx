import React, { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './ThemeContext';
import { themes } from './index';

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [theme, setTheme] = useState(() => themes[themeName] || themes.dark);

  useEffect(() => {
    localStorage.setItem('theme', themeName);
    document.documentElement.classList.toggle('dark', themeName === 'dark');
  }, [themeName]);

  const toggleTheme = () => {
    const newThemeName = themeName === 'dark' ? 'light' : 'dark';
    setThemeName(newThemeName);
    setTheme(themes[newThemeName]);
  };

  const setThemeByName = (name) => {
    if (themes[name]) {
      setThemeName(name);
      setTheme(themes[name]);
    }
  };

  const value = {
    theme,
    themeName,
    toggleTheme,
    setThemeByName,
    availableThemes: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;