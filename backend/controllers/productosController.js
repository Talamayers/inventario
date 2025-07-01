const productosModel = require('../models/productos.model'); 
const Auditoria = require('../models/auditoria.model');

const obtenerProductos = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const offset = (page - 1) * limit;

  productosModel.obtenerProductosFiltrados(search, limit, offset, (err, productos) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener productos' });

    productosModel.contarProductosTotales((err, total) => {
      if (err) return res.status(500).json({ mensaje: 'Error al contar productos' });

      res.json({
        productos,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    });
  });
};

const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  productosModel.obtenerProductoPorId(id, (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener producto' });
    if (results.length === 0) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(results[0]);
  });
};

const crearProducto = (req, res) => {
  const { nombre, descripcion, stock, precio, categoria_id, proveedor_id, usuario_id } = req.body;

  if (!nombre || stock === undefined || isNaN(stock) || precio === undefined || isNaN(precio) || !categoria_id || !proveedor_id) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos o inválidos' });
  }

  const producto = { nombre, descripcion, stock, precio, categoria_id, proveedor_id };

  productosModel.crearProducto(producto, (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al crear producto' });

    // 🔥 AUDITORÍA CORREGIDA - Solo 3 parámetros según tu estructura DB
    

    res.status(201).json({ mensaje: 'Producto creado', id: results.insertId });
  });
};

const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, stock, precio, categoria_id, proveedor_id, usuario_id } = req.body;

  if (!nombre || stock === undefined || isNaN(stock) || precio === undefined || isNaN(precio) || !categoria_id || !proveedor_id) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos o inválidos' });
  }

  const producto = { nombre, descripcion, stock, precio, categoria_id, proveedor_id };

  productosModel.actualizarProducto(id, producto, (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al actualizar producto' });

    // 🔥 AUDITORÍA CORREGIDA - Solo 3 parámetros según tu estructura DB
   

    res.json({ mensaje: 'Producto actualizado' });
  });
};

const eliminarProducto = (req, res) => {
  const { id } = req.params;
  const { usuario_id } = req.body;

  productosModel.eliminarProducto(id, (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar producto' });

    // 🔥 AUDITORÍA CORREGIDA - Solo 3 parámetros según tu estructura DB
    if (usuario_id) {
      Auditoria.registrarAuditoria(
        usuario_id,
        `Eliminar Producto (ID: ${id})`,  // Acción descriptiva
        (errAud) => {
          if (errAud) console.error('❌ Error en auditoría:', errAud);
          else console.log('✅ Auditoría registrada: Eliminar producto');
        }
      );
    }

    res.json({ mensaje: 'Producto eliminado' });
  });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};