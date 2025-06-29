import React, { useEffect, useState } from "react";
import axios from "axios";
import { alertaError } from "../utils/alertas";

const Auditoria = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [busquedaUsuario, setBusquedaUsuario] = useState("");
  const [filtroAccion, setFiltroAccion] = useState("");

  const obtenerAuditorias = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auditoria");
      const ordenadas = res.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setAuditorias(ordenadas);
    } catch (error) {
      alertaError("Error", "No se pudo cargar la auditoría");
    }
  };

  useEffect(() => {
    obtenerAuditorias();
  }, []);

  const filtrarAuditorias = () => {
    return auditorias.filter((item) => {
      const usuarioCoincide = item.usuario_nombre?.toLowerCase().includes(busquedaUsuario.toLowerCase());
      const accionCoincide = filtroAccion ? item.accion === filtroAccion : true;
      return usuarioCoincide && accionCoincide;
    });
  };

  return (
    <div className="container mt-4">
      <h2>Historial de Auditoría</h2>

      <div className="row my-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre de usuario"
            value={busquedaUsuario}
            onChange={(e) => setBusquedaUsuario(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={filtroAccion}
            onChange={(e) => setFiltroAccion(e.target.value)}
          >
            <option value="">Todas las acciones</option>
            <option value="crear">Crear</option>
            <option value="actualizar">Actualizar</option>
            <option value="eliminar">Eliminar</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filtrarAuditorias().length > 0 ? (
            filtrarAuditorias().map((item) => (
              <tr key={item.id}>
                <td>{item.usuario_nombre}</td>
                <td className="text-capitalize">{item.accion}</td>
                <td>{new Date(item.fecha).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No hay registros que coincidan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Auditoria;
