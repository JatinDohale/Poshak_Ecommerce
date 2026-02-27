import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

//components
import Tittle from './Tittle'

const CartTotal = () => {

    //States & Variables
    const { currency, deliveryFee, getTotalAmount } = useContext(ShopContext)

    return (

        <div className='w-full'>

            <div className='text-2xl'>
                <Tittle text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{getTotalAmount()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency}{deliveryFee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency}{getTotalAmount() === 0 ? 0 : (getTotalAmount() + deliveryFee)}</b>
                </div>

            </div>

        </div>
    )
}

export default CartTotal
