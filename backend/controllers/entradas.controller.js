const Entrada = require('../models/entrada.model');

exports.getAllEntradas = (req, res) => {
  Entrada.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createEntrada = (req, res) => {
  const nuevaEntrada = req.body;
  Entrada.create(nuevaEntrada, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Entrada creada', id: result.insertId });
  });
};

exports.updateEntrada = (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  Entrada.update(id, datos, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Entrada actualizada' });
  });
};

exports.deleteEntrada = (req, res) => {
  const id = req.params.id;
  Entrada.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Entrada eliminada' });
  });
};
