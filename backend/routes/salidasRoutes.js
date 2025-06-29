const express = require('express');
const router = express.Router();
const salidasController = require('../controllers/salidas.controller');

// Rutas para las salidas
router.get('/', salidasController.obtenerSalidas);
router.post('/', salidasController.registrarSalida);

module.exports = router;
