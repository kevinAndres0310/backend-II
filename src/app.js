import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.router.js';
import apiRouter from './routes/api.router.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';

const app = express();
dotenv.config();

const uriMongo = process.env.URI_MONGO;
const port = process.env.PORT;
const firmaCookie = process.env.FIRMA_COOKIE;

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuración de cookies
app.use(cookieParser(firmaCookie)); // Agregamos una firma para las cookies

// Inicializar passport
initializePassport();
app.use(passport.initialize());

// Configurar la carpeta public
app.use(express.static(__dirname + '/public'));

// Configuración de motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configuramos y conectamos a la base de datos
mongoose
  .connect(uriMongo)
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch(err => {
    console.log('Error al conectar a la base de datos', err);
  });

// Rutas
app.use('/users', userRouter);
app.use('/api/sessions', apiRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
