import React, { useEffect, useState } from "react";
import axios from "axios";
import { alertaError, alertaExito } from "../utils/alertas";

const SalidaForm = ({ obtenerSalidas }) => {
  const [formData, setFormData] = useState({
    producto_id: "",
    usuario_id: "",
    cantidad: "",
    comentario: "",
  });

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const cargarDatos = async () => {
    try {
      const [resProd, resUsu] = await Promise.all([
        axios.get("http://localhost:4000/api/productos"),
        axios.get("http://localhost:4000/api/usuarios"),
      ]);

      setProductos(resProd.data.productos || resProd.data);
      setUsuarios(resUsu.data);
    } catch (error) {
      alertaError("Error", "No se pudieron cargar los datos");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const datos = {
        producto_id: parseInt(formData.producto_id),
        usuario_id: parseInt(formData.usuario_id),
        cantidad: parseInt(formData.cantidad),
        comentario: formData.comentario || "",
      };

      await axios.post("http://localhost:4000/api/salidas", datos);
      alertaExito("Éxito", "Salida registrada correctamente");

      setFormData({
        producto_id: "",
        usuario_id: "",
        cantidad: "",
        comentario: "",
      });

      obtenerSalidas();
    } catch (error) {
      alertaError("Error", error.response?.data?.mensaje || "No se pudo registrar la salida");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded bg-light mt-4">
      <h5 className="mb-3">Registrar Salida</h5>

      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Producto</label>
          <select
            className="form-select"
            name="producto_id"
            value={formData.producto_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un producto</option>
            {productos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Usuario</label>
          <select
            className="form-select"
            name="usuario_id"
            value={formData.usuario_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
            min={1}
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Comentario</label>
          <input
            type="text"
            className="form-control"
            name="comentario"
            value={formData.comentario}
            onChange={handleChange}
            placeholder="Opcional"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-3">
            Guardar Salida
          </button>
        </div>
      </div>
    </form>
  );
};

export default SalidaForm;
