import React, { useState } from 'react'
import './home.css'
import Header from '../../elements/Header/Header'
import Menu from '../../elements/Menu/Menu'
import Display from '../../elements/Display/Display'
import Downloads from '../../elements/Downloads/Downloads'

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <Menu category={category} setCategory={setCategory} />
      <Display category={category} setCategory={setCategory} />
      <Downloads />
    </div>
  )
}

export default Home
