app.get('/dashboard', authMiddleware.isAuthenticated, (req, res) => {
    res.send(`Bienvenido ${req.session.usuario.nombre} - Rol: ${req.session.usuario.rol}`);
  });