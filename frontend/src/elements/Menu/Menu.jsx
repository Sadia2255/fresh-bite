import React from 'react'
import './menu.css'
import { menu_list } from '../../assets/assets'

const Menu = ({ category, setCategory }) => {

  return (
    <div className='menu-catalog' id='menu-catalog'>
      <h1>Explore our menu</h1>
      <p className='menu-catalog-text'>Explore our various food options. Whether you're looking for salads, soups, or wholesome entrees, we make healthy eating convenient and flavorful. Have a seat, relax, and take your journey through delectable classics and new beginnings.</p>
      <div className='menu-catalog-list'>
        {menu_list.map((item, i) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={i} className='menu-catalog-item'>
              <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt='' />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default Menu
