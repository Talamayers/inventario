import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductoForm from "../form/ProductoForm";
import {
  alertaExito,
  alertaError,
  alertaConfirmacion
} from "../utils/alertas"; // Asegúrate que la ruta sea correcta

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      alertaError("Error", "No se pudieron obtener los productos");
    }
  };

  const eliminarProducto = async (id) => {
    const confirmado = await alertaConfirmacion(
      "¿Estás seguro?",
      "Esta acción eliminará el producto permanentemente"
    );
    if (confirmado) {
      try {
        await axios.delete(`http://localhost:4000/api/productos/${id}`);
        alertaExito("Eliminado", "Producto eliminado correctamente");
        obtenerProductos();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        const mensaje = error.response?.data?.mensaje || "No se pudo eliminar el producto";
        alertaError("Error", mensaje);
      }
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(valor);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Productos</h2>

      <ProductoForm
        obtenerProductos={obtenerProductos}
        productoEditar={productoEditar}
        setProductoEditar={setProductoEditar}
      />

      <table className="table table-striped mt-5">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{prod.descripcion}</td>
              <td>
                <span className="badge bg-primary">{prod.stock} unidades</span>
              </td>
              <td>
                <span className="badge bg-success">{formatearMoneda(prod.precio)}</span>
              </td>
              <td>{prod.categoria_nombre || "Sin categoría"}</td>
              <td>{prod.proveedor_nombre || "Sin proveedor"}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setProductoEditar(prod)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarProducto(prod.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
