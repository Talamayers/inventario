const Proveedor = require('../models/proveedores.model');
const Auditoria = require('../models/auditoria.model');

const obtenerProveedores = (req, res) => {
  Proveedor.obtenerProveedores((err, proveedores) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener proveedores' });
    }
    res.json(proveedores);
  });
};

const obtenerProveedorPorId = (req, res) => {
  const { id } = req.params;
  Proveedor.obtenerProveedorPorId(id, (err, resultados) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener proveedor' });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json(resultados[0]);
  });
};

const crearProveedor = (req, res) => {
  const { nombre, usuario_id } = req.body;
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
  }

  Proveedor.crearProveedor({ nombre }, (err, resultado) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al crear proveedor' });
    }

    // Auditoría
    if (usuario_id) {
      Auditoria.registrarAuditoria(
        usuario_id,
        'CREAR_PROVEEDOR',
        `Se creó el proveedor "${nombre}"`,
        (errAud) => {
          if (errAud) console.error('Error al guardar en auditoría:', errAud);
        }
      );
    }

    res.status(201).json({ mensaje: 'Proveedor creado', id: resultado.insertId });
  });
};

const actualizarProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre, usuario_id } = req.body;
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
  }

  Proveedor.actualizarProveedor(id, { nombre }, (err) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al actualizar proveedor' });
    }

    if (usuario_id) {
      Auditoria.registrarAuditoria(
        usuario_id,
        'ACTUALIZAR_PROVEEDOR',
        `Se actualizó el proveedor con ID ${id} a "${nombre}"`,
        (errAud) => {
          if (errAud) console.error('Error al guardar en auditoría:', errAud);
        }
      );
    }

    res.json({ mensaje: 'Proveedor actualizado' });
  });
};

const eliminarProveedor = (req, res) => {
  const { id } = req.params;
  const { usuario_id } = req.body;

  Proveedor.eliminarProveedor(id, (err) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al eliminar proveedor' });
    }

    if (usuario_id) {
      Auditoria.registrarAuditoria(
        usuario_id,
        'ELIMINAR_PROVEEDOR',
        `Se eliminó el proveedor con ID ${id}`,
        (errAud) => {
          if (errAud) console.error('Error al guardar en auditoría:', errAud);
        }
      );
    }

    res.json({ mensaje: 'Proveedor eliminado' });
  });
};

module.exports = {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
};
