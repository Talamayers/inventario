const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// 🔴 YA NO USAMOS JWT POR AHORA, ASÍ QUE QUITAMOS `verifyToken`

router.get('/', usuariosController.getAllUsuarios);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
