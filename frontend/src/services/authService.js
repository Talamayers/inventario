// src/services/authService.js

const API_URL = 'http://localhost:4000/api/usuarios/login'; // Asegúrate que coincida con tu backend

// Iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    // Guarda datos en localStorage
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem('user');
};

// Obtener usuario autenticado
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
