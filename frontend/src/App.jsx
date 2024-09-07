import React, { useState } from 'react'
import NavigationBar from './elements/NavigationBar/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import Footer from './elements/Footer/Footer'
import Login from './elements/Login/Login'

const App = () => {
  const [login, setLogin] = useState(false)
  return (
    <>
      {login ? <Login setLogin={setLogin} /> : <></>}
      <div className='application'>
        <NavigationBar setLogin={setLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
