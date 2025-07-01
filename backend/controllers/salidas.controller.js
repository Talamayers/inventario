const Salida = require('../models/salidas.model');
const Auditoria = require('../models/auditoria.model');

// Registrar una nueva salida
const registrarSalida = (req, res) => {
  const { producto_id, usuario_id, cantidad, comentario } = req.body;

  if (!producto_id || !usuario_id || !cantidad || isNaN(cantidad)) {
    return res.status(400).json({ mensaje: 'Datos incompletos o inválidos' });
  }

  const salida = {
    producto_id: parseInt(producto_id),
    usuario_id: parseInt(usuario_id),
    cantidad: parseInt(cantidad),
    comentario: comentario || '',
  };

  Salida.registrarSalida(salida, (err, resultado) => {
    if (err) {
      console.error('Error al registrar salida:', err);
      const mensaje = err.mensaje || 'Error al registrar la salida';
      return res.status(500).json({ mensaje });
    }

    // Registrar en auditoría
    

    res.status(201).json({ mensaje: 'Salida registrada', id: resultado.salidaId });
  });
};

// Obtener todas las salidas
const obtenerSalidas = (req, res) => {
  Salida.obtenerSalidas((err, salidas) => {
    if (err) {
      console.error('Error al obtener salidas:', err);
      return res.status(500).json({ mensaje: 'Error al obtener las salidas' });
    }

    res.json(salidas);
  });
};

module.exports = {
  registrarSalida,
  obtenerSalidas,
};
