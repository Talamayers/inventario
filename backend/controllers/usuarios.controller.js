const Usuario = require('../models/usuario.model');

exports.getAllUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(results);
  });
};

exports.createUsuario = (req, res) => {
  const nuevoUsuario = req.body;

  if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.rol) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  Usuario.create(nuevoUsuario, (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  });
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const datosUsuario = req.body;

  if (!datosUsuario.nombre || !datosUsuario.email || !datosUsuario.password || !datosUsuario.rol) {
    return res.status(400).json({ error: 'Faltan campos para actualizar' });
  }

  Usuario.update(id, datosUsuario, (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;

  Usuario.delete(id, (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
};
