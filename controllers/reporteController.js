const db = require('../config/db');

// Vista principal de reportes
exports.index = (req, res) => {
  res.render('reportes/index');
};

// Reporte: Reservas por fecha
exports.reservasPorFecha = (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;

  db.query(
    'SELECT r.id, r.fecha_inicio, r.fecha_fin, c.nombre AS cliente, h.numero AS habitacion FROM reservas r JOIN clientes c ON r.cliente_id = c.id JOIN habitaciones h ON r.habitacion_id = h.id WHERE r.fecha_inicio BETWEEN ? AND ?',
    [fecha_inicio, fecha_fin],
    (err, results) => {
      if (err) throw err;
      res.render('reportes/reservas_fecha', { reservas: results, fecha_inicio, fecha_fin });
    }
  );
};

// Reporte: Habitaciones más reservadas
exports.habitacionesMasReservadas = (req, res) => {
  db.query(
    'SELECT h.numero, h.tipo, COUNT(r.id) AS total_reservas FROM habitaciones h JOIN reservas r ON h.id = r.habitacion_id GROUP BY h.id ORDER BY total_reservas DESC LIMIT 10',
    (err, results) => {
      if (err) throw err;
      res.render('reportes/habitaciones_mas_reservadas', { habitaciones: results });
    }
  );
};

// Reporte: Clientes frecuentes
exports.clientesFrecuentes = (req, res) => {
  db.query(
    'SELECT c.nombre, c.correo, COUNT(r.id) AS total_reservas FROM clientes c JOIN reservas r ON c.id = r.cliente_id GROUP BY c.id ORDER BY total_reservas DESC LIMIT 10',
    (err, results) => {
      if (err) throw err;
      res.render('reportes/clientes_frecuentes', { clientes: results });
    }
  );
};

