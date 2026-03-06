const express = require('express');
const router = express.Router();
const transportistasController = require("../controllers/transportistas.controller")

// Obtener todas las asignaciones
router.get('/', transportistasController.listarTranportistas);

module.exports = router;