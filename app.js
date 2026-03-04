const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { poolPromise } = require('./src/config/db');

const authRoutes = require('./src/routes/auth.routes');

const app = express();

//Middlewares
app.use(cors()); 
app.use(express.json());

// RUTAS
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});