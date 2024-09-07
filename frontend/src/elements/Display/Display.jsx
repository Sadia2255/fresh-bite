import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import Item from '../Item/Item';
import './display.css';

const Display = ({ category }) => {
  const { food_list } = useContext(Context);
  return (
    <div className='menu-display' id='menu-display'>
      <h2>Top dishes near you</h2>
      <div className='menu-display-list'>
        {food_list.map((item, i) => {
          if (category === 'All' || category === item.food_category) {
            return (
              <Item
                key={i}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Display;
