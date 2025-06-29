const Entrada = require('../models/entrada.model');
const Auditoria = require('../models/auditoria.model');

// Registrar nueva entrada
const registrarEntrada = (req, res) => {
  const { producto_id, proveedor_id, cantidad, comentario, usuario_id } = req.body;

  if (!producto_id || !proveedor_id || !cantidad || !usuario_id || isNaN(cantidad)) {
    return res.status(400).json({ mensaje: 'Datos incompletos o inválidos' });
  }

  const entrada = {
    producto_id,
    proveedor_id,
    cantidad: parseInt(cantidad),
    comentario: comentario || '',
    usuario_id,
  };

  Entrada.registrarEntrada(entrada, (err, resultado) => {
    if (err) {
      console.error('Error al registrar entrada:', err);
      return res.status(500).json({ mensaje: 'Error al registrar entrada' });
    }

    // Registrar en auditoría
    Auditoria.registrarAuditoria(
      usuario_id,
      'REGISTRAR_ENTRADA',
      `Entrada de ${entrada.cantidad} unidades para el producto ID ${producto_id}`,
      (errAud) => {
        if (errAud) {
          console.error('Error al registrar en auditoría:', errAud);
        }
      }
    );

    res.status(201).json({ mensaje: 'Entrada registrada', id: resultado.entradaId });
  });
};

// Obtener todas las entradas
const obtenerEntradas = (req, res) => {
  Entrada.obtenerEntradas((err, entradas) => {
    if (err) {
      console.error('Error al obtener entradas:', err);
      return res.status(500).json({ mensaje: 'Error al obtener entradas' });
    }
    res.json(entradas);
  });
};

module.exports = {
  registrarEntrada,
  obtenerEntradas
};
