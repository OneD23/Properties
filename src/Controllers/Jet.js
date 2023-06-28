'use strict'

var fs = require('fs')
var modelo = require('../Models/Jet')

var controlers = {
    save: function (req, res) {
        const { name, description, categoria, passengers, cabinDimensions, range, speed, cargoCapacity, imageFrom, } = req.body;

        var Jet = new modelo()

        Jet.name = name
        Jet.description = description
        Jet.passengers = passengers
        Jet.cabinDimensions = cabinDimensions
        Jet.range = range
        Jet.speed = speed
        Jet.cargoCapacity = cargoCapacity
        Jet.imageFrom = imageFrom
        Jet.categoria = categoria

        const galeria= []
        req.files.gallery.forEach(element => {
            console.log(element.path)
            galeria.push(element.path.split('/')[1])
        });
        Jet.gallery = galeria 

        Jet.save()
            .then(JetSave => {
                if (!JetSave) {
                    return res.status(404).send({ message: "Couldn't save the jet" });
                }

                var fileName = "imagen no subida";
                if (req.files) {
                    var filePath = req.files.imageFrom.path;
                    fileName = filePath.split('\\')[1];
                    var extencion = fileName.split('.')[1];

                    if (extencion == 'png' || extencion == 'jpg' || extencion == 'jpge' || extencion == 'gif') {
                        return modelo.findByIdAndUpdate(JetSave._id, { imageFrom: fileName }, { new: true })
                            .then(JetUpdate => {
                                if (!JetUpdate) {
                                    return res.status(404).send({ message: "El Jet al cual intenta vincular la imagen no existe" });
                                }
                                console.log('imagen guardada');
                                return res.status(200).send({ JetUpdate });
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

                return res.status(200).send({ 'The Jet was successfully saved': JetSave });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error when saving the jet', error: err });
            });

    },
    Find: function (req, res) {
        var Id = req.params.Id
        console.log(req.params)
        modelo.findById(Id, (err, JetFind) => {
            if (err) return res.status(500).send({ message: "Error al obtener el Jet" })

            if (!JetFind) return res.status(404).send({ message: "No se pudo obtener el jet, no existe o fue eliminado." })

            return res.status(200).send({ Jet: JetFind })
        })
    },
    List: function (req, res) {

        modelo.find({}).then((JetFind) => {
            if (!JetFind) return res.status(404).send({ message: "No se puede obtener ningún Jet, no existe o ha sido eliminado." });
            return res.status(200).send(JetFind);
        }).catch((err) => {
            return res.status(500).send({ message: "Error al obtener el Jets" });
        });

    },
    Update: function (req, res) {
        var Id = req.params.Id
        var update = req.body

        modelo.findByIdAndUpdate(Id, update, (err, JetUpdate) => {
            if (err) return res.status(500).send({ message: "Error al obtener el Jet" })

            if (!JetUpdate) return res.status(404).send({ message: "No se pudo actualizar el Jet, no existe o fue eliminado." })

            return res.status(200).send({ Jet: JetUpdate })
        })
    },
    Delete: function (req, res) {
        var Id = req.params.Id
        var update = req.body

        modelo.findByIdAndDelete(Id, update, (err, JetDelete) => {
            if (err) return res.status(500).send({ message: "Error al Eliminar el Jet" })

            if (!JetDelete) return res.status(404).send({ message: "No se pudo eliminar el Jet, no existe o ya fue eliminado." })

            return res.status(200).send({ Jet: JetDelete })
        })
    }
}

module.exports = controlers;