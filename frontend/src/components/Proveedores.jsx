// src/components/Proveedores.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProveedorForm from "../form/ProveedorForm";
import {
  alertaExito,
  alertaError,
  alertaConfirmacion,
} from "../utils/alertas";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorEditar, setProveedorEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const obtenerProveedores = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/proveedores");
      const data = res.data || [];
      const filtrados = data.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setProveedores(filtrados);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      alertaError("Error", "No se pudieron obtener los proveedores");
    }
  };

  const eliminarProveedor = async (id) => {
    const confirmado = await alertaConfirmacion(
      "¿Estás seguro?",
      "Esta acción eliminará el proveedor permanentemente"
    );
    if (confirmado) {
      try {
        await axios.delete(`http://localhost:4000/api/proveedores/${id}`);
        alertaExito("Eliminado", "Proveedor eliminado correctamente");
        obtenerProveedores();
      } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        const mensaje =
          error.response?.data?.mensaje || "No se pudo eliminar el proveedor";
        alertaError("Error", mensaje);
      }
    }
  };

  useEffect(() => {
    obtenerProveedores();
  }, [busqueda]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Proveedores</h2>

      <ProveedorForm
        obtenerProveedores={obtenerProveedores}
        proveedorEditar={proveedorEditar}
        setProveedorEditar={setProveedorEditar}
      />

      <p className="fw-bold">Total de proveedores: {proveedores.length}</p>

      <div className="mb-3 mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre de proveedor"
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
          {proveedores.length > 0 ? (
            proveedores.map((prov) => (
              <tr key={prov.id}>
                <td>{prov.nombre}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setProveedorEditar(prov)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarProveedor(prov.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No se encontraron proveedores.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Proveedores;
