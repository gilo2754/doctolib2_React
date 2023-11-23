import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import { AuthProvider } from './components/Auth/AuthContext'
import './index.css'
//import dotenv from 'dotenv';

// Configurar dotenv
//dotenv.config();


  ReactDOM.render(

  <React.StrictMode>
    <AuthProvider> 
    <App />
    </AuthProvider>
  </React.StrictMode>,
    document.getElementById('root')

)
