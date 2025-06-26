import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioForm from './UsuarioForm';
import {
  alertaInfo,
  alertaExito,
  alertaError,
  alertaConfirmacion
} from '../utils/alertas';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState('crear'); // 'crear' o 'editar'
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      alertaError('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const manejarAgregar = () => {
    setModoFormulario('crear');
    setUsuarioSeleccionado(null);
    setMostrarFormulario(true);
  };

  const manejarEditar = (usuario) => {
    setModoFormulario('editar');
    setUsuarioSeleccionado(usuario);
    setMostrarFormulario(true);
  };

  const manejarCancelar = () => {
    setMostrarFormulario(false);
    setUsuarioSeleccionado(null);
  };

  const manejarGuardar = async (datos) => {
    try {
      const token = localStorage.getItem('token');
      if (modoFormulario === 'crear') {
        await axios.post('http://localhost:4000/api/usuarios', datos, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertaExito('Usuario creado', 'Se agregó correctamente');
      } else if (modoFormulario === 'editar') {
        await axios.put(
          `http://localhost:4000/api/usuarios/${usuarioSeleccionado.id}`,
          datos,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alertaExito('Usuario actualizado', 'Se actualizó correctamente');
      }

      setMostrarFormulario(false);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      alertaError('Error', 'No se pudo guardar el usuario');
    }
  };

  const manejarEliminar = async (id) => {
    const confirmado = await alertaConfirmacion(
      '¿Estás seguro?',
      'Esta acción eliminará al usuario permanentemente.'
    );

    if (!confirmado) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alertaExito('Eliminado', 'Usuario eliminado correctamente');
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alertaError('Error', 'No se pudo eliminar el usuario');
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="container">
      <h2 className="my-4">Gestión de Usuarios</h2>

      {!mostrarFormulario && (
        <>
          <div className="mb-3">
            <button className="btn btn-success" onClick={manejarAgregar}>
              ➕ Agregar Usuario
            </button>
          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => manejarEditar(u)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => manejarEliminar(u.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {mostrarFormulario && (
        <UsuarioForm
          modo={modoFormulario}
          usuarioInicial={usuarioSeleccionado}
          onGuardar={manejarGuardar}
          onCancelar={manejarCancelar}
        />
      )}
    </div>
  );
};

export default Usuarios;
