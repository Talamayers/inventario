const db = require('../config/db');

const Salida = {
  getAll: (callback) => {
    db.query('SELECT * FROM salidas', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM salidas WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { producto_id, cantidad, fecha, comentario, usuario_id } = data;
    db.query(
      'INSERT INTO salidas (producto_id, cantidad, fecha, comentario, usuario_id) VALUES (?, ?, ?, ?, ?)',
      [producto_id, cantidad, fecha, comentario, usuario_id],
      callback
    );
  },

  update: (id, data, callback) => {
    const { producto_id, cantidad, fecha, comentario, usuario_id } = data;
    db.query(
      'UPDATE salidas SET producto_id = ?, cantidad = ?, fecha = ?, comentario = ?, usuario_id = ? WHERE id = ?',
      [producto_id, cantidad, fecha, comentario, usuario_id, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM salidas WHERE id = ?', [id], callback);
  },
};

module.exports = Salida;
