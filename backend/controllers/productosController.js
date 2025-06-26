const productosModel = require('../models/productos.model');

const obtenerProductos = (req, res) => {
  productosModel.obtenerProductos((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
    res.json(results);
  });
};

const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  productosModel.obtenerProductoPorId(id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al obtener producto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
};

const crearProducto = (req, res) => {
  const { nombre, descripcion, stock, precio, categoria_id, proveedor_id } = req.body;

  if (
    !nombre ||
    stock === undefined || isNaN(stock) ||
    precio === undefined || isNaN(precio) ||
    !categoria_id ||
    !proveedor_id
  ) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos o inválidos' });
  }

  const producto = { nombre, descripcion, stock, precio, categoria_id, proveedor_id };

  productosModel.crearProducto(producto, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al crear producto' });
    }
    res.status(201).json({ mensaje: 'Producto creado', id: results.insertId });
  });
};

const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, stock, precio, categoria_id, proveedor_id } = req.body;

  if (
    !nombre ||
    stock === undefined || isNaN(stock) ||
    precio === undefined || isNaN(precio) ||
    !categoria_id ||
    !proveedor_id
  ) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos o inválidos' });
  }

  const producto = { nombre, descripcion, stock, precio, categoria_id, proveedor_id };

  productosModel.actualizarProducto(id, producto, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al actualizar producto' });
    }
    res.json({ mensaje: 'Producto actualizado' });
  });
};

const eliminarProducto = (req, res) => {
  const { id } = req.params;
  productosModel.eliminarProducto(id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al eliminar producto' });
    }
    res.json({ mensaje: 'Producto eliminado' });
  });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
