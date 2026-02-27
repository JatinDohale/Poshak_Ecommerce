/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios"


// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    //states and Variables
    const currency = "₹";
    const deliveryFee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})


    // funtion for adding product in cart and Sync with Database
    const addToCart = async (itemID, size) => {

        if (!size) { return toast.error('Select Size First', { autoClose: 1000, }); }

        let CartData = structuredClone(cartItems)

        if (CartData[itemID]) {
            if (CartData[itemID][size]) {
                CartData[itemID][size] += 1
            } else {
                CartData[itemID][size] = 1
            }
        } else {
            CartData[itemID] = {}
            CartData[itemID][size] = 1
        }

        setCartItems(CartData)
        toast.success("Added to Cart")

        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/add', { itemID, size }, { headers: { token: token } })
            } catch (e) {
                console.log(e)
                toast.error(e.message)
            }
        }

    }


    // function for increase and decrease  quantity in Placed Orders
    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = Number(quantity);
        setCartItems(cartData)
        toast.success("Product Remove Successfully")

        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/update', { itemId, size, quantity }, { headers: { token: token } })
            } catch (e) {
                console.log(e)
                toast.error(e.message)
            }
        }
    }


    // fucntion for Total Amount for products
    const getTotalAmount = () => {

        let totalAmount = 0

        for (const items in cartItems) {
            let itemPrice = products.find((item) => item._id == items).price
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) { totalAmount += cartItems[items][item] * itemPrice }
                } catch (e) {
                    console.log(e)
                    toast.error(e.message)
                }
            }
        }

        return totalAmount
    }


    // function for fetch all products from database
    const fetchProducts = async () => {
        try {

            const response = await axios.get(backendURL + "/api/product/getproductslist")

            if (response.data.success) {
                setProducts(response.data.productList)
            } else {
                toast.error("something wrong try again later")
            }

        } catch (e) {
            console.log(e)
            toast.error(e.data.message)
        }
    }


    // function for cart based on user from database
    const getUserCart = async (token) => {
        try {

            const respone = await axios.post(backendURL + '/api/cart/getcart', {}, { headers: { token: token } })

            if (respone.data.success) {
                setCartItems(respone.data.cartData)
            } else {
                toast.error("something wrong try again later")
            }

        } catch (e) {
            console.log(e)
            toast.error(e.data.message)

        }
    }


    // useEffect for fetch prodcut when page loads
    useEffect(() => {
        fetchProducts()
    }, [])


    // useEffect for set token if user already login
    useEffect(() => {

        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }

    }, [])


    // array for store all variables and function
    const value = {
        products,
        currency,
        deliveryFee,
        cartItems,
        backendURL,
        token,
        addToCart,
        updateQuantity,
        getTotalAmount,
        navigate,
        fetchProducts,
        setToken,
        setCartItems
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;