const { poolPromise, sql } = require('../config/db');

//obtener la lista
exports.listarTranportistas = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('select * from dbo.Transportistas where IdEstado = 1');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};