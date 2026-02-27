import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext' //context file for state management
import { assets } from '../assets/frontend_assets/assets'

//components
import Tittle from '../components/Tittle'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  //states and variables
  const { products } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [PriceSort, setPriceSort] = useState()



  // Filter for category And type
  const toogleCategory = (e) => {

    // filter for caterory (Men, Women, Kids)
    if (category.includes(e.target.value)) {
      setCategory(category.filter(item => item !== e.target.value))
    } else {
      setCategory([...category, e.target.value])
    }
  }

  // filter for type ( topwear , bottom wear ,winterwear)
  const toogleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter(item => item !== e.target.value))
    } else {
      setSubCategory([...subCategory, e.target.value])
    }
  }


  // logic for filtering Products based on category,type,price
  useEffect(() => {
    let filtered = products;

    if (category.length) {
      filtered = filtered.filter(item =>
        category.includes(item.category)
      );
    }

    if (subCategory.length) {
      filtered = filtered.filter(item =>
        subCategory.includes(item.subcategory)
      );
    }

    if (PriceSort == "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    if (PriceSort == "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilterProducts([...filtered]);

  }, [category, subCategory, products, PriceSort]);



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter options or Left side*/}
      <div className='min-w-60 transition-all'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""} `} />
        </p>

        {/* Catergory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block `}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Men"} onChange={toogleCategory} />Men
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Women"} onChange={toogleCategory} />Women
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Kids"} onChange={toogleCategory} />Kids
            </p>

          </div>

        </div>


        {/* sub category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block `}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Topwear"} onChange={toogleSubCategory} />Topwear
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Bottomwear"} onChange={toogleSubCategory} />Bottomwear
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Winterwear"} onChange={toogleSubCategory} />Winterwear
            </p>

          </div>

        </div>

      </div>

      {/* right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Tittle text1={"ALL"} text2={"COLLECTION"} />

          {/* product sort  */}
          <select onChange={(e) => { setPriceSort(e.target.value) }} className='border-2 border-gray-300 text-sm px-2 rounded-lg'>
            <option value="relevent">Relevent</option>
            <option value="high-low">High To Low</option>
            <option value="low-high">Low To High</option>
          </select>
        </div>

        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} prize={item.price} />
            ))
          }


        </div>
      </div>

    </div>
  )
}

export default Collection
