import connectMongo from './config/mongo.js';
connectMongo();
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Handlebars from 'express-handlebars';
import helpers from './handlebars.helpers.js';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import viewsRouter from './routes/views.routes.js';
import socketManager from './socketManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
socketManager(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', Handlebars.engine({ helpers }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRouter);

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});