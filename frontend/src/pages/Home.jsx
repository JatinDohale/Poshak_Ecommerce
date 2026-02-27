import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

//componemts
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewletterBox from '../components/NewletterBox'

const Home = () => {

  //states and variables
  const { products } = useContext(ShopContext);


  return (
    <div>

      <Hero />
      <LatestCollection products={products} />
      <BestSeller />
      <OurPolicy />
      <NewletterBox />

    </div>
  )
}

export default Home
