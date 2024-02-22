import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { ChatContextProvider } from './contexts/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <React.StrictMode>
    <ChatContextProvider> 
      <App />
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
