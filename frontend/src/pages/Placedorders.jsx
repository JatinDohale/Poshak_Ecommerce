import { useContext, useState } from 'react'
import axios from 'axios'

import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast, ToastContainer } from 'react-toastify'

//components
import Tittle from '../components/Tittle'
import CartTotal from '../components/CartTotal'

const Placedorders = () => {

  //states and Variable
  const [method, setMethod] = useState("COD")
  const { navigate, backendURL, token, cartItems, setCartItems, getTotalAmount, deliveryFee, products } = useContext(ShopContext)
  const [formData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: '',
  })

  // value change handler
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFromData(data => ({ ...data, [name]: value }))
  }

  //submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (formData.pincode.length !== 6) {
      return toast.warn("Enter Valid Pincode")
    }

    if (formData.phone.length !== 10) {
      return toast.warn("Enter Valid Phone Number")
    }


    try {

      let orderItems = [];

      //get item from cart and add to orders items
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo)
            }
          }
        }
      }


      //orderData Variable
      const ordersData = {
        items: orderItems,
        address: formData,
        amount: getTotalAmount() + deliveryFee,
      }

      // logic for method changing by default Cash On Delivery
      switch (method) {
        case 'COD': {
          const responce = await axios.post(backendURL + "/api/orders/place", ordersData, { headers: { token: token } });

          if (responce.data.success) {
            navigate("/orders")
            setCartItems({})
          } else {
            toast.error(responce.data.message)
          }

          break;
        }

        case 'stripe': {
          const responce = await axios.post(backendURL + "/api/orders/stripe", ordersData, { headers: { token: token } });

          if (responce.data.success) {
            const { session_url } = responce.data;
            window.location.replace(session_url)
            console.log(session_url)
          } else {
            toast.error(responce.data.message)
          }

          break;
        }

        default: break;
      }

    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }


  }


  return (

    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-120'>

        {/* titile */}
        <div className='text-xl sm:text-2xl my-3'>
          <Tittle text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>


        {/* inputs */}
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={FormData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={FormData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={FormData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={FormData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Street/Area' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={FormData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={FormData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='pincode' value={FormData.pincode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="Number" placeholder='Pin Code' />
          <input required onChange={onChangeHandler} name='country' value={FormData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={FormData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="Number" placeholder='Phone Number' />

      </div>


      {/* Right Side */}
      <div className='mt-8'>

        {/* Cart Total */}
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Tittle text1={'PAYMENT'} text2={'METHOD'} />

          {/* Paymebt Methods */}
          <div className='flex gap-1 flex-col lg:flex-row'>
            <div onClick={() => { setMethod("stripe") }} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method == "stripe" ? "bg-green-500" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => { toast.warn("Currently Not avalaible") }} className="flex items-center gap-3 bg-slate-400  border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5  border rounded-full ${method == "razorpay" ? "bg-green-500" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => { setMethod("COD") }} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method == "COD" ? "bg-green-500" : ""}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black mt-5 text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-slate-900 hover:cursor-pointer'>PLACE ORDER</button>
          </div>

        </div>

      </div>

      <ToastContainer />
    </form>
  )
}

export default Placedorders
