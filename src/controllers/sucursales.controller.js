const { poolPromise, sql } = require('../config/db');

//obtener la lista
exports.listarSucursales = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('select IdSucursal, Nombre as NombreSucursal from dbo.sucursales');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};