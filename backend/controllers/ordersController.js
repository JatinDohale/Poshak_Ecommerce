import Stripe from 'stripe';

import orderModal from "../models/ordersModal.js";
import userModal from "../models/userModal.js"


// global variables
const currency = 'inr';
const deliveryCharges = 10;



//gateway initilized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



//place  order by cod
const placeOrder = async (req, res) => {
    try {
        const { userID, items, amount, address } = req.body;

        const orderData = {
            userID,
            items,
            amount,
            address,
            status: "order placed",
            date: Date.now(),
            paymentMethod: "COD",
            payment: false,
        }

        const newOrder = new orderModal(orderData)
        await newOrder.save()

        await userModal.findByIdAndUpdate(userID, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}


//place  order by Stripe
const placeOrderStripe = async (req, res) => {
    try {

        const { userID, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userID,
            items,
            amount,
            address,
            status: "order placed",
            date: Date.now(),
            paymentMethod: "Stripe",
            payment: false,
        }

        const newOrder = new orderModal(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charger"
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,

        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderid=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=true&orderid=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}


//place  order by Razorpay
const placeOrderRazorpay = async (req, res) => {
    // Update Soon
}


//verify Stripe
const verifyStripe = async (req, res) => {
    try {

        const { userID, success, orderID } = req.body;

        if (success === "true") {

            await orderModal.findByIdAndUpdate(orderID, { payment: true });
            await userModal.findByIdAndUpdate(userID, { cartData: {} })

            res.json({ success: true })

        } else {
            await orderModal.findByIdAndDelete(orderID)
            res.json({ success: false })
        }

    } catch (error) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}


//Get Order List For Admin
const allOrders = async (req, res) => {
    try {

        const orders = await orderModal.find({})
        res.json({ success: true, orders })

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}


//Get Order List For User
const userOrders = async (req, res) => {
    try {

        const { userID } = req.body;
        const orders = await orderModal.find({ userID })

        res.json({ success: true, orders, message: "All Your Orders" })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}

//upadate order Status from admin 
const updateStatus = async (req, res) => {
    try {

        const { orderID, status } = req.body;

        await orderModal.findByIdAndUpdate(orderID, { status });

        res.json({ success: true, message: "Status Updated" })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}


export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe
};