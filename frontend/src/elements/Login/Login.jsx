import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context'
import axios from 'axios'
import './login.css';

const Login = ({ setLogin }) => {
  const { url, setToken } = useContext(Context);
  const [current, setCurrent] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const loggingIn = async (event) => {
    event.preventDefault();
    let newURL = url;
    if (current === "Login") {
      newURL += 'api/user/login';
    } else {
      newURL += 'api/user/register';
    }

    const response = await axios.post(newURL, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token)
      setLogin(false)
    } else {
      alert(response.data.message)
    }
  }

  return (
    <div className='login'>
      <div className="overlay" onClick={() => setLogin(false)}></div> {/* Add the overlay */}
      <form onSubmit={loggingIn} className="login-container">
        <div className="login-title">
          <h2>{current}</h2>
          <img onClick={() => setLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className="login-input">
          {current === "Login" ? <></> : <input name='name' onChange={onChange} value={data.name} type='text' placeholder='Name:' required />}
          <input name='email' onChange={onChange} value={data.email} type='email' placeholder='E-Mail:' required />
          <input name='password' onChange={onChange} value={data.password} type='password' placeholder='Password:' required />
        </div>
        <button type='submit' className='account-button'>
          {current === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-condition">
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        {current === "Login" ? (
          <p>Create a New Account? <span onClick={() => setCurrent("Sign Up")}>Click Here</span></p>
        ) : (
          <p>Already Have an Account? <span onClick={() => setCurrent("Login")}>Login Here</span></p>
        )}
      </form>
    </div>
  );
};

export default Login;
