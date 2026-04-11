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
    const Whatsup_url =  `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(import.meta.env.VITE_WHATSAPP_MESSAGE)}`
    const Instagram = import.meta.env.VITE_INSTAGRAM
    const Facebook = import.meta.env.VITE_FACEBOOK
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})

    


    // funtion for adding product in cart and Sync with Database
    const addToCart = async (itemID, size , color) => {
        if(!token) { return toast.warn("Please Login First")}
        if (!size) { return toast.error('Select Size First', { autoClose: 1000, }); }
        let CartData = structuredClone(cartItems)
        if (CartData[itemID]) {
            if(CartData[itemID][color]){
                if (CartData[itemID][color][size] ) {
                    CartData[itemID][color][size] += 1
                } else {
                    CartData[itemID][color][size] = 1
                }
            }else{
                CartData[itemID][color] = {}
                 CartData[itemID][color][size] = 1
            }
        } else {
            CartData[itemID] = {}
            CartData[itemID][color] = {}
            CartData[itemID][color][size] = 1
        }

        setCartItems(CartData)
        
        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/add', { itemID, color , size  }, { headers: { token: token } })
            } catch (e) {
                console.log(e)
                toast.error(e.message)
            }
        }

        toast.success("Added to Cart")

    }


    // function for increase and decrease  quantity in Placed Orders
    const updateQuantity = async (itemId, color ,  size, quantity) => {

        let cartData = structuredClone(cartItems)
        cartData[itemId][color][size] = Number(quantity);
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/update', { itemId, color, size, quantity }, { headers: { token: token } })
            } catch (e) {
                console.log(e)
                toast.error(e.message)
            }
        }
    }


    // fucntion for Total Amount for products
    const getTotalAmount = () => {

        let totalAmount = 0

        for (const prod in cartItems) {
            let itemPrice = products.find((item) => item._id == prod).price
            for (const color in cartItems[prod]) {
                for ( const size in cartItems[prod][color]){
                    try {
                        if (cartItems[prod][color][size] > 0) { totalAmount += cartItems[prod][color][size] * itemPrice }
                    } catch (e) {
                        console.log(e)
                        toast.error(e.message)
                    }
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
                setCartItems(respone.data.cartData ? respone.data.cartData : {})
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

    // Get first image supporting both image[] and colorImages{}
    const getImage = (item) => {
        if (item.colorImages) {
            const firstKey = Object.keys(item.colorImages)[0]
            return firstKey ? item.colorImages[firstKey][0] : ''
        }
        return Array.isArray(item.image) ? item.image[0] : item.image || ''
    }


    // fucntion for logout
    const logout = () => {
        navigate('/login')
        setToken(undefined)
        localStorage.removeItem('token')
        setCartItems({})
        // setProfileOpen(false)
    }


    // array for store all variables and function
    const value = {
        Instagram,
        Facebook,
        products,
        currency,
        deliveryFee,
        cartItems,
        backendURL,
        token,
        Whatsup_url,
        addToCart,
        updateQuantity,
        getTotalAmount,
        navigate,
        fetchProducts,
        setToken,
        setCartItems,
        getImage,
        logout,
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;