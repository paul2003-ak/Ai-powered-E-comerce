import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import Userprotected from './context/Userprotected.jsx'
import Shopdatacontext from './context/Shopdatacontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <Userprotected>
        <Shopdatacontext>
          <App />
        </Shopdatacontext>
      </Userprotected>
    </AuthContext>
  </BrowserRouter>

)
