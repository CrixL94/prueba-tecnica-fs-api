const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/asignaciones.controller');

// Obtener todas las asignaciones
router.get('/', assignmentController.listarAsignaciones);

// Crear, Editar y Eliminar
router.post('/procesar', assignmentController.gestionarAsignaciones);

module.exports = router;