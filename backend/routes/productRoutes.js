//Packages
import express from 'express';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

import { addProduct, getProductDetail, getProductsList, removeProduct } from '../controllers/productController.js';

const productRouter = express.Router();//Make router

// routes
productRouter.post('/addproduct', adminAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }]), addProduct)
productRouter.post('/removeproduct', adminAuth, removeProduct)
productRouter.post('/getproductdetail', getProductDetail)
productRouter.get('/getproductslist', getProductsList)

export default productRouter;
