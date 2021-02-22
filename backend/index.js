const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Crear servidor de express
const app = express();

//CORS
app.use(cors());

// Base de datos
dbConnection();

//Escuchar peticiones
app.listen(process.env.PORT, () =>
  console.info(`server has started on port ${process.env.PORT}`)
);

//Directorio público
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas

app.use('/api/auth', require('./routes/auth'));
/*
 * Otra forma sería
 * Primero declaro el router
 * var authRouter = require('./routes/auth');
 * Luego le indico que debe utilizar el router creado
 * app.use('/', authRouter);
 *
 */
app.use('/api/cart', require('./routes/cart'));
app.use('/api/product', require('./routes/product'));
app.use('/api/user', require('./routes/user'));
app.use('/api/sale', require('./routes/sale'));
app.use('/api/image', require('./routes/image'));
