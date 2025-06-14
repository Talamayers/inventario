const express = require('express');
const router = express.Router();
const controlador = require('../controllers/categoriasController');

router.get('/', controlador.obtenerCategorias);

module.exports = router;
