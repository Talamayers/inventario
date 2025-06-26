import React, { useState, useEffect } from 'react';

const UsuarioForm = ({ modo, usuarioInicial = {}, onGuardar, onCancelar }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('empleado');

  useEffect(() => {
    if (usuarioInicial) {
      setNombre(usuarioInicial.nombre || '');
      setEmail(usuarioInicial.email || '');
      setPassword(usuarioInicial.password || ''); // Mostrar la contraseña real
      setRol(usuarioInicial.rol || 'empleado');
    }
  }, [usuarioInicial]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email || !rol) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const datos = {
      nombre,
      email,
      rol,
    };

    if (password.trim() !== '') {
      datos.password = password;
    }

    onGuardar(datos);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="text" // Contraseña visible (si usas "password", se oculta)
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Rol</label>
        <select
          className="form-select"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          required
        >
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {modo === 'editar' ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default UsuarioForm;
