import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^(_|[A-Z]|React|motion|AnimatePresence|useScroll|useTransform|BrandIcon|Calendar|MapPin|Clock|Sun|Moon|X|CssBaseline|BrowserRouter|ThemeProvider|Highlights|Events|Media|SideBar|ThemeSwitcher|Routes|Route|Home)',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_'
      }],
    },
  },
])
