import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { authDataContext } from './Authcontext';
import axios from 'axios'
import { useEffect } from 'react';


export const adminDatacontext = createContext();

const Admincontext = ({ children }) => {
  const [admindata, setAdmindata] = useState()
  const { serverURL } = useContext(authDataContext)


  const getAdmin = async () => {
    try {
      const result = await axios.get(serverURL + "/api/isauth/getcurradin", { withCredentials: true });
      setAdmindata(result.data);
      console.log(result.data) 
    } catch (error) {
      setAdmindata(null)
      console.log(error)
    }
  }


  useEffect(()=>{
    getAdmin()
  },[])

  const value = {
    admindata , setAdmindata,getAdmin
  }
  
  return (
    <div>
      <adminDatacontext.Provider value={value}>
        {children}
      </adminDatacontext.Provider>
    </div>
  )
}

export default Admincontext