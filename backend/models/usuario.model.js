const db = require('../config/db');

const Usuario = {
  getAll: (callback) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, callback);
  },

  create: (usuario, callback) => {
    const query = 'INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_creacion) VALUES (?, ?, ?, ?, ?)';
    const values = [usuario.nombre, usuario.email, usuario.contraseña, usuario.rol, usuario.fecha_creacion];
    db.query(query, values, callback);
  },

  update: (id, usuario, callback) => {
    const query = 'UPDATE usuarios SET nombre = ?, email = ?, contraseña = ?, rol = ? WHERE id = ?';
    const values = [usuario.nombre, usuario.email, usuario.contraseña, usuario.rol, id];
    db.query(query, values, callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Usuario;
