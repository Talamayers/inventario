const db = require('../config/db');

// Obtener todos los proveedores
exports.getAll = (callback) => {
  db.query('SELECT * FROM proveedores', callback);
};

// Crear proveedor
exports.create = (data, callback) => {
  const { nombre, telefono, email, direccion } = data;
  db.query(
    'INSERT INTO proveedores (nombre, telefono, email, direccion) VALUES (?, ?, ?, ?)',
    [nombre, telefono, email, direccion],
    callback
  );
};

// Actualizar proveedor
exports.update = (id, data, callback) => {
  const { nombre, telefono, email, direccion } = data;
  db.query(
    'UPDATE proveedores SET nombre = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?',
    [nombre, telefono, email, direccion, id],
    callback
  );
};

// Eliminar proveedor
exports.delete = (id, callback) => {
  db.query('DELETE FROM proveedores WHERE id = ?', [id], callback);
};
