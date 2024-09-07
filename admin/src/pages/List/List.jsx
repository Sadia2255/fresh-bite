import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './list.css'

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const getList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Error');
    }
  }

  const removeItem = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await getList();
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className='list add flex-column'>
      <p>All Food Items</p>
      <div className='table'>
        <div className='table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='table-format'>
              <img className='food-item' src={`${url}/images/` + item.image} alt='' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeItem(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
