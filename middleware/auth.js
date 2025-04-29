exports.isAuthenticated = (req, res, next) => {
    if (req.session.usuario) {
      return next();
    }
    res.redirect('/login');
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.session.usuario && req.session.usuario.rol === 'admin') {
      return next();
    }
    res.send('Acceso denegado');
  };
  