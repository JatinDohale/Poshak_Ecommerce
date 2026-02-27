import express from 'express';

// middlewares for authentication
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

import {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe
} from '../controllers/ordersController.js'


const orderRouter = express.Router(); // make router

//for User
orderRouter.post("/userorders", authUser, userOrders);

//for Admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//verypayment
orderRouter.post("/verifystripe", authUser, verifyStripe);


export default orderRouter;