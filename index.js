const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const routes = require('./app/routes');
const sequelize = require('./sequelize');

const app = express();

// Configuración de middlewares
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Configuración de rutas
app.use('/', routes);

// Sincronización con la base de datos y inicio del servidor
sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`Servidor iniciado en el puerto ${config.port}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});
