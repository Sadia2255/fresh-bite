import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import './cart.css';

const Cart = () => {
  const { cart, food_list, removeFromCart, totalCart, url } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className='full-cart'>
      <div className='items'>
        <div className='titles'>
          <p>Items</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, i) => {
          if (cart[item._id] > 0) {
            return (
              <div key={i}>
                <div className='titles cart-items'>
                  <img src={url + "images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cart[item._id]}</p>
                  <p>${item.price * cart[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='delete'>X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className='bottom'>
        <div className='total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-details'>
              <p>Subtotal</p>
              <p>${totalCart()}</p>
            </div>
            <hr />
            <div className='cart-details'>
              <p>Delivery Fee</p>
              <p>${totalCart() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-details'>
              <b>Total</b>
              <b>${totalCart() === 0 ? 0 : totalCart() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')} className='checkout-button'>Proceed to Checkout</button>
        </div>

        <div className='promo-code'>
          <div>
            <p>Add a Promo Code</p>
            <div className='promo-code-input'>
              <input type='text' placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
