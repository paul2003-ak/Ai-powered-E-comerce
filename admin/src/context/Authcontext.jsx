import React from 'react'
import { createContext } from 'react'

export const authDataContext=createContext()
const Authcontext = ({children}) => {
    const serverURL="https://ai-powered-e-comerce-backend-cart.onrender.com"
    const value={
        serverURL
    }

  return (
   <div>
    <authDataContext.Provider value={value}>
        {children}
    </authDataContext.Provider>
   </div>
  )
}

export default Authcontext
