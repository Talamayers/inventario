const express = require('express');
const cors = require('cors');
require('dotenv').config(); // <--- esta línea es muy importante

const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
// const logger = require('./middlewares/loggerMiddleware'); // opcional

// Middlewares globales
app.use(cors());
app.use(express.json());
// app.use(logger); // opcional

// ✅ IMPORTANTE: Usa las rutas correctamente
app.use('/api/categorias', require('./routes/categorias.routes'));

// También tus otras rutas:
app.use('/api/productos', require('./routes/productosRoutes'));

const proveedoresRoutes = require('./routes/proveedoresRoutes');
app.use('/api/proveedores', proveedoresRoutes);

const entradasRoutes = require('./routes/entradasRoutes');
app.use('/api/entradas', entradasRoutes);

const salidasRoutes = require('./routes/salidasRoutes');
app.use('/api/salidas', salidasRoutes);

const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/api/usuarios', usuariosRoutes);

const auditoriaRoutes = require('./routes/auditoriaRoutes');
app.use('/api/auditoria', auditoriaRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido al backend del sistema de inventario');
});

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // Esto activa /api/login

app.use(notFound);
app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
