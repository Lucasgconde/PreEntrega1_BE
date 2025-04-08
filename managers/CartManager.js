import fs from 'fs/promises';
const path = './data/carts.json';

export default class CartManager {
  async getCarts() {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: this.generateId(carts),
      products: [],
    };
    carts.push(newCart);
    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;

    const prod = cart.products.find(p => p.product === productId);
    if (prod) {
      prod.quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return cart;
  }

  generateId(carts) {
    const ids = carts.map(c => parseInt(c.id) || 0);
    return (Math.max(...ids, 0) + 1).toString();
  }
}