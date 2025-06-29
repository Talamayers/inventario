const express = require('express');
const router = express.Router();
const entradaController = require('../controllers/entradas.controller');

// Obtener entradas
router.get('/', entradaController.obtenerEntradas);

// Registrar nueva entrada
router.post('/', entradaController.registrarEntrada);

module.exports = router;