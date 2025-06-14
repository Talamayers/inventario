const db = require('../config/db');

const obtenerProductos = (callback) => {
  db.query('SELECT * FROM productos', callback);
};

const obtenerProductoPorId = (id, callback) => {
  db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
};

const crearProducto = (producto, callback) => {
  const { codigo, nombre, descripcion, cantidad, precio, categoria_id } = producto;
  db.query(
    'INSERT INTO productos (codigo, nombre, descripcion, cantidad, precio, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
    [codigo, nombre, descripcion, cantidad, precio, categoria_id],
    callback
  );
};

const actualizarProducto = (id, producto, callback) => {
  const { codigo, nombre, descripcion, cantidad, precio, categoria_id } = producto;
  db.query(
    'UPDATE productos SET codigo = ?, nombre = ?, descripcion = ?, cantidad = ?, precio = ?, categoria_id = ? WHERE id = ?',
    [codigo, nombre, descripcion, cantidad, precio, categoria_id, id],
    callback
  );
};

const eliminarProducto = (id, callback) => {
  db.query('DELETE FROM productos WHERE id = ?', [id], callback);
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};

