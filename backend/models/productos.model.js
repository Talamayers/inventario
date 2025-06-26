const db = require('../config/db');

const obtenerProductos = (callback) => {
  db.query(
    `SELECT 
      p.*, 
      c.nombre AS categoria_nombre, 
      pr.nombre AS proveedor_nombre
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN proveedores pr ON p.proveedor_id = pr.id`,
    callback
  );
};

const obtenerProductoPorId = (id, callback) => {
  db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
};

const crearProducto = (producto, callback) => {
  const { nombre, descripcion, stock, precio, categoria_id, proveedor_id } = producto;
  db.query(
    'INSERT INTO productos (nombre, descripcion, stock, precio, categoria_id, proveedor_id) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, stock, precio, categoria_id, proveedor_id],
    callback
  );
};

const actualizarProducto = (id, producto, callback) => {
  const { nombre, descripcion, stock, precio, categoria_id, proveedor_id } = producto;
  db.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, stock = ?, precio = ?, categoria_id = ?, proveedor_id = ? WHERE id = ?',
    [nombre, descripcion, stock, precio, categoria_id, proveedor_id, id],
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

