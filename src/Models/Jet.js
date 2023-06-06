'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var JetSchema = Schema({
    name: String,
    description:String,
    passengers : String,
    cabinDimensions: String,
    range: String,
    speed: String,
    cargoCapacity: String,
    imageFrom: String,
    gallery:{},
})

module.exports = mongoose.model('Jet', JetSchema)