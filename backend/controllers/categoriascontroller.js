const Categoria = require('../models/categorias.model');

const obtenerCategorias = (req, res) => {
  Categoria.obtenerCategorias((err, categorias) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener categorías' });
    }
    res.json(categorias);
  });
};

module.exports = {
  obtenerCategorias
};
