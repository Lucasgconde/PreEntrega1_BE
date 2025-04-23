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

    // ✅ Validación de código repetido
    const codeExists = products.some(p => p.code === productData.code);
    if (codeExists) {
      throw new Error(`Ya existe un producto con el código "${productData.code}".`);
    }

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
  }

  generateId(products) {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }
}