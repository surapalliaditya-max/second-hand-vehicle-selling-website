import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { VehicleProvider } from './context/VehicleContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <VehicleProvider>
        <App />
      </VehicleProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
