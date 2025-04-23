import ProductManager from './managers/ProductManager.js';
const productManager = new ProductManager();

export default function socketManager(io) {
  io.on('connection', socket => {
    console.log('🟢 Cliente conectado por WebSocket');

    // Evento: agregar nuevo producto
    socket.on('newProduct', async (data) => {
      try {
        await productManager.addProduct(data);
        const updatedProducts = await productManager.getProducts();
        io.emit('updateProducts', updatedProducts);
      } catch (error) {
        console.error('Error al agregar producto:', error.message);
      }
    });

    // Evento: eliminar producto (por si después lo usás)
    socket.on('deleteProduct', async (productId) => {
      try {
        await productManager.deleteProduct(productId);
        const updatedProducts = await productManager.getProducts();
        io.emit('updateProducts', updatedProducts);
      } catch (error) {
        console.error('Error al eliminar producto:', error.message);
      }
    });
  });
}