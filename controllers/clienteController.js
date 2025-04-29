const db = require('../config/db');

// Listar todos los clientes
exports.listar = (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) throw err;
    res.render('clientes/listar', { clientes: results });
  });
};

// Mostrar formulario para nuevo cliente
exports.mostrarFormularioNuevo = (req, res) => {
  res.render('clientes/nuevo');
};

// Guardar nuevo cliente
exports.guardar = (req, res) => {
  const { nombre, correo, telefono, documento_identidad } = req.body;
  db.query('INSERT INTO clientes (nombre, correo, telefono, documento_identidad) VALUES (?, ?, ?, ?)', 
    [nombre, correo, telefono, documento_identidad], (err) => {
      if (err) throw err;
      res.redirect('/clientes');
    });
};

// Mostrar formulario para editar cliente
exports.mostrarFormularioEditar = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.render('clientes/editar', { cliente: results[0] });
  });
};

// Actualizar cliente
exports.actualizar = (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, documento_identidad } = req.body;
  db.query('UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, documento_identidad = ? WHERE id = ?', 
    [nombre, correo, telefono, documento_identidad, id], (err) => {
      if (err) throw err;
      res.redirect('/clientes');
    });
};

// Eliminar cliente
exports.eliminar = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/clientes');
  });
};
