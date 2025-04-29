const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.list = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.render('users/list', { usuarios: results });
  });
};

exports.editForm = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.render('users/edit', { usuario: results[0] });
  });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { nombre, correo, rol } = req.body;

  db.query('UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ?', 
    [nombre, correo, rol, id], (err, results) => {
      if (err) throw err;
      res.redirect('/usuarios');
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.redirect('/usuarios');
  });
};
