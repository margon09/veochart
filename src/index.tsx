import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from 'styled-components'
import { theme } from './global/Theme'
import GlobalStyle from './global/GlobalStyles'
import { ScrollProvider } from './context/ScrollContext'
import { ChartTypeProvider } from './context/ChartTypeContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ChartTypeProvider>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </ChartTypeProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

reportWebVitals()
