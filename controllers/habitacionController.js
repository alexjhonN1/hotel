const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Exportar configuración de multer
exports.upload = upload;

// Listar todas las habitaciones
exports.listar = (req, res) => {
  db.query('SELECT * FROM habitaciones', (err, results) => {
    if (err) throw err;
    res.render('habitaciones/listar', { habitaciones: results });
  });
};

// Mostrar formulario nueva habitación
exports.mostrarFormularioNuevo = (req, res) => {
  res.render('habitaciones/nuevo');
};

// Guardar nueva habitación
exports.guardar = (req, res) => {
  const { numero, tipo, descripcion, precio, estado } = req.body;
  const imagen = req.file ? req.file.filename : null;

  db.query('INSERT INTO habitaciones (numero, tipo, descripcion, precio, estado, imagen) VALUES (?, ?, ?, ?, ?, ?)', 
    [numero, tipo, descripcion, precio, estado, imagen], (err) => {
      if (err) throw err;
      res.redirect('/habitaciones');
    });
};

// Mostrar formulario editar habitación
exports.mostrarFormularioEditar = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM habitaciones WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.render('habitaciones/editar', { habitacion: results[0] });
  });
};

// Actualizar habitación
exports.actualizar = (req, res) => {
  const { id } = req.params;
  const { numero, tipo, descripcion, precio, estado } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if (imagen) {
    db.query('UPDATE habitaciones SET numero = ?, tipo = ?, descripcion = ?, precio = ?, estado = ?, imagen = ? WHERE id = ?', 
      [numero, tipo, descripcion, precio, estado, imagen, id], (err) => {
        if (err) throw err;
        res.redirect('/habitaciones');
      });
  } else {
    db.query('UPDATE habitaciones SET numero = ?, tipo = ?, descripcion = ?, precio = ?, estado = ? WHERE id = ?', 
      [numero, tipo, descripcion, precio, estado, id], (err) => {
        if (err) throw err;
        res.redirect('/habitaciones');
      });
  }
};

// Eliminar habitación
exports.eliminar = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM habitaciones WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/habitaciones');
  });
};
