const mongoose = require('mongoose');
const hotelsModel = require("../database_seeds/models/hotels");
const placesModel = require("../database_seeds/models/places");
const restaurantsModel = require("../database_seeds/models/restaurant");
const attractionsModel = require("../database_seeds/models/attraction");
const {parseArray,parseroomfeatures,parsePropertyamenities,parsehotelstyle}= require("./parseArray")

const url = require("../env_variables/env_vars.json").mongoosePort;

mongoose.connect(url)
var obj={}
var HotelsArray = []
var attractionsArray = []
var placesArray=[]
var restaurantsArray=[]
class allsearchRes{

    getData = async (req,res,next) => {
        //console.log('Got body:', req.body);
        try{
            const search_field  = req.body.search

            HotelsArray = await hotelsModel.find({city :{$regex: search_field, $options: "i"}} ,"city name images address reviewsnum price rating state roomfeatures Propertyamenities hotelstyle").limit(50).exec();
            HotelsArray = [...HotelsArray.map(({ name, city, images,address,reviewsnum,price,rating,state,roomfeatures ,Propertyamenities,hotelstyle }) => {
                  return {name,city,images,address,reviewsnum,price,rating,state,roomfeatures,Propertyamenities,hotelstyle};
            })];  
            parseArray(HotelsArray)
            parseroomfeatures(HotelsArray)
            parsePropertyamenities(HotelsArray)
            parsehotelstyle(HotelsArray)
            console.log(HotelsArray)
            //console.log(HotelsArray)
            attractionsArray = await attractionsModel.find({city :{$regex: search_field, $options: "i"}} ,"city name images typeofattraction address reviewsnum rate ").limit(50).exec();
            attractionsArray = [...attractionsArray.map(({name,city,images,typeofattraction,address,reviewsnum,rate})=> {
                return {name,city,images,typeofattraction,address,reviewsnum,rate};
            })];  
            parseArray(attractionsArray)
            //console.log(attractionsArray)
            placesArray=await placesModel.find({name :{$regex: search_field, $options: "i"}} ," name type images about").limit(50).exec();
            placesArray = [...placesArray.map(({name,type,images,about})=> {
                return {name,type,images,about};
            })];
            parseArray(placesArray) 
            restaurantsArray=await restaurantsModel.find({city :{$regex: search_field, $options: "i"}} ," name city images cuisines meals address reviewsnum rate features").limit(50).exec();
            restaurantsArray = [...restaurantsArray.map(({name,city,images,cuisines,meals,address,reviewsnum,rate,features})=> {
                return {name,city,images,cuisines,meals,address,reviewsnum,rate,features}
            })];
            parseArray(restaurantsArray)
            res.json({
                attraction: attractionsArray,
                hotels: HotelsArray,
                places: placesArray,
                restaurant: restaurantsArray
            });
            next() 
        }
        catch{
            next()
            return 'error ocurred'
        }
        return placesArray, HotelsArray, attractionsArray, restaurantsArray;
    }
}
module.exports = new allsearchRes