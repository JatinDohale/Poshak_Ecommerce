import { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

import { ShopContext } from '../context/ShopContext'

//Components
import Tittle from '../components/Tittle';

const Orders = () => {

  //states and Variables
  const { token, backendURL, currency } = useContext(ShopContext);
  const [ordersList, setOrdersList] = useState();

  //fucntion for set Orders Lists
  const ordersData = async () => {

    try {
      if (!token) { return null }

      const responce = await axios.post(backendURL + "/api/orders/userorders", {}, { headers: { token: token } })

      if (responce.data.success) {
        let allOrdersItem = [];
        responce.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status
            item["payment"] = order.payment
            item["paymentMethod"] = order.paymentMethod
            item["date"] = order.date
            allOrdersItem.push(item);
          })
        })
        setOrdersList(allOrdersItem.reverse())

      } else {
        toast.error(responce.data.message)
      }
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }


  //useEffect Hook for set ordersData
  useEffect(() => {
    ordersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])






  return (

    <div className='border-t pt-18'>

      {/* Page Title */}
      <div className='text-2xl text-center'>
        <Tittle text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Orders List Display */}
      <div>
        {ordersList ? ordersList.map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base font-medium '>{item.name}</p>
                <div>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>

            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center justify-between gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500 '> </p>
                <p className='text-sm md:text-base'> {item.status}</p>
                <p></p>
              </div>
              <button onClick={ordersData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>

            </div>
          </div>
        )) :
          <div>order is loading Wait</div>
        }
      </div>

    </div>
  )
}

export default Orders
