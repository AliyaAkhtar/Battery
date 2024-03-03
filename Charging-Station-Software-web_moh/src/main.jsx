import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { ThemeProvider } from './ThemeContext.jsx'

const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE_RIGHT,
  timeout: 5000,
  offset: '5px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider >
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
