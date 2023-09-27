import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="DOMAIN"
    clientId="CLIENT_ID"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>,
  
)
