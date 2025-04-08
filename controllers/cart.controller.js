import CartManager from '../managers/CartManager.js';

const manager = new CartManager();

export const createCart = async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
};

export const getCartById = async (req, res) => {
  const { cid } = req.params;
  const cart = await manager.getCartById(cid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(cart);
};

export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await manager.addProductToCart(cid, pid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(cart);
};