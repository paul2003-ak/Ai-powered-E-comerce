import React from 'react'
import { createContext } from 'react'

export const authDataContext=createContext()
const Authcontext = ({children}) => {
    const serverURL="http://localhost:8000"
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