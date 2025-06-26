import React, { useEffect, useState } from "react";
import axios from "axios";
import { alertaExito, alertaError } from "../utils/alertas"; // Asegúrate que esta ruta sea correcta

const ProductoForm = ({ obtenerProductos, productoEditar, setProductoEditar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    stock: 0,
    precio: 0,
    categoria_id: "",
    proveedor_id: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      alertaError("Error", "No se pudieron cargar las categorías");
    }
  };

  const obtenerProveedores = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/proveedores");
      setProveedores(res.data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      alertaError("Error", "No se pudieron cargar los proveedores");
    }
  };

  useEffect(() => {
    obtenerCategorias();
    obtenerProveedores();
  }, []);

  useEffect(() => {
    if (productoEditar) {
      setFormData(productoEditar);
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertimos datos numéricos antes de enviar
    const datos = {
      ...formData,
      stock: parseInt(formData.stock),
      precio: parseFloat(formData.precio),
      categoria_id: parseInt(formData.categoria_id),
      proveedor_id: parseInt(formData.proveedor_id),
    };

    try {
      if (productoEditar) {
        await axios.put(`http://localhost:4000/api/productos/${formData.id}`, datos);
        alertaExito("Actualizado", "Producto actualizado correctamente");
      } else {
        await axios.post("http://localhost:4000/api/productos", datos);
        alertaExito("Creado", "Producto registrado correctamente");
      }

      // Limpiar el formulario
      setFormData({
        nombre: "",
        descripcion: "",
        stock: 0,
        precio: 0,
        categoria_id: "",
        proveedor_id: "",
      });
      setProductoEditar(null);
      obtenerProductos();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      const mensaje = error.response?.data?.mensaje || "No se pudo guardar el producto";
      alertaError("Error", mensaje);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="form-control"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            className="form-control"
            value={formData.precio}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div className="col-md-6">
          <select
            name="categoria_id"
            className="form-select"
            value={formData.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            name="proveedor_id"
            className="form-select"
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
        <div className="col-12">
          <button type="submit" className="btn btn-success">
            {productoEditar ? "Actualizar Producto" : "Crear Producto"}
          </button>
          {productoEditar && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setProductoEditar(null);
                setFormData({
                  nombre: "",
                  descripcion: "",
                  stock: 0,
                  precio: 0,
                  categoria_id: "",
                  proveedor_id: "",
                });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProductoForm;
