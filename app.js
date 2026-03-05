const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const assignmentRoutes = require('./src/routes/asignaciones.routes');
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

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});