const { poolPromise, sql } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { nombreUsuario, password } = req.body;

    try {
        const pool = await poolPromise;
        
        //Ejecutar el Procedimiento Almacenado
        const result = await pool.request()
            .input('NombreUsuario', sql.VarChar, nombreUsuario)
            .execute('sp_LoginUsuario');

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ 
                message: 'Usuario no encontrado o no está activo.' 
            });
        }

        //Comparar contraseña (Bcrypt)
        const validPassword = await bcrypt.compare(password, user.PasswordHash);
        
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        //Generar el Token JWT con la info del SP
        const token = jwt.sign(
            { 
                idusuario: user.IdUsuario, 
                idrol: user.IdRol,
                nombreRol: user.NombreRol 
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        //Respuesta
        res.json({
            //message: 'Bienvenido al sistema',
            token: token,
            user: {
                idusuario: user.IdUsuario,
                nombre: user.NombreUsuario,
                idrol:user.IdRol,
                rol: user.NombreRol,
                idestado: user.IdEstado,
                estado: user.NombreEstado,
                color: user.ColorFondo
            }
        });

    } catch (error) {
        console.error('Error en Login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};