const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const verifyToken = require('../middlewares/verifyToken');

// Todas las rutas protegidas con JWT
router.get('/', verifyToken, usuariosController.getAllUsuarios);
router.post('/', verifyToken, usuariosController.createUsuario);
router.put('/:id', verifyToken, usuariosController.updateUsuario);
router.delete('/:id', verifyToken, usuariosController.deleteUsuario);

module.exports = router;
