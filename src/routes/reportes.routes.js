const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');

router.get('/', reportesController.listar);

module.exports = router;