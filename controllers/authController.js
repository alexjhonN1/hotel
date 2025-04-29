const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.render('login', { mensaje: 'Por favor ingrese ambos campos' });
  }

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.render('login', { mensaje: 'Usuario no encontrado' });
    }

    const usuario = results[0];
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.render('login', { mensaje: 'Contraseña incorrecta' });
    }

    // Guardar datos en sesión
    req.session.usuario = usuario;

    // Redirige al dashboard
    res.redirect('/dashboard');
  });
};

exports.register = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      return res.render('register', { mensaje: 'El correo ya está registrado' });
    } else {
      db.query('INSERT INTO usuarios SET ?', {
        nombre,
        correo,
        password: hashedPassword,
        rol
      }, (err, result) => {
        if (err) throw err;
        res.render('register', { mensaje: 'Usuario registrado con éxito' });
      });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect('/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};
