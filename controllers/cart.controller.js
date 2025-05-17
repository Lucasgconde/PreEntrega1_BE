import Cart from '../models/Cart.model.js';

// Crear carrito
export const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener carrito por ID
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const existing = cart.products.find(p => p.product.toString() === pid);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid });
    }

    await cart.save();
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Eliminar producto del carrito
export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();

    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Reemplazar todos los productos del carrito
export const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Actualizar cantidad de un producto
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const product = cart.products.find(p => p.product.toString() === pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });

    product.quantity = quantity;
    await cart.save();

    res.json({ status: 'success', message: 'Cantidad actualizada' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Vaciar el carrito
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();

    res.json({ status: 'success', message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};