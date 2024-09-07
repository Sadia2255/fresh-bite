import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';
import './item.css'

const Item = ({ id, name, price, description, image }) => {
  const { cart, addToCart, removeFromCart, url } = useContext(Context);

  return (
    <div className='item'>
      <div className='item-container'>
        <img className='item-image' src={url ? url + 'images/' + image : ''} alt={name} />
        {
          // Render "Add to Cart" button if item is not in the cart yet (cart[id] is undefined)
          !cart[id] ? (
            <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
          ) : (
            <div className='item-counter'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='' />
              <p>{cart[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='' />
            </div>
          )
        }
      </div>
      <div className='item-info'>
        <div className='item-rating'>
          <p>{name}</p>
          <img src={assets.rating_stars} alt='' />
        </div>
        <p className='item-description'>{description}</p>
        <p className='item-price'>${price}</p>
      </div>
    </div>
  )
}

export default Item;
