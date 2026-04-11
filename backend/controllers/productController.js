import { v2 as cloudinary } from 'cloudinary'
import productModal from '../models/productModal.js';


// for add the product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subCategory,
      price,
      sizes,
      bestseller,
      selectedColors,
    } = req.body;

    const colors = JSON.parse(selectedColors);

    const colorImages = {};

    for (const color of colors) {
      const colorFiles = (req.files || []).filter(
        (file) => file.fieldname.startsWith(`photos_${color}_`)
      );

      if (colorFiles.length === 0) {
        return res.status(400).json({
          success: false,
          message: `At least 1 photo required for color: ${color}`,
        });
      }

      // ✅ Fixed — clean single upload function
      const uploadedUrls = await Promise.all(
        colorFiles.map((file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "products" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
            stream.end(file.buffer);
          });
        })
      );

      colorImages[color] = uploadedUrls;
    }

    const product = new productModal({
      name,
      description,
      category,
      subCategory,
      price:      Number(price),
      sizes:      JSON.parse(sizes),
      bestseller: bestseller === "true",
      colorImages,
      date:       Date.now(),
    });

    await product.save();

    res.json({ success: true, message: "Product added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



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