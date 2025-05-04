const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');
const authMiddleware = require('../middleware/auth');

// Subida de archivos
const upload = habitacionController.upload.single('imagen');

// Listar habitaciones
router.get('/habitaciones', authMiddleware.isAuthenticated, habitacionController.listar);

// Formulario nueva habitación
router.get('/habitaciones/nuevo', authMiddleware.isAuthenticated, habitacionController.mostrarFormularioNuevo);

// Guardar habitación (con imagen)
router.post('/habitaciones/nuevo', authMiddleware.isAuthenticated, upload, habitacionController.guardar);

// Formulario editar habitación
router.get('/habitaciones/editar/:id', authMiddleware.isAuthenticated, habitacionController.mostrarFormularioEditar);

// Actualizar habitación (con imagen opcional)
router.post('/habitaciones/editar/:id', authMiddleware.isAuthenticated, upload, habitacionController.actualizar);

// Eliminar habitación
router.get('/habitaciones/eliminar/:id', authMiddleware.isAuthenticated, habitacionController.eliminar);

module.exports = router;
