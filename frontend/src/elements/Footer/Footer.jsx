import React from 'react'
import { assets } from '../../assets/assets'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='content'>
        <div className='left-content'>
          <img className='logo' src={assets.logo} alt='' />
          <p>A refreshing mix of cucumbers, tomatoes, olives, and feta cheese, drizzled with olive oil and seasoned with herbs</p>
          <div className='social-media-icons'>
            <img src={assets.facebook_icon} alt='' />
            <img src={assets.twitter_icon} alt='' />
            <img src={assets.linkedin_icon} alt='' />
          </div>
        </div>

        <div className='center-content'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='right-content'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-609-553-6170</li>
            <li>contact@freshbite.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='copyright'>
        Copyright 2024 @ FreshBite.com - All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
