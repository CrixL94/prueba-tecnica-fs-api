const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    //Obtener el token del header (formato: Bearer TOKEN_AQUÍ)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token de acceso.' });
    }

    try {
        //Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //Guardar los datos del usuario
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = verificarToken;