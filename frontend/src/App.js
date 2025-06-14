// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const AdminPage = () => <h2 className="text-center mt-5">Página de Administrador</h2>;
const EmpleadoPage = () => <h2 className="text-center mt-5">Página de Empleado</h2>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/empleado" element={<EmpleadoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
