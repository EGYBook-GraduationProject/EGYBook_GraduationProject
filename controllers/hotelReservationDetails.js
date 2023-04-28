const res = require('express/lib/response');
const mongoose = require('mongoose');

const hotelReservation = require('../database_seeds/models/hotelReservation');
const hotel = require('../database_seeds/models/hotels');
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort;
mongoose.connect(mongoosePort)
var obj={}
var obj1={}
class HotelReservationDetails {
           
    hotelReservations = async (req, res) => {
        
        try {
            var check_in = req.body.check_in;
           var check_out= req.body.check_out  ;
           var noOfRooms = req.body.noOfRooms  ;
           var totalNumofrooms= req.body.totalNumofrooms  ;
           var adult  = req.body.adult  ;
           var child  = req.body.child  ;
           var hotelName  = req.body.hotelName  ;
            var price  = req.body.price  ;
            var user_id  = req.body.user_id
            obj = {
                check_in: check_in,
                check_out:  check_out,
                noOfRooms: noOfRooms,
                totalNumofrooms: totalNumofrooms,
                adult: adult,
                child: child,
                hotelName: hotelName,
                price: price,
                user_id: user_id
            }
            console.log(obj);
    
            return obj
        }
        catch {
            return "error"
        }
      
    } 
    getObj = async (req,res) => {
        obj1 = await obj;
        
        //obj1=JSON.stringify(obj1)
        console.log("this is obj1:  "+obj1)
        res.json(obj1)
        return obj1;
    }

} 

module.exports = new HotelReservationDetails;