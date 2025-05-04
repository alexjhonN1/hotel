const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false
}));

// Motor de plantillas
app.set('view engine', 'ejs');

// Rutas
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.render('login', { mensaje: null }));
app.get('/register', (req, res) => res.render('register', { mensaje: null }));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

// Usar rutas
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', usuarioRoutes);
app.use('/', habitacionRoutes);  // Ruta de habitaciones
app.use('/', clienteRoutes);     // Ruta de clientes
app.use('/reservas', reservaRoutes);  // Ruta de reservas
app.use('/reportes', reporteRoutes);  // Ruta de reportes

// Servidor
app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
