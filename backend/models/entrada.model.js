const db = require('../config/db');

// Registrar nueva entrada y actualizar stock
const registrarEntrada = (entrada, callback) => {
  const { producto_id, proveedor_id, cantidad, comentario, usuario_id } = entrada;

  const insertEntrada = `
    INSERT INTO entradas (producto_id, proveedor_id, cantidad, comentario, usuario_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertEntrada, [producto_id, proveedor_id, cantidad, comentario, usuario_id], (err, result) => {
    if (err) return callback(err);

    const actualizarStock = `
      UPDATE productos SET stock = stock + ? WHERE id = ?
    `;

    db.query(actualizarStock, [cantidad, producto_id], (err2) => {
      if (err2) return callback(err2);
      callback(null, { entradaId: result.insertId });
    });
  });
};

// Obtener todas las entradas con JOIN a producto, proveedor y usuario
const obtenerEntradas = (callback) => {
  const sql = `
    SELECT e.*, 
           p.nombre AS producto_nombre, 
           pr.nombre AS proveedor_nombre,
           u.nombre AS usuario_nombre
    FROM entradas e
    JOIN productos p ON e.producto_id = p.id
    JOIN proveedores pr ON e.proveedor_id = pr.id
    JOIN usuarios u ON e.usuario_id = u.id
    ORDER BY e.fecha DESC
  `;
  db.query(sql, (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

module.exports = {
  registrarEntrada,
  obtenerEntradas
};
