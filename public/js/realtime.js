const socket = io();

const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const newProduct = Object.fromEntries(formData.entries());

  newProduct.price = parseFloat(newProduct.price);
  newProduct.stock = parseInt(newProduct.stock);

  socket.emit('newProduct', newProduct);
  form.reset();
});

socket.on('updateProducts', async () => {
  const response = await fetch('/api/products');
  const products = await response.json();

  tableBody.innerHTML = '';

  products.forEach(p => {
    tableBody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.description}</td>
        <td>${p.price}</td>
        <td>${p.code}</td>
        <td>${p.stock}</td>
      </tr>
    `;
  });
});