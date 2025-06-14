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
  const producto = req.body;
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
  const producto = req.body;
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
