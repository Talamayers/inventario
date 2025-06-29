const db = require('../config/db');

const obtenerCategorias = (callback) => {
  db.query('SELECT * FROM categorias', (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const obtenerCategoriaPorId = (id, callback) => {
  const sql = 'SELECT * FROM categorias WHERE id = ?';
  db.query(sql, [id], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const crearCategoria = (categoria, callback) => {
  const sql = 'INSERT INTO categorias SET ?';
  db.query(sql, categoria, (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const actualizarCategoria = (id, categoria, callback) => {
  const sql = 'UPDATE categorias SET ? WHERE id = ?';
  db.query(sql, [categoria, id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const eliminarCategoria = (id, callback) => {
  const sql = 'DELETE FROM categorias WHERE id = ?';
  db.query(sql, [id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};

