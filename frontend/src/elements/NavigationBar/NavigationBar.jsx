import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import './navigation-bar.css'

const NavigationBar = ({ setLogin }) => {
  const [menu, setMenu] = useState('home');
  const { totalCart, token, setToken } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/')
  }

  return (
    <div className='navigation-bar'>
      <Link to='/'><img src={assets.logo} alt='' className='logo' /></Link>
      < ul className='navigation-bar-menu' >
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <a href='#menu-catalog' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
        <a href='#downloads' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</a>
      </ul >
      <div className='navigation-bar-right'>
        <img src={assets.search_icon} alt='' className='search-icon' />
        <div className='navigation-bar-search-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt='' className='cart' /></Link>
          <div className={totalCart() === 0 ? '' : 'items-in-cart'}></div>
        </div>
        {!token ?
          <button onClick={() => setLogin(true)} className='sign-in-button'>Sign-In</button>
          :
          <div className='profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className="profile-dropdown">
              <li><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
              <hr />
              <li onClick={() => {
                setToken('');
                localStorage.removeItem('token');
              }}>
                <img onClick={logout} src={assets.logout_icon} alt='' /><p>Logout</p>
              </li>
            </ul>
          </div>}
      </div>

    </div >
  )
}

export default NavigationBar
