const mongoose = require('mongoose');
const mongoosePort = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(mongoosePort)


const schema = new mongoose.Schema({
    city: String,
    name: String,
    address: String,
    reviewsnum: Number,
    price: Number,
    Numofrooms: Number,
    description: String,
    rating: String,
    state: String,
    Propertyamenities: String,
    roomfeatures: String,
    roomtypes: String,
    hotelstyle: String,
    languagespoken: String,
    telephone: String,
    images: String,
    hotelreviews: String,

})
module.exports = mongoose.model('Hotels', schema, 'Hotels');