import React, { useEffect, useState } from "react";
import axios from "axios";
import { alertaError, alertaExito } from "../utils/alertas";

const EntradaForm = ({ obtenerEntradas }) => {
  const [formData, setFormData] = useState({
    producto_id: "",
    proveedor_id: "",
    usuario_id: "",
    cantidad: "",
    comentario: "",
  });

  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Obtener token del localStorage
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const cargarDatos = async () => {
    try {
      const [resProd, resProv, resUsu] = await Promise.all([
        axios.get("http://localhost:4000/api/productos", config),
        axios.get("http://localhost:4000/api/proveedores", config),
        axios.get("http://localhost:4000/api/usuarios", config),
      ]);

      setProductos(resProd.data.productos || resProd.data);
      setProveedores(resProv.data);
      setUsuarios(resUsu.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alertaError("Error", "No se pudieron cargar los datos. Verifica si estás autenticado.");
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

    const datos = {
      ...formData,
      producto_id: parseInt(formData.producto_id),
      proveedor_id: parseInt(formData.proveedor_id),
      usuario_id: parseInt(formData.usuario_id),
      cantidad: parseInt(formData.cantidad),
      comentario: formData.comentario || "",
    };

    try {
      await axios.post("http://localhost:4000/api/entradas", datos, config);
      alertaExito("Éxito", "Entrada registrada correctamente");

      setFormData({
        producto_id: "",
        proveedor_id: "",
        usuario_id: "",
        cantidad: "",
        comentario: "",
      });

      obtenerEntradas();
    } catch (error) {
      console.error("Error al registrar entrada:", error);
      const msg = error.response?.data?.mensaje || "No se pudo registrar la entrada";
      alertaError("Error", msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded bg-light mt-4">
      <h5 className="mb-3">Registrar Entrada</h5>

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
          <label className="form-label">Proveedor</label>
          <select
            className="form-select"
            name="proveedor_id"
            value={formData.proveedor_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nombre}
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

        <div className="col-md-6">
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

        <div className="col-md-6">
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
            Guardar Entrada
          </button>
        </div>
      </div>
    </form>
  );
};

export default EntradaForm;
