const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./conexion'); // Asegúrate de que el camino al archivo de conexión sea correcto

const infoplantas = require('./routes/tabla_infoplantas');
const infoplantas2 = require('./routes/tabla_infoplantas2');
const plantas = require('./routes/tabla_plantas');
const usuarios = require('./routes/tabla_usuarios');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:5173'],  // Permitir solicitudes desde estos orígenes específicos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions)); // Aplica la configuración CORS

// Responder a las solicitudes OPTIONS para todos los métodos
app.options('*', cors(corsOptions));

// Rutas
app.use('/infoplantas', infoplantas);
app.use('/infoplantas2', infoplantas2);
app.use('/plantas', plantas);
app.use('/usuarios', usuarios);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
