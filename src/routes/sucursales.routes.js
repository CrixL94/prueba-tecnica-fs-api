const express = require('express');
const router = express.Router();
const sucursalesController = require('../controllers/sucursales.controller')

// Obtener todas las sucursales
router.get('/', sucursalesController.listarSucursales);

router.get('/view', sucursalesController.listarSucursalesVista);

router.post('/gestionar', sucursalesController.gestionarSucursales);

module.exports = router;