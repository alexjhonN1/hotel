const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.get('/', reporteController.index);
router.get('/reservas-por-fecha', reporteController.reservasPorFecha);
router.get('/habitaciones-mas-reservadas', reporteController.habitacionesMasReservadas);
router.get('/clientes-frecuentes', reporteController.clientesFrecuentes);

module.exports = router;


