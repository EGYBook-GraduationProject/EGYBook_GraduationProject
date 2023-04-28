const mongoose = require('mongoose')
const mongoosePort = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(mongoosePort)

const attractionSchema = new mongoose.Schema({
    city: String,
    name: String,
    address: String,
    reviewsnum: Number,
    workinghours: String,
    typeofattraction: String,
    about: String,
    suggestedduration: String,
    rate: String,
    images: String,
    attractionreview: String
})

module.exports = mongoose.model('Attractions', attractionSchema, 'Attractions')