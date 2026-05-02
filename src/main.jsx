import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import './index.css'

import '@fontsource/doto'
import '@fontsource/cutive-mono'
import '@fontsource/chivo-mono'
import '@fontsource/fira-code'
import '@fontsource/ubuntu-mono'

// Import Konkhmer Sleokchher font
import '@fontsource/konkhmer-sleokchher'
// Import Cascadia Code font
import '@fontsource/cascadia-code'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
