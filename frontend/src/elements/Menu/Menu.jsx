import React from 'react'
import './menu.css'
import { menu_list } from '../../assets/assets'

const Menu = ({ category, setCategory }) => {

  return (
    <div className='menu-catalog' id='menu-catalog'>
      <h1>Explore our menu</h1>
      <p className='menu-catalog-text'>Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise.
        Satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.</p>
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
