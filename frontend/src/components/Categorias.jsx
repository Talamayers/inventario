// src/components/Categorias.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoriaForm from "../form/CategoriaForm";
import {
  alertaExito,
  alertaError,
  alertaConfirmacion
} from "../utils/alertas";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditar, setCategoriaEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/categorias");
      const data = res.data || [];
      const resultado = data.filter((cat) =>
        cat.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setCategorias(resultado);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      alertaError("Error", "No se pudieron obtener las categorías");
      setCategorias([]);
    }
  };

  const eliminarCategoria = async (id) => {
    const confirmado = await alertaConfirmacion(
      "¿Estás seguro?",
      "Esta acción eliminará la categoría"
    );
    if (confirmado) {
      try {
        await axios.delete(`http://localhost:4000/api/categorias/${id}`);
        alertaExito("Eliminado", "Categoría eliminada correctamente");
        obtenerCategorias();
      } catch (error) {
        console.error("Error al eliminar categoría:", error);
        const mensaje = error.response?.data?.mensaje || "No se pudo eliminar";
        alertaError("Error", mensaje);
      }
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, [busqueda]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Categorías</h2>

      <CategoriaForm
        obtenerCategorias={obtenerCategorias}
        categoriaEditar={categoriaEditar}
        setCategoriaEditar={setCategoriaEditar}
      />

      <div className="mb-3 mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <table className="table table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length > 0 ? (
            categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.nombre}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setCategoriaEditar(cat)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarCategoria(cat.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No hay categorías
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categorias;

