import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${themeName === 'dark' ? 'light' : 'dark'} mode`}
      className="fixed top-4 right-4 z-50 p-2 rounded-lg backdrop-blur-md border-2 text-black bg-white border-black hover:bg-gray-100 transition-colors dark:bg-black dark:border-white dark:text-white dark:hover:bg-gray-900"
    >
      {themeName === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeSwitcher;