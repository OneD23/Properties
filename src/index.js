'use strict'
var mongoose = require('mongoose')
var app = require('./app')


mongoose.Promise = global.Promise
mongoose.set('strictQuery', true); 
mongoose.connect("mongodb+srv://OneD:2233@atlascluster.k3fvuvl.mongodb.net/?retryWrites=true&w=majority",{
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(()=>{
    console.log("La base de datos se conecto correctamente")

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));


}).catch(err => console.log(err))