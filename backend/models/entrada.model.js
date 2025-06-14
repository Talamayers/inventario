const db = require('../config/db');

const Entrada = {
  getAll: (callback) => {
    const query = 'SELECT * FROM entradas';
    db.query(query, callback);
  },

  create: (entrada, callback) => {
    const query = `
      INSERT INTO entradas (producto_id, proveedor_id, usuario_id, cantidad, fecha, comentario)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const { producto_id, proveedor_id, usuario_id, cantidad, fecha, comentario } = entrada;
    db.query(query, [producto_id, proveedor_id, usuario_id, cantidad, fecha, comentario], callback);
  },

  update: (id, entrada, callback) => {
    const query = `
      UPDATE entradas
      SET producto_id = ?, proveedor_id = ?, usuario_id = ?, cantidad = ?, fecha = ?, comentario = ?
      WHERE id = ?
    `;
    const { producto_id, proveedor_id, usuario_id, cantidad, fecha, comentario } = entrada;
    db.query(query, [producto_id, proveedor_id, usuario_id, cantidad, fecha, comentario, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM entradas WHERE id = ?', [id], callback);
  }
};

module.exports = Entrada;
