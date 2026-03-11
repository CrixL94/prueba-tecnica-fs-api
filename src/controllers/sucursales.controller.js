const { poolPromise, sql } = require('../config/db');

//obtener la lista
exports.listarSucursales = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('select IdSucursal, Nombre as NombreSucursal from dbo.sucursales where IdEstado = 1');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarSucursalesVista = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM dbo.vw_Sucursales where IdEstado = 1 ORDER BY FechaCreacion DESC');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

exports.gestionarSucursales = async (req, res) => {
  const { Accion, IdSucursal, Nombre, Direccion, IdUsuario } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('JsonData', sql.NVarChar(sql.MAX), JSON.stringify({
        Accion,
        IdSucursal,
        Nombre,
        Direccion,
        IdUsuario
      }))
      .execute('sp_CRUDSucursales');

    const respuesta = result.recordset[0];

    res.json({
      success: respuesta.Success === 1,
      message: respuesta.Message
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};