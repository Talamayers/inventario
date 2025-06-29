import React, { useEffect, useState } from "react";
import axios from "axios";
import { alertaExito, alertaError } from "../utils/alertas";

const ProveedorForm = ({ obtenerProveedores, proveedorEditar, setProveedorEditar }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (proveedorEditar) {
      setNombre(proveedorEditar.nombre || "");
    } else {
      setNombre("");
    }
  }, [proveedorEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alertaError("Error", "El nombre es obligatorio");
      return;
    }

    try {
      if (proveedorEditar) {
        await axios.put(`http://localhost:4000/api/proveedores/${proveedorEditar.id}`, { nombre });
        alertaExito("Actualizado", "Proveedor actualizado correctamente");
      } else {
        await axios.post("http://localhost:4000/api/proveedores", { nombre });
        alertaExito("Creado", "Proveedor creado correctamente");
      }

      obtenerProveedores();
      setNombre("");
      setProveedorEditar(null);
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
      alertaError("Error", "No se pudo guardar el proveedor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Nombre del proveedor</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {proveedorEditar ? "Actualizar" : "Crear"}
      </button>
      {proveedorEditar && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => {
            setProveedorEditar(null);
            setNombre("");
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ProveedorForm;
