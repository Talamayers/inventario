const Auditoria = require('../models/auditoria.model');

exports.getAllAuditoria = (req, res) => {
  Auditoria.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener auditoría' });
    }
    res.json(results);
  });
};

exports.createAuditoria = (req, res) => {
  const data = req.body;

  if (!data.usuario_id || !data.accion || !data.fecha) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  Auditoria.create(data, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar en auditoría' });
    }
    res.json({ message: 'Auditoría registrada exitosamente' });
  });
};
