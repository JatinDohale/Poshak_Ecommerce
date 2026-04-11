//Packages
import express from 'express';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

import { addProduct, getProductDetail, getProductsList, removeProduct } from '../controllers/productController.js';

const productRouter = express.Router();//Make router

// routes
productRouter.post('/addproduct', adminAuth, upload.any(), addProduct)
productRouter.post('/removeproduct', adminAuth, removeProduct)
productRouter.post('/getproductdetail', getProductDetail)
productRouter.get('/getproductslist', getProductsList)

export default productRouter;
