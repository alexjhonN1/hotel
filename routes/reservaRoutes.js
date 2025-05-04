const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/', reservaController.listar);
router.get('/nuevo', reservaController.mostrarFormularioNuevo);
router.post('/guardar', reservaController.guardar);
router.get('/eliminar/:id', reservaController.eliminar);

module.exports = router;
