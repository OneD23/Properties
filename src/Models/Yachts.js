'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

const yachtSchema = new mongoose.Schema({
    name:String,
    description: String,
    accommodation: String,
    imageFrom: String,
    specifications: {
      summerCruising: String,
      length: String,
      draft: String,
      built: String,
      engines: String,
      winterCruising: String,
      beam: String,
      cruisingSpeed: String,
      refit: String,
      fuelConsumption: String,
      guests: Number,
      cabins: Number,
      crew: Number,
      cabinConfiguration: String,
    },
    charterRate: {
      rateHighSeason: String,
      rateLowSeason: String,
    },
    keyFeatures: [String],
    gallery: [String]
  });
  module.exports = mongoose.model('Yacht', yachtSchema);