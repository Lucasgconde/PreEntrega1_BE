import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  thumbnails: [String],
});

const Product = mongoose.model('Product', productSchema);
export default Product;