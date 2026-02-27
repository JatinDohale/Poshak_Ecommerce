import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { currency, backendUrl } from '../App'

const List = ({ token }) => {

  // states and variables
  const [productList, setProductList] = useState([])


  //get all Products 
  const getProductList = async () => {
    try {

      const response = await axios.get(backendUrl + "/api/product/getproductslist")

      if (response.data.success) {
        setProductList(response.data.productList.reverse())
      } else {
        return toast.error(response.data.message)
      }
    } catch (e) {
      console.log(e)
      toast.error(e.data.message)
    }
  }


  // fucntion for delete from database
  const removeProduct = async (_id) => {
    try {

      const response = await axios.post(backendUrl + "/api/product/removeproduct", { _id }, { headers: { token }, })

      if (response.data.success) {
        toast.success(response.data.message)
        await getProductList()
      } else {
        toast.error(response.data.message)
      }

    } catch (e) {
      console.log(e)
      toast.error(e.data.message)
    }
  }


  // useEffect for run function when page load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProductList()
  }, [])



  return (
    <>
      <p className='mb-2'>All Products List </p>

      <div className='flex flex-col gap-2'>

        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] item-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {productList.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] item-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => { removeProduct(item._id) }} value={item._id} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
        }

      </div>
    </>
  )
}

export default List
