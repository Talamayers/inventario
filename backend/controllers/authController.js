const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const user = results[0];

    // 🔐 Generar token JWT real
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // duración del token
    );

    res.json({
      success: true,
      token,
      rol: user.rol,
      usuario: user.nombre || user.email,
    });
  });
};
