var mongoose = require("mongoose");
const User = require('./user'); 

const touristScema = User.discriminator('Tourist', new mongoose.Schema({
    nationality: {type: String , required: true},
    phone: {type: Number},
    places_plan: {type: String}
  }),
);
module.exports = mongoose.model('Tourist');