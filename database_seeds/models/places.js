const mongoose = require('mongoose')
const mongoosePort = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(mongoosePort)

const placeSchema = new mongoose.Schema({
    name: String,
    about: String,
    images: String,
    type: String
})

module.exports = mongoose.model('Places',placeSchema,'Places')

