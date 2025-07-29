import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './pages/Login'
import { useContext } from 'react'
import { adminDatacontext } from './context/Admincontext'
import { ToastContainer } from 'react-toastify';

const App = () => {
  const { admindata } = useContext(adminDatacontext)
  return (
    <>
    <ToastContainer />
      {!admindata ? <Login /> : <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />x
          <Route path="/list" element={<List />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
      }
    </>
  )
}

export default App