import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { AuthProvider } from './Context/auth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>,
)
