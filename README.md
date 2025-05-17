# 🚀 Entrega Final - Backend con MongoDB, Handlebars y Websockets

Proyecto de Backend desarrollado como entrega final del curso de **Backend en Coderhouse**, con persistencia en **MongoDB**, vistas con **Handlebars**, y funcionalidades en tiempo real mediante **WebSockets**.

---

## ✅ Funcionalidades principales

- Gestión de productos con filtros, paginación y ordenamiento dinámico
- Gestión completa de carritos con operaciones CRUD
- Vistas dinámicas con Handlebars
- Websockets para actualización en tiempo real de productos
- Persistencia de datos con MongoDB

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Handlebars
- Socket.IO
- JavaScript (ESM)
- CSS básico (opcional para estilos)

---

## 🧪 Cómo ejecutar el proyecto

1. Cloná este repositorio
2. Instalá las dependencias con:

```bash
npm install
```

3. Iniciá el servidor:

```bash
npm start
```

4. Verificá que MongoDB esté corriendo localmente en `mongodb://localhost:27017/ecommerce`

---

## 📂 Rutas principales

### 🔹 Productos (`/api/products`)

| Método | Ruta                | Descripción                                          |
|--------|---------------------|------------------------------------------------------|
| GET    | `/`                 | Lista de productos con paginación, filtros y orden  |
| GET    | `/:pid`             | Detalle de producto por ID                          |
| POST   | `/`                 | Crea un nuevo producto                              |
| PUT    | `/:pid`             | Actualiza un producto existente                     |
| DELETE | `/:pid`             | Elimina un producto                                 |

---

### 🔹 Carritos (`/api/carts`)

| Método | Ruta                                       | Descripción                                      |
|--------|--------------------------------------------|--------------------------------------------------|
| POST   | `/`                                        | Crea un nuevo carrito vacío                      |
| GET    | `/:cid`                                    | Lista productos del carrito                      |
| POST   | `/:cid/product/:pid`                       | Agrega un producto al carrito                    |
| DELETE | `/:cid/products/:pid`                      | Elimina un producto del carrito                  |
| PUT    | `/:cid`                                    | Reemplaza todos los productos del carrito        |
| PUT    | `/:cid/products/:pid`                      | Actualiza la cantidad de un producto específico  |
| DELETE | `/:cid`                                    | Vacía completamente el carrito                   |

---

## 🖼️ Vistas con Handlebars

| Ruta               | Descripción                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `/products`        | Muestra todos los productos con paginación y opción de ver detalle o agregar |
| `/products/:pid`   | Muestra detalle del producto con botón de agregar al carrito                |
| `/carts/:cid`      | Muestra el carrito con todos los productos agregados                        |
| `/realtimeproducts`| Vista con actualización en tiempo real usando WebSocket                     |

---

## 🔁 Websockets

- Ruta activa: `/realtimeproducts`
- Permite agregar productos en tiempo real
- Emite y recibe eventos mediante `socket.io`

---

## 📁 Estructura del proyecto

```
📦 preentrega
├── config/
│   └── mongo.js
├── controllers/
│   ├── cart.controller.js
│   └── product.controller.js
├── models/
│   ├── Cart.model.js
│   └── Product.model.js
├── routes/
│   ├── cart.routes.js
│   ├── product.routes.js
│   └── views.routes.js
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── home.handlebars
│   ├── productDetail.handlebars
│   ├── cartDetail.handlebars
│   └── realTimeProducts.handlebars
├── public/
├── socketManager.js
├── server.js
└── README.md
```

---

## 👨‍💻 Autor

Desarrollado por **Conde Lucas**  
Entrega Final - Curso Backend - **Coderhouse**