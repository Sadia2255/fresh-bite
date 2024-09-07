import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './add.css'

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: "Salad"
  })

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: "Salad"
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-column' onSubmit={onSubmit}>
        <div className='add-image flex-column'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className='add-name flex-column'>
          <p>Product Name</p>
          <input onChange={onChange} value={data.name} type='text' id='name' name='name' placeholder='Type Here' />

        </div>
        <div className='add-description flex-column'>
          <p>Product Description</p>
          <textarea onChange={onChange} value={data.description} name='description' rows='6' placeholder='Write description here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-column'>
            <p>Product Category</p>
            <select onChange={onChange} name="category">
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Desserts'>Desserts</option>
              <option value='Sandiwch'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
          <div className='add-price flex-column'>
            <p>Product Price</p>
            <input onChange={onChange} value={data.price} type='Number' name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-button'>
          Add
        </button>
      </form>
    </div>
  )
}

export default Add
