exports.dashboard = (req, res) => {
    const usuario = req.session.usuario;
  
    if (!usuario) {
      return res.redirect('/login');
    }
  
    // Redireccionamos según el rol del usuario
    switch (usuario.rol) {
      case 'admin':
        return res.render('dashboard/admin', { usuario });
      case 'recepcionista':
        return res.render('dashboard/recepcionista', { usuario });
      case 'cliente':
        return res.render('dashboard/cliente', { usuario });
      default:
        return res.send('Rol no reconocido');
    }
  };
  