import { CssBaseline, ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { createShazloTheme } from '../src'
import { App } from './App'

// The demo serves the legacy site's public folder, which holds the Voyage files.
const theme = createShazloTheme({ voyage: { baseUrl: '/' } })

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>,
  )
}
