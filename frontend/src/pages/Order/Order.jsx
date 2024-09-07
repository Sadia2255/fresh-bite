import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import './order.css';

const Order = () => {
  const { totalCart, cart, food_list, token, url } = useContext(Context);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderList = [];

    // Add items from cart to the order
    food_list.forEach((item) => {
      if (cart && cart[item._id] > 0) {
        let itemDetails = { ...item, quantity: cart[item._id] };
        orderList.push(itemDetails);
      }
    });

    let orderData = {
      address: data,
      items: orderList,
      amount: totalCart() + 2, // Add delivery fee
    };

    try {
      let response = await axios.post(url + 'api/order/place', orderData, { headers: { token } });
      console.log('Order Response:', response.data); // Log the response for debugging
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to Stripe checkout
      } else {
        console.error('Order Error:', response.data.message);
        alert('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error during order placement:', error); // Log error for debugging
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <form onSubmit={placeOrder} className='order'>
      <div className='order-left'>
        <p className='title'>Delivery Information</p>
        <div className='fields'>
          <input name='firstName' onChange={onChange} value={data.firstName} type='text' placeholder='First Name:' required />
          <input name='lastName' onChange={onChange} value={data.lastName} type='text' placeholder='Last Name:' required />
        </div>
        <input name='email' onChange={onChange} value={data.email} type='email' placeholder='Email:' required />
        <input name='street' onChange={onChange} value={data.street} type='text' placeholder='Street:' required />
        <div className='fields'>
          <input name='city' onChange={onChange} value={data.city} type='text' placeholder='City:' required />
          <input name='state' onChange={onChange} value={data.state} type='text' placeholder='State:' required />
        </div>
        <div className='fields'>
          <input name='zipcode' onChange={onChange} value={data.zipcode} type='text' placeholder='Zip Code:' required />
          <input name='country' onChange={onChange} value={data.country} type='text' placeholder='Country:' required />
        </div>
        <input name='phone' onChange={onChange} value={data.phone} type='text' placeholder='Phone Number:' required />
      </div>
      <div className='order-right'>
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
          <button type='submit' className='checkout-button'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
