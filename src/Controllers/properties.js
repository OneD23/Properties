'use strict'

var controlers= {
    save: function (req, res) {
        const { name, charterRate, built, length, guests, image } = req.body;
        var user = new modelo()

        console.log(name);
        user.nombre = name
        user.charter = charterRate
        user.built = built
        user.length = length
        user.guests = guests

        user.save((err, userSave) => {
            if (err) return res.status(500).send({ message: "Error al guardar el usuario => " + err })

            if (!userSave) return res.status(404).send({ message: "No se a podido guardar el usuario" })
            var fileName = "imagen no subida"
            if (req.files) {

                var filePath = req.files.image.path
                fileName = filePath.split('\\')[1]
                var extencion = fileName.split('.')[1]

                if (extencion == 'png' || extencion == 'jpg' || extencion == 'jpge' || extencion == 'gif') {
                    modelo.findByIdAndUpdate(userSave._id, { imagenPerfil: fileName }, { new: true }, (err, userUpdate) => {
                        if (err) { return res.status(500).send({ message: 'Ocurrio un error mientras se guardaba la imagen' }) }
                        if (!userUpdate) { return res.status(404).send({ message: "El usuario al cual intenta vincular la imagen no existe" }) }
                        console.log('imagen guardada')
                        return res.status(200).send({
                            userUpdate
                        })
                    })
                } else {
                    fs.unlink(filePath, (err) => {
                        return res.status(200).send({ message: 'La extencion de este archivo no es valido para imagen' })
                    })

                }
            } else {
                console.log(req)

            }

            return res.status(200).send({ '=> ': userSave })


        })


    },
    Find: function (req, res) {
        var Id = req.params.Id
        console.log(req.params)
        modelo.findById(Id, (err, userFind) => {
            if (err) return res.status(500).send({ message: "Error al obtener el usuario" })

            if (!userFind) return res.status(404).send({ message: "No se obtener el usuario, no existe o fue eliminado." })

            return res.status(200).send({ usuario: userFind })

        })
    },
    List: function (req, res) {

        modelo.find({}).exec((err, userFind) => {
            if (err) return res.status(500).send({ message: "Error al obtener el usuarios" })

            if (!userFind) return res.status(404).send({ message: "No se puede obtener ningun usuario, no existe o fue eliminado." })

            return res.status(200).send(userFind)

        })

    },
    Update: function (req, res) {
        var Id = req.params.Id
        var update = req.body

        modelo.findByIdAndUpdate(Id, update, (err, userUpdate) => {
            if (err) return res.status(500).send({ message: "Error al obtener el usuario" })

            if (!userUpdate) return res.status(404).send({ message: "No se pudo actualizar el usuario, no existe o fue eliminado." })

            return res.status(200).send({ usuario: userUpdate })
        })
    },
    Delete: function (req, res) {
        var Id = req.params.Id
        var update = req.body

        modelo.findByIdAndDelete(Id, update, (err, userDelete) => {
            if (err) return res.status(500).send({ message: "Error al Eliminar el usuario" })

            if (!userDelete) return res.status(404).send({ message: "No se pudo eliminar el usuario, no existe o ya fue eliminado." })

            return res.status(200).send({ usuario: userDelete })
        })
    }
}

module.exports = controlers;