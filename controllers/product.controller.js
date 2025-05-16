import Product from '../models/Product.model.js';

export const getProducts = async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;
    const limitNum = Number(limit) || 10;
    const pageNum = Number(page) || 1;
    
    let filter = {};
    if (query) {
      if (query.toLowerCase() === 'available') {
        filter.stock = { $gt: 0 };
      } else {
        filter.category = query;
      }
    }
    
    let sortOption = {};
    if (sort) {
      if (sort.toLowerCase() === 'asc') {
        sortOption.price = 1;
      } else if (sort.toLowerCase() === 'desc') {
        sortOption.price = -1;
      }
    }
    
    const totalDocs = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limitNum);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);
      
    const hasPrevPage = pageNum > 1;
    const hasNextPage = pageNum < totalPages;
    const prevPage = hasPrevPage ? pageNum - 1 : null;
    const nextPage = hasNextPage ? pageNum + 1 : null;
    
    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;
    let prevLink = null;
    if (hasPrevPage) {
      const prevParams = new URLSearchParams(req.query);
      prevParams.set('page', prevPage);
      prevLink = `${baseUrl}?${prevParams.toString()}`;
    }
    let nextLink = null;
    if (hasNextPage) {
      const nextParams = new URLSearchParams(req.query);
      nextParams.set('page', nextPage);
      nextLink = `${baseUrl}?${nextParams.toString()}`;
    }

    res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: pageNum,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleted = await Product.findByIdAndDelete(pid);

    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updated = await Product.findByIdAndUpdate(pid, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};