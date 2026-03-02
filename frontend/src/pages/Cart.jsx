import { useEffect, useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify';

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';

//components
import Tittle from '../components/Tittle';
import CartTotal from '../components/CartTotal';


const Cart = () => {

  //state and variables
  const { cartItems, currency, products, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([])

  //useEffect Hook for Set the CarData
  useEffect(() => {
    let tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {

        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }

      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartData(tempData)
  }, [cartItems])


  return (

    <div className='border-t pt-10'>

      {/* Page Heading */}
      <div className='text-2xl mb-3 text-center'>
        <Tittle text1={"YOUR"} text2={'CART'} />
      </div>

      {/*card products Display   */}
      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item.id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-7 grid grid-cols[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4  '>

                <div className='flex item-start gap-5'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 border bg-blue-500 text-white rounded-md '>{item.size}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="quantity">Quantity : </label>
                  <input id='quantity' onClick={(e) => updateQuantity(item.id, item.size, e.target.value)} className='rounded-sm border max-w-10 sm:max-w-20 text-center' type="number" min={1} defaultValue={item.quantity} />
                </div>

                <img onClick={() => updateQuantity(item.id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer ' src={assets.bin_icon} alt="" />

              </div>)
          })
        }
      </div>

      {/*Cart Total And Proceed Button  */}
      <div className='flex justify-end my-20'>

        <div className='w-full sm:max-w-md'>
          <CartTotal />
          <div className='w-full text-end '>
            <button onClick={() => navigate("/placedorders")} className='bg-black mt-5 text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-slate-900'>PROCEED TO CHECKOUT</button>
          </div>
        </div>

      </div>

      <ToastContainer />
    </div>
  )
}

export default Cart
