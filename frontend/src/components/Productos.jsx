import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductoForm from "../form/ProductoForm";
import {
  alertaExito,
  alertaError,
  alertaConfirmacion
} from "../utils/alertas";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const limitePorPagina = 10;

  const obtenerProductos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/productos", {
        params: {
          page: pagina,
          limit: limitePorPagina,
          search: busqueda
        }
      });

      const {
        productos: data = [],
        total = 0,
        page: paginaBackend = pagina,
        totalPages = 1
      } = res.data;


      setProductos(Array.isArray(data) ? data : []);
      setTotalRegistros(total);
      setTotalPaginas(totalPages);
      setPagina(paginaBackend);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      alertaError("Error", "No se pudieron obtener los productos");
      setProductos([]);
      setTotalRegistros(0);
      setTotalPaginas(1);
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
  }, [pagina, busqueda]);

  const formatearMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(valor);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Productos</h2>

      <ProductoForm
        obtenerProductos={obtenerProductos}
        productoEditar={productoEditar}
        setProductoEditar={setProductoEditar}
      />

      {/* Contador de productos */}
 

      {/* Buscador debajo del contador */}
      <div className="mb-3 mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre de producto"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPagina(1);
          }}
        />
      </div>

      <table className="table table-striped mt-3">
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
          {productos.length > 0 ? (
            productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.nombre}</td>
                <td>{prod.descripcion}</td>
                <td>
                  <span className="badge bg-primary">{prod.stock} unidades</span>
                </td>
                <td>
                  <span className="badge bg-success">
                    {formatearMoneda(prod.precio)}
                  </span>
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
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No hay productos en esta página.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={pagina === 1}
          onClick={() => cambiarPagina(pagina - 1)}
        >
          Anterior
        </button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={pagina === totalPaginas}
          onClick={() => cambiarPagina(pagina + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Productos;
