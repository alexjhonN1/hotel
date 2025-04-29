const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Solo admin puede acceder
router.get('/usuarios', auth.isAuthenticated, auth.isAdmin, userController.list);
router.get('/usuarios/editar/:id', auth.isAuthenticated, auth.isAdmin, userController.editForm);
router.post('/usuarios/editar/:id', auth.isAuthenticated, auth.isAdmin, userController.update);
router.get('/usuarios/eliminar/:id', auth.isAuthenticated, auth.isAdmin, userController.delete);

module.exports = router;
