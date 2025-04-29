const db = require('../config/db');

exports.listarUsuarios = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.render('admin/usuarios', { usuarios: results });
  });
};

exports.actualizarRol = (req, res) => {
  const { id, rol } = req.body;
  db.query('UPDATE usuarios SET rol = ? WHERE id = ?', [rol, id], (err, result) => {
    if (err) throw err;
    res.redirect('/usuarios');
  });
};
