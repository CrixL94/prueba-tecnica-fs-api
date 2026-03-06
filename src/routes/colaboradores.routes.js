const express = require('express');
const router = express.Router();
const colaboradoresController = require('../controllers/colaboradores.controller')

// Obtener todas las sucursales
router.get('/', colaboradoresController.listarColaboradores);

router.get('/:idSucursal', colaboradoresController.obtenerColaboradoresPorSucursal);

module.exports = router;