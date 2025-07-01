const Categoria = require('../models/categorias.model');
const Auditoria = require('../models/auditoria.model');

const obtenerCategorias = (req, res) => {
  Categoria.obtenerCategorias((err, categorias) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener categorías' });
    }
    res.json(categorias);
  });
};

const obtenerCategoriaPorId = (req, res) => {
  const { id } = req.params;
  Categoria.obtenerCategoriaPorId(id, (err, resultados) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener la categoría' });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    res.json(resultados[0]);
  });
};

const crearCategoria = (req, res) => {
  const { nombre, usuario_id } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
  }

  Categoria.crearCategoria({ nombre }, (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }

    // Registrar auditoría
   
    res.status(201).json({ mensaje: 'Categoría creada', id: resultado.insertId });
  });
};

const actualizarCategoria = (req, res) => {
  const { id } = req.params;
  const { nombre, usuario_id } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
  }

  Categoria.actualizarCategoria(id, { nombre }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
    }

    // Registrar auditoría
    

    res.json({ mensaje: 'Categoría actualizada' });
  });
};

const eliminarCategoria = (req, res) => {
  const { id } = req.params;
  const { usuario_id } = req.body;

  Categoria.eliminarCategoria(id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
    }

    // Registrar auditoría
    

    res.json({ mensaje: 'Categoría eliminada' });
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
