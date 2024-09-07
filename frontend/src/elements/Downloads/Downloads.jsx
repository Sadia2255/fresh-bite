import React from 'react'
import { assets } from '../../assets/assets'
import './downloads.css'

const Downloads = () => {
  return (
    <div className='downloads' id='downloads'>
      <p>For a Better Experience, <br /> Download the Fresh Bite App!</p>
      <div className='download-platforms'>
        <img src={assets.play_store} alt='' />
        <img src={assets.app_store} alt='' />
      </div>
    </div>
  )
}

export default Downloads
