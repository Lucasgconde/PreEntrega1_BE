# 🏍️ Preentrega 2 - Backend con Websockets y Handlebars (Coderhouse)

Este proyecto es una API REST construida con **Node.js**, **Express**, **Handlebars** y **Socket.IO**, que permite gestionar productos y carritos de compra. Incluye vistas dinámicas en tiempo real mediante WebSockets.

---

## 🚀 Cómo iniciar el proyecto

1. Clonar el repositorio.
2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor:

```bash
npm start
```

El servidor se ejecuta en `http://localhost:8080`

> ⚠️ Asegurate de tener los archivos `products.json` y `carts.json` en la carpeta `/data`, ambos con `[]` como contenido inicial.

---

## 💻 Vistas con Handlebars

| Ruta | Vista                   | Descripción                                          |
|------|--------------------------|------------------------------------------------------|
| `/home` | `home.handlebars`         | Muestra una tabla estática con todos los productos  |
| `/realtimeproducts` | `realTimeProducts.handlebars` | Muestra una lista dinámica que se actualiza por WebSocket |

La vista `/realtimeproducts` incluye un formulario para agregar productos en tiempo real, que se actualiza automáticamente para todos los usuarios conectados.

---

## 📡 WebSocket (Socket.IO)

Se implementó un servidor WebSocket que:

- Escucha eventos `newProduct` y `deleteProduct`
- Actualiza la lista de productos en vivo mediante `io.emit('updateProducts')`
- Todo se gestiona en el archivo `socketManager.js`

---

## 📦 Rutas de Productos `/api/products`

| Método | Ruta      | Descripción                                |
|--------|-----------|--------------------------------------------|
| GET    | `/`       | Lista todos los productos                  |
| GET    | `/:pid`   | Muestra un producto por ID                 |
| POST   | `/`       | Crea un nuevo producto                     |
| PUT    | `/:pid`   | Actualiza un producto (sin modificar id)   |
| DELETE | `/:pid`   | Elimina un producto                        |

---

## 🛒 Rutas de Carritos `/api/carts`

| Método | Ruta                                      | Descripción                                     |
|--------|-------------------------------------------|-------------------------------------------------|
| POST   | `/`                                       | Crea un carrito vacío                           |
| GET    | `/:cid`                                   | Lista los productos del carrito                 |
| POST   | `/:cid/product/:pid`                      | Agrega un producto al carrito (o suma cantidad) |

---

## 💾 Persistencia

Los datos se guardan en archivos `.json` dentro de `/data`:
- `products.json`
- `carts.json`

Gestionados a través de `ProductManager.js` y `CartManager.js` con `fs.promises`.

---

## 📁 Estructura del Proyecto

```
📆 preentrega-2
💁 controllers/
🕛 data/
🧰 managers/
📊 public/
└── js/
📚 routes/
📖 views/
└── layouts/
server.js
socketManager.js
README.md
```

---

## 👨‍💻 Autor
Hecho por **Conde Lucas** - Estudiante de Coderhouse.