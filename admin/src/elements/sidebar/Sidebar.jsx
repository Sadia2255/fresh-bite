import React from 'react'
import { assets } from '../../assets/assets'
import './sidebar.css'
import { NavLink } from 'react-router-dom'

const sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="options">
        <NavLink to='/add' className="option">
          <img src={assets.add_icon} alt='' />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="option">
          <img src={assets.order_icon} alt='' />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="option">
          <img src={assets.order_icon} alt='' />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default sidebar
