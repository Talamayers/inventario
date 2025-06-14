const db = require('../config/db');

const Auditoria = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM auditoria';
    db.query(sql, callback);
  },

  create: (data, callback) => {
    const sql = 'INSERT INTO auditoria (usuario_id, accion, fecha) VALUES (?, ?, ?)';
    const values = [data.usuario_id, data.accion, data.fecha];
    db.query(sql, values, callback);
  }
};

module.exports = Auditoria;
