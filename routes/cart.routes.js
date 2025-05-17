import { Router } from 'express';
import {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  clearCart
} from '../controllers/cart.controller.js';

const router = Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid', updateCartProducts);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);

export default router;
