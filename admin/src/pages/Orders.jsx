import { useState, useEffect } from 'react';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets';

const Orders = ({ token }) => {

  // states and Variables
  const [orders, setOrders] = useState([]);

  // function for get all orders from database
  const fetchAllOrders = async () => {

    if (!token) { return null }

    try {

      const response = await axios.post(backendUrl + "/api/orders/list", {}, { headers: { token } })

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch (e) {
      console.log(e)
      toast.error(e.meesage)
    }

  }


  // Staus Handles and sync with database
  const statusHandler = async (e, orderID) => {
    try {

      const respone = await axios.post(backendUrl + "/api/orders/statusz", { orderID, status: e.target.value }, { headers: { token } });
      if (respone.data.success) { await fetchAllOrders() }

    } catch (e) {
      console.log(e);
      toast.error(e.message)
    }
  }


  // UseEffect for get all order when page load
  useEffect(() => {
    fetchAllOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (

    <div>
      <h3 className='text center'> All Orders</h3>

      <div>
        {orders?.map((order, index) => (
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_1fr_2fr]  lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 text-xs sm:text-sm text-gray-700' key={index}>
            <img className='w-10' src={assets.parcel_icon} alt="" />

            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p className='py-0.5' key={index}>{item.name} X {item.quatity} <span>{item.size}</span></p>
                  } else {
                    return <p className='py-0.5' key={index}>{item.name} X {item.quatity} <span>{item.size}</span> ,</p>
                  }
                })
                }
              </div>
              <p className='mt-3 mb-2 font-medium' >{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","} </p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.pincode} </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p className='text-sm sm:text-[15px]'>{order.items.length}</p>
              <p className='mt-3' >Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toDateString()}</p>
            </div>

            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>

            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}

      </div>
      <ToastContainer />
    </div>
  )
}

export default Orders;
