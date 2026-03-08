const { poolPromise, sql } = require('../config/db');

exports.listar = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('select * from vw_ReportePagosViajes ORDER BY IdViaje DESC');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};