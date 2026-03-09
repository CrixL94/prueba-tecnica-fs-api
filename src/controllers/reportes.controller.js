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

exports.filtrarReportes = async (req, res) => {
  const { idTransportista, fechaInicio, fechaFin } = req.query;

  try {
    const pool = await poolPromise;
    const request = pool.request();
    
    let query = `SELECT * FROM vw_ReportePagosViajes WHERE IdEstado = 1`;

    if (idTransportista) {
      request.input('id', sql.Int, idTransportista);
      query += ` AND IdTransportista = @id`;
    }

    if (fechaInicio && fechaFin) {
      request.input('inicio', sql.Date, fechaInicio);
      request.input('fin', sql.Date, fechaFin);
      query += ` AND CAST(FechaViaje AS DATE) BETWEEN @inicio AND @fin`;
    }

    query += ` ORDER BY IdViaje DESC`;

    const result = await request.query(query);

    res.json(result.recordset); 

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};