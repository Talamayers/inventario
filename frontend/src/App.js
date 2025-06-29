import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Inicio from "./components/Inicio"; // ✔ esta es tu ruta
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
         <Route path="/" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
