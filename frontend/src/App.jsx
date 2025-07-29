
import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import { Nav } from './component/Nav'
import { userdatacontext } from './context/Userprotected'
import Collections from './pages/Collections'
import About from './pages/About'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Placeorder from './pages/Placeorder'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound'
import Ai from './component/Ai'
import Chatbot from './component/Chatbot'

const App = () => {
  const {userdata}=useContext(userdatacontext)
  const loaction =useLocation()

  return (
    <>
     <ToastContainer />
    {userdata && <Nav/> }
    <Routes>
      <Route path="/signup" element={userdata ? (<Navigate to={loaction.state ?.from || "/"} />) : (<Register/>) }/>
      <Route path="/login" element={userdata ? (<Navigate to={loaction.state ?.from || "/"} />) : (<Login/>) }/>

      <Route path="/" element={userdata ? <Home/> : <Navigate to={"/login"} state={{from: location.pathname}} /> } />
      <Route path="/collection" element={userdata ? <Collections/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }/>
      <Route path="/about" element={userdata ? <About/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }/>
      <Route path="/product" element={userdata ? <Product/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }/>
      <Route path="/contact" element={userdata ? <Contact/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }/>
      <Route path="/productdetail/:id" element={userdata ? <ProductDetails/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }/>
      <Route path="/cart" element={userdata ? <Cart/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }/>
      <Route path="/placeorder" element={userdata ? <Placeorder/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }/>
      <Route path="/order" element={userdata ? <Order/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }/>
      <Route path="*" element={<NotFound/>} />
    </Routes>

    <Ai/>
    <Chatbot/>

    </>
  )
}

export default App
