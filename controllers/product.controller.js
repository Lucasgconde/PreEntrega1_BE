import ProductManager from '../managers/ProductManager.js';

const manager = new ProductManager();

export const getAllProducts = async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductById(pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const newProduct = await manager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
  res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const updated = await manager.updateProduct(pid, req.body);
  if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  await manager.deleteProduct(pid);
  res.status(204).send();
};