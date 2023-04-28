const mongoose = require('mongoose');

const hotelReservation = require('../database_seeds/models/hotelReservation');
const hotel = require('../database_seeds/models/hotels');
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort;
mongoose.connect(mongoosePort)

class HotelReservation{
    hotelReservations = async(req, res) => {
        
            var check_in =req.body.check_in;
            var check_out =req.body.check_out;
            var noOfRooms =req.body.noOfRooms;
            var totalNumofrooms= req.body.totalNumofrooms;
            var adult =req.body.adult;
            var child =req.body.child;
            var hotelName =req.body.hotelName;
            var price = req.body.price;
            var user_id = req.body.user_id;
            var sum = totalNumofrooms - noOfRooms;
            hotel.findOneAndUpdate({name:hotelName},{Numofrooms:sum}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs : ", docs);
                }});
            hotelReservation.find({"hotel_name":hotelName})
    .then((docs) => {
        if (docs.length > 0){
            hotelReservation.updateOne({hotel_name: hotelName },
         {$push: { reserved : {
            "check_in": check_in,
            "check_out": check_out,
            "number_rooms": noOfRooms,
            "number_adult": adult,
            "number_children": child,
            "user_id": user_id,
            } }},{upsert:true}, function(err, data) { 
});}
else{
            hotelReservation.create({
                "hotel_name": hotelName,
                "cost_per_night": price,
                reserved: [
                {
                "check_in": check_in,
                "check_out": check_out,
                "number_rooms": noOfRooms,
                "number_adult": adult,
                "number_children": child,
                "user_id": user_id,
                },
            ],
            })}
            res.json("done reservation")

        }) 
    }
}
module.exports=new HotelReservation
