const Usuario = require('../models/usuario.model');

exports.getAllUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    } else {
      res.json(results);
    }
  });
};

exports.createUsuario = (req, res) => {
  const nuevoUsuario = req.body;
  Usuario.create(nuevoUsuario, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    } else {
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
  });
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const datosUsuario = req.body;
  Usuario.update(id, datosUsuario, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    } else {
      res.json({ message: 'Usuario actualizado correctamente' });
    }
  });
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  Usuario.delete(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    } else {
      res.json({ message: 'Usuario eliminado correctamente' });
    }
  });
};
