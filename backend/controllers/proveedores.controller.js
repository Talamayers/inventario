const Proveedor = require('../models/proveedores.model');

const obtenerProveedores = (req, res) => {
  Proveedor.obtenerProveedores((err, proveedores) => {
    if (err) {
      console.error("Error al obtener proveedores:", err);
      return res.status(500).json({ mensaje: 'Error al obtener proveedores' });
    }
    res.json(proveedores);
  });
};

const obtenerProveedorPorId = (req, res) => {
  const { id } = req.params;
  Proveedor.obtenerProveedorPorId(id, (err, resultados) => {
    if (err) {
      console.error("Error al obtener proveedor:", err);
      return res.status(500).json({ mensaje: 'Error al obtener proveedor' });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json(resultados[0]);
  });
};

const crearProveedor = (req, res) => {
  const { nombre } = req.body;
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
  }

  Proveedor.crearProveedor({ nombre }, (err, resultado) => {
    if (err) {
      console.error("Error al crear proveedor:", err);
      return res.status(500).json({ mensaje: 'Error al crear proveedor' });
    }

    res.status(201).json({ mensaje: 'Proveedor creado', id: resultado.insertId });
  });
};

const actualizarProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
  }

  Proveedor.actualizarProveedor(id, { nombre }, (err) => {
    if (err) {
      console.error("Error al actualizar proveedor:", err);
      return res.status(500).json({ mensaje: 'Error al actualizar proveedor' });
    }

    res.json({ mensaje: 'Proveedor actualizado' });
  });
};

const eliminarProveedor = (req, res) => {
  const { id } = req.params;

  Proveedor.eliminarProveedor(id, (err) => {
    if (err) {
      console.error("Error al eliminar proveedor:", err);
      return res.status(500).json({ mensaje: 'Error al eliminar proveedor' });
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
