const db = require('../config/db');

const registrarSalida = (salida, callback) => {
  const { producto_id, usuario_id, cantidad, comentario } = salida;

  // Primero, verificamos si hay stock suficiente
  const verificarStock = `SELECT stock FROM productos WHERE id = ?`;

  db.query(verificarStock, [producto_id], (err, result) => {
    if (err) return callback(err);
    if (result.length === 0) return callback({ mensaje: 'Producto no encontrado' });

    const stockActual = result[0].stock;
    if (cantidad > stockActual) {
      return callback({ mensaje: 'Stock insuficiente para esta salida' });
    }

    // Registrar la salida
    const insertarSalida = `
      INSERT INTO salidas (producto_id, usuario_id, cantidad, comentario)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertarSalida, [producto_id, usuario_id, cantidad, comentario], (err2, resultado) => {
      if (err2) return callback(err2);

      // Actualizar el stock
      const actualizarStock = `
        UPDATE productos SET stock = stock - ? WHERE id = ?
      `;

      db.query(actualizarStock, [cantidad, producto_id], (err3) => {
        if (err3) return callback(err3);

        callback(null, { salidaId: resultado.insertId });
      });
    });
  });
};

const obtenerSalidas = (callback) => {
  const sql = `
    SELECT s.*, p.nombre AS producto_nombre, u.nombre AS usuario_nombre
    FROM salidas s
    JOIN productos p ON s.producto_id = p.id
    JOIN usuarios u ON s.usuario_id = u.id
    ORDER BY s.fecha DESC
  `;

  db.query(sql, (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

module.exports = {
  registrarSalida,
  obtenerSalidas,
};
