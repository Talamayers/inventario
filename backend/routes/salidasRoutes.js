const express = require('express');
const router = express.Router();
const salidasController = require('../controllers/salidas.controller');

router.get('/', salidasController.getAllSalidas);
router.get('/:id', salidasController.getSalidaById);
router.post('/', salidasController.createSalida);
router.put('/:id', salidasController.updateSalida);
router.delete('/:id', salidasController.deleteSalida);

module.exports = router;
