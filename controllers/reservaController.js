const db = require('../config/db');

// Mostrar todas las reservas
exports.listar = (req, res) => {
  const sql = `
    SELECT reservas.*, clientes.nombre AS cliente, habitaciones.numero AS habitacion
    FROM reservas
    JOIN clientes ON reservas.cliente_id = clientes.id
    JOIN habitaciones ON reservas.habitacion_id = habitaciones.id
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('reservas/listar', { reservas: results });
  });
};

// Mostrar formulario de nueva reserva
exports.mostrarFormularioNuevo = (req, res) => {
  db.query('SELECT * FROM clientes', (err, clientes) => {
    if (err) throw err;
    db.query('SELECT * FROM habitaciones WHERE estado = "disponible"', (err, habitaciones) => {
      if (err) throw err;
      res.render('reservas/nuevo', { clientes, habitaciones });
    });
  });
};

// Guardar nueva reserva
exports.guardar = (req, res) => {
  const { cliente_id, habitacion_id, fecha_entrada, fecha_salida, estado } = req.body;
  const sql = `
    INSERT INTO reservas (cliente_id, habitacion_id, fecha_entrada, fecha_salida, estado)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [cliente_id, habitacion_id, fecha_entrada, fecha_salida, estado], (err) => {
    if (err) throw err;

    // Cambiar estado de habitación a ocupado
    db.query('UPDATE habitaciones SET estado = "ocupado" WHERE id = ?', [habitacion_id], () => {
      res.redirect('/reservas');
    });
  });
};

// Cancelar o eliminar reserva
exports.eliminar = (req, res) => {
  const { id } = req.params;
  db.query('SELECT habitacion_id FROM reservas WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    const habitacion_id = result[0].habitacion_id;

    db.query('DELETE FROM reservas WHERE id = ?', [id], (err) => {
      if (err) throw err;
      db.query('UPDATE habitaciones SET estado = "disponible" WHERE id = ?', [habitacion_id], () => {
        res.redirect('/reservas');
      });
    });
  });
};
