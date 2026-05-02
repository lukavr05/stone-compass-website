import { useContext } from 'react';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { ThemeContext } from '../theme/ThemeContext';

export const useTheme = () => {
  const muiTheme = useMuiTheme();
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Return both MUI theme and custom theme controls
  return {
    ...muiTheme,  // Include all MUI theme properties (palette, typography, etc.)
    ...context,    // Include custom controls (toggleTheme, themeName, etc.)
  };
};