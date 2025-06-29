import React, { useEffect, useState } from "react";
import axios from "axios";
import { alertaExito, alertaError } from "../utils/alertas";

const CategoriaForm = ({ obtenerCategorias, categoriaEditar, setCategoriaEditar }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (categoriaEditar) {
      setNombre(categoriaEditar.nombre);
    } else {
      setNombre("");
    }
  }, [categoriaEditar]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alertaError("Error", "El nombre es obligatorio");
      return;
    }

    try {
      if (categoriaEditar) {
        await axios.put(`http://localhost:4000/api/categorias/${categoriaEditar.id}`, {
          nombre,
        });
        alertaExito("Actualizado", "Categoría actualizada correctamente");
      } else {
        await axios.post("http://localhost:4000/api/categorias", { nombre });
        alertaExito("Creado", "Categoría creada correctamente");
      }

      setNombre("");
      setCategoriaEditar(null);
      obtenerCategorias();
    } catch (error) {
      console.error("Error al guardar categoría:", error);
      const mensaje = error.response?.data?.mensaje || "No se pudo guardar";
      alertaError("Error", mensaje);
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          {categoriaEditar ? "Actualizar" : "Crear"}
        </button>
        {categoriaEditar && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setNombre("");
              setCategoriaEditar(null);
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoriaForm;
