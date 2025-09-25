import React, {useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header.jsx'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import FoodDiplay from '../../components/FoodDisplay/FoodDisplay.jsx'
  
const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div>
      <Header/> 
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDiplay category={category}/>

    </div>
  )
}

export default Home
