import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  subCategory: { type: String, required: true },
  price:       { type: Number, required: true },
  sizes:       { type: Array,  required: true },
  bestseller:  { type: Boolean, default: false },
  colorImages: { type: Object, required: true },
  // Example: { "Black": ["url1","url2"], "Navy": ["url3","url4"] }
  date:        { type: Number, required: true },
});

const productModal = mongoose.models.product || mongoose.model("product", productSchema);

export default productModal;