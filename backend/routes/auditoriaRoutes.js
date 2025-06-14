const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoria.controller');

router.get('/', auditoriaController.getAllAuditoria);
router.post('/', auditoriaController.createAuditoria);

module.exports = router;
