import { Router } from 'express';
import Product from '../models/Product.model.js';
import Cart from '../models/Cart.model.js';

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/products');
});

router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    };

    let filter = {};
    if (query) {
      if (query.toLowerCase() === 'available') {
        filter.stock = { $gt: 0 };
      } else {
        filter.category = query;
      }
    }

    const totalDocs = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / options.limit);
    const products = await Product.find(filter)
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    res.render('home', {
      products: products.map(product => product.toObject()),
      hasPrevPage: options.page > 1,
      hasNextPage: options.page < totalPages,
      prevPage: options.page - 1,
      nextPage: options.page + 1,
      currentPage: options.page
    });

  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});

router.get('/products/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('productDetail', { product: product.toObject() });
  } catch (error) {
    res.status(500).send('Error al cargar el producto');
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('cartDetail', { cart: cart.toObject() });
  } catch (error) {
    res.status(500).send('Error al cargar el carrito');
  }
});

export default router;