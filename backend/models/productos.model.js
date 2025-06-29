const db = require('../config/db');

// Obtener productos con búsqueda y paginación
const obtenerProductosFiltrados = (search, limit, offset, callback) => {
  const sql = `
    SELECT p.*, c.nombre AS categoria_nombre, pr.nombre AS proveedor_nombre
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    JOIN proveedores pr ON p.proveedor_id = pr.id
    WHERE p.nombre LIKE ?
    LIMIT ? OFFSET ?
  `;
  db.query(sql, [`%${search}%`, limit, offset], callback);
};

// Contar total de productos (sin filtros)
const contarProductosTotales = (callback) => {
  const sql = 'SELECT COUNT(*) AS total FROM productos';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].total);
  });
};

const obtenerProductoPorId = (id, callback) => {
  db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
};

const crearProducto = (producto, callback) => {
  db.query('INSERT INTO productos SET ?', [producto], callback);
};

const actualizarProducto = (id, producto, callback) => {
  db.query('UPDATE productos SET ? WHERE id = ?', [producto, id], callback);
};

const eliminarProducto = (id, callback) => {
  db.query('DELETE FROM productos WHERE id = ?', [id], callback);
};

module.exports = {
  obtenerProductosFiltrados,
  contarProductosTotales,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
