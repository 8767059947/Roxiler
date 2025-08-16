import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // Import karein
import { AuthProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Isko add karein */}
    <AuthProvider>
      <App />
      </AuthProvider>
    </BrowserRouter> {/* Isko add karein */}
  </React.StrictMode>,
)