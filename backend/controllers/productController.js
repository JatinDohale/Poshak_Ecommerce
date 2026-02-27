import { v2 as cloudinary } from 'cloudinary'

import productModal from '../models/productModal.js';


// for add the product
const addProduct = async (req, res) => {

   try {
      const { name, description, sizes, price, category, subcategory, bestseller } = req.body;

      const image1 = req.files.image1 && req.files.image1[0]
      const image2 = req.files.image2 && req.files.image2[0]
      const image3 = req.files.image3 && req.files.image3[0]
      const image4 = req.files.image4 && req.files.image4[0]

      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

      const image_url = await Promise.all(images.map(async (item) => {
         const result = await cloudinary.uploader.upload(item.path)
         return result.secure_url
      }))

      const productData = new productModal({
         name,
         description,
         sizes: JSON.parse(sizes),
         price: Number(price),
         date: Date.now(),
         image: image_url,
         category,
         subcategory,
         bestseller: bestseller == "true" ? true : false,
      })

      const product = productData.save();
      res.json({ success: true, message: "Product added Succesfully" })

   } catch (e) {
      console.log(e)
      res.json({ success: false, message: e.message })
   }
}


//for remove the product
const removeProduct = async (req, res) => {
   try {

      const deletedProduct = await productModal.findByIdAndDelete(req.body._id)

      const { name, description } = deletedProduct

      res.json({ success: true, message: "Product deleted succsesfully", name, description })

   } catch (e) {
      console.log(e)
      res.json({ success: false, message: "error: " + e.message })
   }
}


// for fetching the product 
const getProductsList = async (req, res) => {
   try {

      const productList = await productModal.find();

      res.json({ success: true, message: "Here All The Products", productList })

   } catch (e) {
      console.log(e)
      res.json({ success: false, message: "error: " + e.message })
   }
}


//fot get one product detailconst addProduct =(req,res) =>{
const getProductDetail = async (req, res) => {
   try {

      const product = await productModal.findById(req.body._id)

      res.json({ success: true, messge: "Here Your Product", product })

   } catch (e) {
      console.log(e)
      res.json({ success: false, message: "error: " + e.message })
   }

}


export { addProduct, removeProduct, getProductDetail, getProductsList }