'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PropertiesSchema = Schema({
    nombre: String,
    owner: String,
    charter: String,
    built: String,
    length: String,
    guests: String,
    image: String,
    precio: String,
    ubicacion: String,
    gallery:{},
})

module.exports = mongoose.model('Properties', PropertiesSchema)