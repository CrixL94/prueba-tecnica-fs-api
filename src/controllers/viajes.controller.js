const { poolPromise, sql } = require('../config/db');

exports.registrarViaje = async (req, res) => {
    const { idSucursal, idTransportista, idUsuario, asignaciones } = req.body;

    if (!asignaciones || asignaciones.length === 0) {
        return res.status(400).json({
            success: false,
            error: "Debe seleccionar al menos un colaborador para el viaje."
        });
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('IdSucursal', sql.Int, idSucursal)
            .input('IdTransportista', sql.Int, idTransportista)
            .input('IdUsuarioRegistro', sql.Int, idUsuario)
            .input('AsignacionesIdsJson', sql.NVarChar(sql.MAX), JSON.stringify(asignaciones))
            .execute('sp_RegistrarViaje');

        res.json({
            success: true,
            message: result.recordset[0].Mensaje
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.obtenerViajes = async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM vw_ResumenViajesDetallados ORDER BY FechaViaje DESC, IdViaje DESC');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};