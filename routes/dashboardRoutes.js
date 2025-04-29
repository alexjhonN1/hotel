const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Ruta para mostrar el dashboard
router.get('/dashboard', authMiddleware.isAuthenticated, (req, res) => {
    const usuario = req.session.usuario;
    if (usuario.rol === 'admin') {
        res.render('dashboard/admin', { usuario });
    } else if (usuario.rol === 'recepcionista') {
        res.render('dashboard/recepcionista', { usuario });
    } else {
        res.render('dashboard/cliente', { usuario });
    }
});

module.exports = router;
