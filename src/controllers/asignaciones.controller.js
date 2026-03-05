const { poolPromise, sql } = require('../config/db');

exports.gestionarAsignaciones = async (req, res) => {
  const { accion, idAsignacion, idColaborador, idSucursal, distanciaKm, idUsuario } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('json', sql.NVarChar(sql.MAX), JSON.stringify({
        accion,
        idAsignacion,
        idColaborador,
        idSucursal,
        distanciaKm,
        idUsuario
      }))
      .execute('sp_CRUDAsignaciones');

    // Retornamos el mensaje que viene desde el SELECT del SP
    res.json({
      success: true,
      message: result.recordset[0].Mensaje
    });

  } catch (error) {
    // Capturamos el RAISERROR del SP
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

//obtener la lista
exports.listarAsignaciones = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('select * from dbo.vw_AsignacionesDetalladas');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};