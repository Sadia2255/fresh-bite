import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Context = createContext(null);

const ContextProvider = (props) => {
  const [cart, setCart] = useState({});
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);

  const url = 'http://localhost:4000/';

  // Load token and cart from localStorage when the app first loads
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart && savedCart !== 'undefined') {
      try {
        setCart(JSON.parse(savedCart)); // Safely parse if cart is valid
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCart({});
      }
    }
  }, []);

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    if (cart && Object.keys(cart).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));  // Only save valid cart
    } else {
      localStorage.removeItem('cart'); // Remove cart if empty
    }
  }, [cart]);

  const addToCart = async (id) => {
    // Update the local cart state
    if (!cart[id]) {
      setCart((prev) => ({ ...prev, [id]: 1 }));
    } else {
      setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }

    // Send the updated cart to the backend if the user is logged in
    if (token) {
      try {
        await axios.post(
          url + 'api/cart/add',
          { itemId: id },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (id) => {
    // Update the local cart state
    setCart((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };  // Decrease quantity if more than 1
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[id];  // Remove item from cart if quantity is 1 or less
        return updatedCart;
      }
    });

    // Send the updated cart to the backend if the user is logged in
    if (token) {
      try {
        await axios.post(
          url + 'api/cart/remove',
          { itemId: id },   // Pass the correct itemId
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const totalCart = () => {
    let total = 0;
    for (const item in cart) {
      if (cart[item] > 0) {
        let info = food_list.find((product) => product._id === item);
        if (info) {
          total += info.price * cart[item];
        }
      }
    }
    return total;
  };

  const getFoodList = async () => {
    const response = await axios.get(url + 'api/food/list');
    setFoodList(response.data.data);
    console.log("Food List:", response.data.data);  // Add this line for debugging
  };

  const loadCart = async (token) => {
    const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
    setCart(response.data.cart);
  };

  useEffect(() => {
    async function loadData() {
      await getFoodList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCart(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

  const value = {
    food_list,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    totalCart,
    url,
    token,
    setToken
  };

  return (<Context.Provider value={value}>
    {props.children}
  </Context.Provider>);
};

export default ContextProvider;
