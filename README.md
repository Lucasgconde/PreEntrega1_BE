# 🛍️ Preentrega 1 - Backend API (Coderhouse)

Este proyecto es una API REST construida con **Node.js** y **Express**, que permite gestionar productos y carritos de compra. Forma parte de la entrega para el curso de Backend de Coderhouse.

---

## 🚀 Cómo iniciar el proyecto

1. Clonar el repositorio.
2. Ejecutar:

```bash
npm install
npm start
```

El servidor se ejecuta en `http://localhost:8080`

> ⚠️ Asegurate de tener los archivos `products.json` y `carts.json` en la carpeta `/data`, ambos con `[]` como contenido inicial.

---

## 📦 Rutas de Productos `/api/products`

| Método | Ruta              | Descripción                               |
|--------|-------------------|-------------------------------------------|
| GET    | `/`               | Lista todos los productos                 |
| GET    | `/:pid`           | Muestra un producto por ID                |
| POST   | `/`               | Crea un nuevo producto                    |
| PUT    | `/:pid`           | Actualiza un producto (sin modificar id) |
| DELETE | `/:pid`           | Elimina un producto                       |

### ✏️ Campos requeridos para POST:
- title (String)
- description (String)
- code (String)
- price (Number)
- status (Boolean, opcional: default true)
- stock (Number)
- category (String)
- thumbnails (Array de Strings)

---

## 🛒 Rutas de Carritos `/api/carts`

| Método | Ruta                                      | Descripción                                       |
|--------|-------------------------------------------|---------------------------------------------------|
| POST   | `/`                                       | Crea un carrito vacío                             |
| GET    | `/:cid`                                   | Lista los productos del carrito                   |
| POST   | `/:cid/product/:pid`                      | Agrega un producto al carrito (o suma cantidad)   |

---

## 💾 Persistencia

Los datos se guardan en archivos `.json` dentro de `/data`:
- `products.json`
- `carts.json`

Manejados a través de `ProductManager.js` y `CartManager.js` con `fs.promises`.

---

## 📁 Estructura del Proyecto

```
📦 preentrega-1
├── controllers
│   ├── cart.controller.js
│   └── product.controller.js
├── data
│   ├── carts.json
│   └── products.json
├── managers
│   ├── CartManager.js
│   └── ProductManager.js
├── routes
│   ├── cart.routes.js
│   └── product.routes.js
├── server.js
└── package.json
```

---

## 📬 Contacto
Hecho por **Conde Lucas** - Estudiante de Coderhouse.
