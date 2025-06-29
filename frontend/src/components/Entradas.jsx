import React, { useEffect, useState } from "react";
import axios from "axios";
import EntradaForm from "../form/EntradaForm";
import { alertaError } from "../utils/alertas";

const Entradas = () => {
  const [entradas, setEntradas] = useState([]);

  const obtenerEntradas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/entradas");
      setEntradas(res.data);
    } catch (error) {
      alertaError("Error", "No se pudieron obtener las entradas");
    }
  };

  useEffect(() => {
    obtenerEntradas();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Entradas</h2>

      <EntradaForm obtenerEntradas={obtenerEntradas} />

      <h5 className="mt-4">Entradas Registradas</h5>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Proveedor</th>
            <th>Usuario</th>
            <th>Cantidad</th>
            <th>Comentario</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {entradas.length > 0 ? (
            entradas.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.producto_nombre}</td>
                <td>{entrada.proveedor_nombre}</td>
                <td>{entrada.usuario_nombre}</td>
                <td>{entrada.cantidad}</td>
                <td>{entrada.comentario || "-"}</td>
                <td>{new Date(entrada.fecha).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay entradas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Entradas;
