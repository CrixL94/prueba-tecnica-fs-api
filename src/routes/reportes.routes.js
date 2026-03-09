const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');

router.get('/', reportesController.listar);
router.get('/filtrar', reportesController.filtrarReportes);

module.exports = router;