import React, { useEffect, useState } from "react";
import axios from "axios";
import SalidaForm from "../form/SalidaForm";
import { alertaError } from "../utils/alertas";

const Salidas = () => {
  const [salidas, setSalidas] = useState([]);

  const obtenerSalidas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/salidas");
      setSalidas(res.data);
    } catch (error) {
      alertaError("Error", "No se pudieron obtener las salidas");
    }
  };

  useEffect(() => {
    obtenerSalidas();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Salidas</h2>

      <SalidaForm obtenerSalidas={obtenerSalidas} />

      <h5 className="mt-4">Salidas Registradas</h5>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Usuario</th>
            <th>Cantidad</th>
            <th>Comentario</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {salidas.length > 0 ? (
            salidas.map((salida) => (
              <tr key={salida.id}>
                <td>{salida.producto_nombre}</td>
                <td>{salida.usuario_nombre}</td>
                <td>{salida.cantidad}</td>
                <td>{salida.comentario || "-"}</td>
                <td>{new Date(salida.fecha).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No hay salidas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Salidas;
