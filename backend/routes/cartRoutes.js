import express from 'express';
import { addTOCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addTOCart)
cartRouter.post("/update", authUser, updateCart)
cartRouter.post("/getcart", authUser, getUserCart)

export default cartRouter;