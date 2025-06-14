const Salida = require('../models/salidas.model');

exports.getAllSalidas = (req, res) => {
  Salida.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getSalidaById = (req, res) => {
  const id = req.params.id;
  Salida.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Salida no encontrada' });
    res.json(results[0]);
  });
};

exports.createSalida = (req, res) => {
  const data = req.body;
  Salida.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Salida creada', id: result.insertId });
  });
};

exports.updateSalida = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Salida.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Salida actualizada' });
  });
};

exports.deleteSalida = (req, res) => {
  const id = req.params.id;
  Salida.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Salida eliminada' });
  });
};
