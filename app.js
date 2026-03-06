const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const assignmentRoutes = require('./src/routes/asignaciones.routes');
const sucursalesRoutes = require('./src/routes/sucursales.routes');
const colaboradoresRoutes = require('./src/routes/colaboradores.routes');
const viajesRoutes = require("./src/routes/viajes.routes");
const verificarToken = require('./src/middlewares/auth.middleware');

const app = express();

//Middlewares
app.use(cors()); 
app.use(express.json());

// RUTAS
app.use('/api/auth', authRoutes);

//Rutas protegigas
app.use(verificarToken);

app.use('/api/asignaciones', assignmentRoutes);
app.use('/api/sucursales', sucursalesRoutes);
app.use('/api/colaboradores', colaboradoresRoutes);
app.use('/api/viajes', viajesRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});