const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // ej: localhost
  user: process.env.DB_USER,       // ej: root
  password: process.env.DB_PASSWORD,  // tu contraseña o vacía si no tienes
  database: process.env.DB_NAME    // ej: inventario_db
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});


module.exports = connection;
