import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

//components
import Tittle from './Tittle'
import ProductItem from './ProductItem'


const BestSeller = () => {

  //states and variables
  const { products } = useContext(ShopContext)
  const bestSell = products?.filter((item) => item.bestseller).slice(0, 5) || [];

  return (

    <div className='my-10'>

      {/* best seller title and descriton */}
      <div className='text-center py-8 text-3xl'>
        <Tittle text1={'BEST'} text2={'SELLER'} />
        <p className='w-3/4 text-xs m-auto sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, itaque?</p>
      </div>

      {/* Rendiring products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestSell.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} prize={item.price} image={item.image} />
          ))

        }
      </div>

    </div>

  )
}

export default BestSeller
