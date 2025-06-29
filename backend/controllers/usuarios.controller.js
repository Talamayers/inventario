const Usuario = require('../models/usuario.model');
const Auditoria = require('../models/auditoria.model');

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

  if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.rol || !nuevoUsuario.usuario_id) {
    return res.status(400).json({ error: 'Faltan campos obligatorios o el usuario_id' });
  }

  Usuario.create(nuevoUsuario, (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }

    // Auditoría
    Auditoria.registrarAuditoria(
      nuevoUsuario.usuario_id,
      'CREAR',
      `Se creó el usuario con email: ${nuevoUsuario.email}`,
      (errAud) => {
        if (errAud) console.error('Error en auditoría:', errAud);
      }
    );

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  });
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const datosUsuario = req.body;

  if (!datosUsuario.nombre || !datosUsuario.email || !datosUsuario.password || !datosUsuario.rol || !datosUsuario.usuario_id) {
    return res.status(400).json({ error: 'Faltan campos para actualizar o el usuario_id' });
  }

  Usuario.update(id, datosUsuario, (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }

    // Auditoría
    Auditoria.registrarAuditoria(
      datosUsuario.usuario_id,
      'ACTUALIZAR',
      `Se actualizó el usuario con ID: ${id}`,
      (errAud) => {
        if (errAud) console.error('Error en auditoría:', errAud);
      }
    );

    res.json({ message: 'Usuario actualizado correctamente' });
  });
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  const { usuario_id } = req.body;

  if (!usuario_id) {
    return res.status(400).json({ error: 'usuario_id es requerido para registrar la auditoría' });
  }

  Usuario.delete(id, (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }

    // Auditoría
    Auditoria.registrarAuditoria(
      usuario_id,
      'ELIMINAR',
      `Se eliminó el usuario con ID: ${id}`,
      (errAud) => {
        if (errAud) console.error('Error en auditoría:', errAud);
      }
    );

    res.json({ message: 'Usuario eliminado correctamente' });
  });
};
