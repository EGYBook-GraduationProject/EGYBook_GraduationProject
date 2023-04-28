const mongoose = require('mongoose')
const mongoosePort = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(mongoosePort)

const restaurantSchema = new mongoose.Schema({
    city: String,
    name: String,
    address: String,
    reviewsnum: Number,
    rate: String,
    workinghours: String,
    telephone: String,
    menulink: String,
    about: String,
    pricerange: String,
    cuisines: String,
    specialdiets: String,
    meals: String,
    features: String,
    images: String,
    attractionreview: String
})

module.exports = mongoose.model('Restaurants',restaurantSchema,'Restaurants')

