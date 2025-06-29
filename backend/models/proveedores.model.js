const db = require('../config/db');

const obtenerProveedores = (callback) => {
  db.query('SELECT * FROM proveedores', (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const obtenerProveedorPorId = (id, callback) => {
  db.query('SELECT * FROM proveedores WHERE id = ?', [id], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const crearProveedor = (proveedor, callback) => {
  db.query('INSERT INTO proveedores SET ?', proveedor, (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const actualizarProveedor = (id, proveedor, callback) => {
  db.query('UPDATE proveedores SET ? WHERE id = ?', [proveedor, id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const eliminarProveedor = (id, callback) => {
  db.query('DELETE FROM proveedores WHERE id = ?', [id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

module.exports = {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
};
