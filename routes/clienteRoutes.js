const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/auth');

// Listar clientes
router.get('/clientes', authMiddleware.isAuthenticated, clienteController.listar);

// Formulario nuevo cliente
router.get('/clientes/nuevo', authMiddleware.isAuthenticated, clienteController.mostrarFormularioNuevo);

// Guardar cliente
router.post('/clientes/nuevo', authMiddleware.isAuthenticated, clienteController.guardar);

// Formulario editar cliente
router.get('/clientes/editar/:id', authMiddleware.isAuthenticated, clienteController.mostrarFormularioEditar);

// Actualizar cliente
router.post('/clientes/editar/:id', authMiddleware.isAuthenticated, clienteController.actualizar);

// Eliminar cliente
router.get('/clientes/eliminar/:id', authMiddleware.isAuthenticated, clienteController.eliminar);

module.exports = router;
