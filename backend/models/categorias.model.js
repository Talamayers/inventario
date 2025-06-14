const db = require('../config/db');

const obtenerCategorias = (callback) => {
  db.query('SELECT * FROM categorias', (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

module.exports = {
  obtenerCategorias
};
