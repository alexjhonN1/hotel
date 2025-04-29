const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

function soloAdmin(req, res, next) {
  if (req.session.usuario && req.session.usuario.rol === 'admin') {
    return next();
  }
  res.send('Acceso denegado');
}

router.get('/usuarios', auth.isAuthenticated, soloAdmin, usuarioController.listarUsuarios);
router.post('/usuarios/actualizar-rol', auth.isAuthenticated, soloAdmin, usuarioController.actualizarRol);

module.exports = router;
