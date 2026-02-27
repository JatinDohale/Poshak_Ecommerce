/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

import { ShopContext } from '../context/ShopContext'


const Verify = () => {

    // states and variables
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()
    const { navigate, token, setCartItems, backendURL } = useContext(ShopContext)
    const success = searchParams.get('success')
    const orderID = searchParams.get('orderid')

    // verify Function for paymetn verification
    const verifyPayment = async () => {
        try {

            if (!token) { return null }

            const respone = await axios.post(backendURL + '/api/orders/verifystripe', { success, orderID }, { headers: { token: token } })

            if (respone.data.success) {
                setCartItems({})
                navigate("/orders")
            } else {
                navigate("/cart")
            }

        } catch (e) {
            console.log(e)
            toast.error(e.message)
        }
    }

    // useEfect Hook for verifypayment function
    useEffect(() => {
        verifyPayment()
    }, [token])


    return (
        <div>
            Verify
        </div>
    )
}

export default Verify
