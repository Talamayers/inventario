import React, { useState, useEffect } from 'react';
import {
  FaBox,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaWarehouse,
  FaArrowRight,
  FaTags,
  FaSearch,
  FaHome
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from '../components/Inicio';
import Productos from '../components/Productos';
import Proveedores from '../components/Proveedores';
import Entradas from '../components/Entradas';
import Salidas from '../components/Salidas';
import Categorias from '../components/Categorias';
import Usuarios from '../components/Usuarios';
import Auditoria from '../components/Auditoria';

const Menu = () => {
  const [rol, setRol] = useState(null);
  const [usuario, setUsuario] = useState('');
  const [contenido, setContenido] = useState('inicio');
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const storedRol = localStorage.getItem('rol');
    const storedUsuario = localStorage.getItem('usuario');
    setRol(storedRol || 'empleado');
    setUsuario(storedUsuario || '');
  }, []);

  const opciones = [
    { nombre: 'Inicio', key: 'inicio', icono: <FaHome />, requiereAdmin: false },
    { nombre: 'Productos', key: 'productos', icono: <FaBox />, requiereAdmin: false },
    { nombre: 'Proveedores', key: 'proveedores', icono: <FaUsers />, requiereAdmin: false },
    { nombre: 'Entradas', key: 'entradas', icono: <FaArrowRight />, requiereAdmin: false },
    { nombre: 'Salidas', key: 'salidas', icono: <FaWarehouse />, requiereAdmin: false },
    { nombre: 'Categorías', key: 'categorias', icono: <FaTags />, requiereAdmin: false },
    { nombre: 'Usuarios', key: 'usuarios', icono: <FaClipboardList />, requiereAdmin: true },
    { nombre: 'Auditoría', key: 'auditoria', icono: <FaSearch />, requiereAdmin: true },
  ];

  const handleClick = (key, requiereAdmin) => {
    if (requiereAdmin && rol !== 'admin') {
      setMensajeError('Acceso restringido. Esta sección es solo para administradores.');
      return;
    }
    setMensajeError('');
    setContenido(key);
  };

  const renderContenido = () => {
    if ((contenido === 'usuarios' || contenido === 'auditoria') && rol !== 'admin') {
      return <h3 className="text-danger">No tienes permiso para acceder a esta sección.</h3>;
    }

    switch (contenido) {
      case 'inicio':
        return <Inicio />;
      case 'productos':
        return <Productos />;
      case 'proveedores':
        return <Proveedores />;
      case 'entradas':
        return <Entradas />;
      case 'salidas':
        return <Salidas />;
      case 'categorias':
        return <Categorias />;
      case 'usuarios':
        return <Usuarios />;
      case 'auditoria':
        return <Auditoria />;
      default:
        return <h3>Seleccione una opción</h3>;
    }
  };

  if (rol === null) return null;

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Barra lateral */}
      <div className="bg-dark text-light p-3 d-flex flex-column justify-content-between" style={{ width: '250px' }}>
        <div>
          <h4 className="text-center mb-4">Menú</h4>
          <ul className="nav flex-column">
            {opciones.map(({ nombre, key, icono, requiereAdmin }) => (
              <li className="nav-item mb-2" key={key}>
                <button
                  className={`btn w-100 text-start ${contenido === key ? 'btn-primary' : 'btn-outline-light'}`}
                  onClick={() => handleClick(key, requiereAdmin)}
                  disabled={requiereAdmin && rol !== 'admin'}
                >
                  {icono} <span className="ms-2">{nombre}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <hr />
          <div className="text-center text-white mb-3">
            <small className="text-muted">Usuario:</small>
            <div className="fw-bold text-capitalize">{usuario}</div>

            <small className="text-muted mt-2">Rol:</small>
            <div className="fw-bold text-uppercase">
              {rol === 'admin' ? 'Administrador 👑' : 'Empleado 👷‍♂️'}
            </div>
          </div>

          <button
            className="btn btn-danger w-100"
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
          >
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </div>
      </div>

      {/* Área de contenido */}
      <div className="flex-grow-1 p-4">
        {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
        {renderContenido()}
      </div>
    </div>
  );
};

export default Menu;
