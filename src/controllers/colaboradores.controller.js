const { poolPromise, sql } = require('../config/db');

//obtener la lista
exports.listarColaboradores = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('select * from dbo.Colaboradores');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};