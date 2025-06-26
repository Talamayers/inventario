const db = require('../config/db');

const Usuario = {
  getAll: (callback) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, callback);
  },

  create: (usuario, callback) => {
    const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
    const values = [usuario.nombre, usuario.email, usuario.password, usuario.rol];
    db.query(query, values, callback);
  },

  update: (id, usuario, callback) => {
    const query = 'UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ? WHERE id = ?';
    const values = [usuario.nombre, usuario.email, usuario.password, usuario.rol, id];
    db.query(query, values, callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Usuario;
