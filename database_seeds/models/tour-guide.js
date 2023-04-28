var mongoose = require("mongoose");
const User = require('./user'); 

const tourguideScema = User.discriminator('Tourguide', new mongoose.Schema({
    location: {type: String , required: true},
    phone: {type: Number},  }),
);
module.exports = mongoose.model('Tourguide');