'use strict'

var express = require("express")
var bodyParse = require("body-parser")
var JetRoutes = require('./Routes/Jet');
var YachtsRoutes = require('./Routes/Yachts');
var fs = require('fs')

var app = express();
// Archivo de rutas 

//middlewares
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())
app.set('view engine', 'ejs');

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use('/Jet',JetRoutes)
app.use('/Yachts',YachtsRoutes)
app.use('/getImage/:name', function (req, res) {
    // Lee la imagen del sistema de archivos
    fs.readFile('../uploads/'+req.params.name, function (err, data) {
      if (err) {
        // Si hay un error al leer el archivo, envía una respuesta de error
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error al leer la imagen.');
      } else {
        // Si se lee correctamente el archivo, envía una respuesta con la imagen
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
      }
    });
  })
//exports
module.exports = app;