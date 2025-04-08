import fs from 'fs/promises';
const path = './data/products.json';

export default class ProductManager {
  async getProducts() {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  }

  async addProduct(productData) {
    const products = await this.getProducts();
    const newProduct = {
      id: this.generateId(products),
      ...productData,
    };
    products.push(newProduct);
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updateData) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...products[index], ...updateData, id: products[index].id };
    products[index] = updated;
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return updated;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    await fs.writeFile(path, JSON.stringify(filtered, null, 2));
    return true;
  }

  generateId(products) {
    const ids = products.map(p => parseInt(p.id) || 0);
    return (Math.max(...ids, 0) + 1).toString();
  }
}