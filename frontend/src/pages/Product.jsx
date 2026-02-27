import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'

//components
import RelatedProducts from '../components/RelatedProducts'


const Product = () => {

  //states and variables
  const { productId } = useParams()
  const { products, addToCart, currency, navigate } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState()
  const [sizes, setSize] = useState("")
  const [realtedProductList, setRealtedProductList] = useState([])

  //image handler
  const imageHandler = (e) => {
    setImage(e.target.src)
  }


  //useEffect hook for set product
  useEffect(() => {
    setProduct(...products.filter((item) => item._id === productId || null))
  }, [productId, products])


  //useEffect hook for set related products
  useEffect(() => {

    if (product) {

      setImage(product.image?.[0] || "");
      let ProductList = products.filter((item) => item.category === product.category && item._id !== product._id);
      ProductList = ProductList.filter((item) => item.subCategory === product.subCategory).slice(0, 5);

      setRealtedProductList(ProductList);
    }
  }, [product, products]);




  return product ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-1 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              product.image.map((item, index) => {
                return <img onClick={imageHandler} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer'></img>
              })
            }
          </div>
          <div className='w-full sm:w-[80%] '>
            <img src={image} alt="" className='w-full h-auto' />
          </div>
        </div>


        {/* Prodcut info  */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>

          {/* product rating  */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_dull_icon} alt="" className='w-3 ' />
            <p className='pl-2'>(122)</p>
          </div>

          {/* product price and description */}
          <p className='mt-5 text-3xl font-medium'>{currency}{product.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>

          {/* Product sizes */}
          <div className='flex flex-col gap-1 my-4 '>
            <p>Selct Size</p>
            <div className='flex gap-2 '>
              {
                product.sizes.map((item, index) => (
                  <button onClick={(item) => (setSize(item.target.innerHTML))} className={`border py-2 px-4  rounded-md hover:cursor-pointer ${sizes == item ? "bg-blue-500 text-white" : "bg-gray-100"}`} key={index}>{item}</button>
                ))}
            </div>
          </div>

          {/* product  addtocart button and policies*/}
          <button onClick={() => { addToCart(product._id, sizes) }} className='bg-black hover:cursor-pointer mt-5 text-white px-8 py-3 text-sm active:bg-gray-700 '>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery avalable</p>
            <p>Easy retrun and Exchange policywithin 7 days</p>
          </div>
        </div>
      </div>


      {/* Descriiption & Review Section */}
      <div className='mt-10'>
        <div className='flex gap-1'>
          <b className='border border-gray-500 rounded-md px-5 py-5 text-sm'>Descrpition</b>
          <p className='border border-gray-500 rounded-md px-5 py-5 text-sm'>Review (122)</p>
        </div>
        <div className='flex py-5 px-6 mt-1  flex-col gap-4 border border-gray-500 rounded-md  text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aliquam quaerat, cum excepturi earum tenetur doloribus ipsam cupiditate. Alias nihil culpa quod facilis id, iste dolores tempore modi labore quasi odio totam ducimus deserunt minima ut dolorum voluptatibus ea! Rerum ducimus expedita illum, magnam voluptatem et beatae sapiente? Tenetur, minus.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro magni eveniet quae inventore officiis possimus ab at perspiciatis consectetur deserunt!</p>
        </div>
      </div>


      {/* Display Related Products */}
      <RelatedProducts realtedProductList={realtedProductList} />

      <ToastContainer />

    </div>
  ) : (<div className='w-full flex items-center justify-center '>
    <button onClick={() => navigate("/")} className='bg-black mt-5 text-white px-8 py-3 text-sm active:bg-gray-700 '>Refresh</button>
  </div>)
}

export default Product
