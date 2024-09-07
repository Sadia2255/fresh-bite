import React from 'react'
import { assets } from '../../assets/assets'
import './navigation-bar.css'

const NavigationBar = () => {
  return (
    <div className='navigation-bar'>
      <img className='logo' src={assets.logo} alt='' />
      <img className='profile' src={assets.profile_image} alt='' />
    </div>
  )
}

export default NavigationBar
