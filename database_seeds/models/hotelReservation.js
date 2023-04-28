const mongoose = require('mongoose')
const mongoosePort = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(mongoosePort)

const reservationSchema = new mongoose.Schema({
    hotel_name: String,
    cost_per_night: Number,
    reserved: [
    {
      check_in: Date,
      check_out: Date,
      number_rooms: Number,
      number_adult: Number,
      number_children: Number,
      user_id: String,
    },
  ],
})

module.exports = mongoose.model('hotelReservation', reservationSchema, 'hotelReservation')