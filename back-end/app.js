require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const app = express();

//Asignar puerto
app.set('port', process.env.PORT || 3000);

//Instaciar Base de Datos MongoDB
require('./database/db');

// Middlewares

//Morgan para ver los estados HTTP 
app.use(morgan('dev'));

//Almacenamiento de las imagenes en el servidor
const storage = multer.diskStorage({
    //Destino, en este caso en el proyecto en la carpeta public
    destination: path.join(__dirname, 'public/uploads'),
    //El nombre que tendrá la imagen
    filename(req, file, cb) {
        /* nulo por si hay error, 
        el nombre que tendrá la imagen en el server es: la fecha + la extension del archivo */
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

//EL single es porque solo se subirá una imagen a la vez
app.use(multer({storage}).single('image'));

//Ayuda a convertir los datos a JSON desde el front-end
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Rutas
app.use('/api/books', require('./routes/books.routes'));

//Archivos estáticos, archivos públicos
app.use(express.static(path.join(__dirname, 'public')));

//Escuchar en el puerto 3000
app.listen(app.get('port'), ()=> {
    console.log('Server on Port', app.get('port'));
});