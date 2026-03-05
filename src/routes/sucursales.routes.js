const express = require('express');
const router = express.Router();
const sucursalesController = require('../controllers/sucursales.controller')

// Obtener todas las sucursales
router.get('/', sucursalesController.listarSucursales);

module.exports = router;