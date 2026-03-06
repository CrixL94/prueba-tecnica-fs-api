const express = require("express");
const router = express.Router();
const viajesRouter = require("../controllers/viajes.controller");

router.post('/registrar', viajesRouter.registrarViaje);
router.get('/', viajesRouter.obtenerViajes);

module.exports = router;