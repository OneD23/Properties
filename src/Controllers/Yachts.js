'use strict'

var fs = require('fs')
var modelo = require('../Models/Yachts');
const { Console } = require('console');

var controlers = {
    save: function (req, res) {
        const { name, description, imageFrom, accommodation,  summerCruising, length, draft, built,engines, winterCruising,beam, cruisingSpeed, refit, fuelConsumption, guests, cabins, crew, cabinConfiguration, rateHighSeason, rateLowSeason, keyFeatures, gallery } = req.body;
        var Yachts = new modelo()

        Yachts.name = name
        Yachts.description = description
        Yachts.imageFrom =imageFrom
        Yachts.accommodation = accommodation
        Yachts.specifications.summerCruising = summerCruising
        Yachts.specifications.length = length
        Yachts.specifications.draft = draft
        Yachts.specifications.built = built
        Yachts.specifications.engines = engines
        Yachts.specifications.winterCruising = winterCruising
        Yachts.specifications.beam = beam
        Yachts.specifications.cruisingSpeed = cruisingSpeed
        Yachts.specifications.refit = refit
        Yachts.specifications.fuelConsumption = fuelConsumption
        Yachts.specifications.guests = guests
        Yachts.specifications.cabins = cabins
        Yachts.specifications.crew = crew 
        Yachts.specifications.cabinConfiguration = cabinConfiguration
        Yachts.charterRate.rateHighSeason = rateHighSeason
        Yachts.charterRate.rateLowSeason = rateLowSeason
        Yachts.keyFeatures = keyFeatures.split('\n')
        
        
       const galeria= []
        req.files.gallery.forEach(element => {
            console.log(element.path)
            galeria.push(element.path.split('\\')[1])
        });
        Yachts.gallery = galeria 
        Yachts.save()
            .then(YachtsSave => {
                if (!YachtsSave) {
                    return res.status(404).send({ message: "Couldn't save the Yachts" });
                }

                var fileName = "imagen no subida";
                if (req.files) {
                    var filePath = req.files.imageFrom.path;
                    fileName = filePath.split('\\')[1];
                    var extencion = fileName.split('.')[1];

                    if (extencion == 'png' || extencion == 'jpg' || extencion == 'jpge' || extencion == 'gif') {
                        return modelo.findByIdAndUpdate(YachtsSave._id, { imageFrom: fileName }, { new: true })
                            .then(YachtsUpdate => {
                                if (!YachtsUpdate) {
                                    return res.status(404).send({ message: "El Yachts al cual intenta vincular la imagen no existe" });
                                }
                                console.log('imagen guardada');
                                return res.status(200).send({ YachtsUpdate });
                            })
                            .catch(err => {
                                return res.status(500).send({ message: 'error when saving the image => '+ err });
                            });
                    } else {
                        return new Promise((resolve, reject) => {
                            fs.unlink(filePath, err => {
                                if (err) {
                                    reject(err);   
                                } else {
                                    resolve();
                                }
                            });
                        })
                            .then(() => {
                                return res.status(200).send({ message: 'La extensión de este archivo no es válida para imagen' });
                            })
                            .catch(err => {
                                return res.status(500).send({ message: 'Error al eliminar el archivo', error: err });
                            });
                    }
                } else {
                    console.log(req);
                }

                return res.status(200).send({ 'The Yachts was successfully saved': YachtsSave });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error when saving the Yachts', error: err });
            });

    },
    Find: function (req, res) {
        var Id = req.params.Id
        console.log(req.params)
        modelo.findById(Id, (err, YachtsFind) => {
            if (err) return res.status(500).send({ message: "Error al obtener el Yachts" })

            if (!YachtsFind) return res.status(404).send({ message: "No se pudo obtener el Yachts, no existe o fue eliminado." })

            return res.status(200).send({ Yachts: YachtsFind })
        })
    },
    List: function (req, res) {

        modelo.find({}).then((YachtsFind) => {
            if (!YachtsFind) return res.status(404).send({ message: "No se puede obtener ningún Yachts, no existe o ha sido eliminado." });
            return res.status(200).send(YachtsFind);
        }).catch((err) => {
            return res.status(500).send({ message: "Error al obtener el Yachtss" });
        });

    },
    Update: function (req, res) {
        var Id = req.params.Id
        var update = req.body

        modelo.findByIdAndUpdate(Id, update, (err, YachtsUpdate) => {
            if (err) return res.status(500).send({ message: "Error al obtener el Yachts" })

            if (!YachtsUpdate) return res.status(404).send({ message: "No se pudo actualizar el Yachts, no existe o fue eliminado." })

            return res.status(200).send({ Yachts: YachtsUpdate })
        })
    },
    Delete: function (req, res) {
        var Id = req.params.Id
        var update = req.body

        modelo.findByIdAndDelete(Id, update, (err, YachtsDelete) => {
            if (err) return res.status(500).send({ message: "Error al Eliminar el Yachts" })

            if (!YachtsDelete) return res.status(404).send({ message: "No se pudo eliminar el Yachts, no existe o ya fue eliminado." })

            return res.status(200).send({ Yachts: YachtsDelete })
        })
    }
}

module.exports = controlers;