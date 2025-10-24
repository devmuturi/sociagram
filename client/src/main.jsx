import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { pink } from "@mui/material/colors"
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  typography: { 
    useNextVariants: true, 
  }, 
  palette: { 
    primary: { 
    light: '#5c67a3', 
    main: '#3f4771', 
    dark: '#2e355b', 
    contrastText: '#fff', 
  }, 
  secondary: { 
    light: '#ff79b0', 
    main: '#ff4081', 
    dark: '#c60055', 
    contrastText: '#000', 
  }, 
    openTitle: '#3f4771', 
    protectedTitle: pink['400'], 
    type: 'light' 
  } 
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
