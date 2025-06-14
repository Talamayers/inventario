const express = require('express');
const router = express.Router();
const entradasController = require('../controllers/entradas.controller');

router.get('/', entradasController.getAllEntradas);
router.post('/', entradasController.createEntrada);
router.put('/:id', entradasController.updateEntrada);
router.delete('/:id', entradasController.deleteEntrada);

module.exports = router;
