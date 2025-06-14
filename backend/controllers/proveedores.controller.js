const Proveedor = require('../models/proveedores.model');

// Obtener todos los proveedores
exports.getAllProveedores = (req, res) => {
  Proveedor.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener proveedores' });
    res.json(results);
  });
};

// Crear proveedor
exports.createProveedor = (req, res) => {
  Proveedor.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar proveedor' });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// Actualizar proveedor
exports.updateProveedor = (req, res) => {
  Proveedor.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar proveedor' });
    res.json({ id: req.params.id, ...req.body });
  });
};

// Eliminar proveedor
exports.deleteProveedor = (req, res) => {
  Proveedor.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar proveedor' });
    res.json({ mensaje: 'Proveedor eliminado' });
  });
};
