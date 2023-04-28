const place = require("./places")
const restaurant = require("./restaurants")
const hotel = require("./hotels")
const attraction = require('./attractions');
const hotels = require("./hotels");
const allSearchRes=require("./allSearchRes");
const { json } = require("express/lib/response");
const {handelAttractionReview} = require("./attractionReviews")
const {handelHotelReview} = require("./hotelReviews")
const {handelRestaurantReview} = require("./restaurantReviews")
const {parseArray,modifyStarnum,parseImages}= require("./parseArray")



async function collectData(req, res, next) {
    console.log("start")
    console.log("places")
    var placeData = await place.homePlaces()
    parseArray(placeData)
    console.log("restaurants")
    var restaurantData = await restaurant.getMostPopular()
    parseImages(restaurantData)
    console.log("hotels")
    var hotelData = await hotel.getMostPopular()
    parseArray(hotelData)
    modifyStarnum(hotelData)
    console.log("attractions")
    var attractionData = await attraction.getMostPopular()
    parseImages(attractionData)
    res.json({ placeData, restaurantData, attractionData, hotelData })
    next()
}


function parseHotel(array) {
    console.log("//////////////////////")
    if(array.length == 0){
        return array
    }
    try{
        array.map((obj) => {
            if(obj.images != "None"){
                obj.images = JSON.parse(obj.images.replace(/'/g, `"`))
                if((obj.images).length > 1 ){
                    obj.images = [...new Set(obj.images)];
                }
            }
            if(obj.Propertyamenities != "None"){
                obj.Propertyamenities = obj.Propertyamenities.replace(/'s/g, ` `)
                obj.Propertyamenities = obj.Propertyamenities.replace(/s' /g, `s`)
            obj.Propertyamenities = JSON.parse(obj.Propertyamenities.replace(/'/g, `"`))
            }
            if(obj.roomfeatures != "None"){
                obj.roomfeatures = obj.roomfeatures.replace(/'s/g, ` `)
                obj.roomfeatures = obj.roomfeatures.replace(/s' /g, `s`)
                obj.roomfeatures = JSON.parse(obj.roomfeatures.replace(/'/g, `"`))
            }
            if(obj.roomtypes != "None"){
                obj.roomtypes = obj.roomtypes.replace(/'s/g, ` `)
                obj.roomtypes = obj.roomtypes.replace(/s' /g, `s`)
                obj.roomtypes = JSON.parse(obj.roomtypes.replace(/'/g, `"`))
            }
            if(obj.hotelstyle != "None"){
                obj.hotelstyle = obj.hotelstyle.replace(/'s/g, ` `)
                obj.hotelstyle = obj.hotelstyle.replace(/s' /g, `s`)
                obj.hotelstyle = JSON.parse(obj.hotelstyle.replace(/'/g, `"`))
            } 
            if(obj.starnum != "None"){
                obj.starnum = parseFloat(obj.starnum)
            }
            if(obj.hotelreviews == "None"){
                obj.hotelreviews = "None"
            }else{
                obj.hotelreviews = handelHotelReview(obj.hotelreviews)
            }
            return obj;
    });
    }
    catch{
        console.log("map error");
        //console.log(array);
    }
}

async function hotelData(req,res,next){
    var hotelData = await hotels.returnedValue()
    var hotelPostedData=hotelData.array
    var popular=hotelData.popularHotels
    parseHotel(hotelPostedData)
    parseArray(popular)
   // modifyStarnum(hotelPostedData)
    //console.log(hotelPostedData)
    res.json({hotelPostedData,popular})
}

function parseAttraction(array) {
    console.log("//////////////////////")
    if(array.length == 0){
        return array
    }
    try{
        array.map((obj) => {
            if(obj.images != "None"){
                obj.images = (obj.images).replace(/photo-w/g,"photo-o")
                obj.images = (obj.images).replace(/photo-s/g,"photo-o")
                obj.images = JSON.parse(obj.images.replace(/'/g, `"`))
                if((obj.images).length > 1 ){
                    obj.images = [...new Set(obj.images)];
                }
            }
            if(obj.typeofattraction != "None"){
                if((obj.typeofattraction).includes(",")){
                    obj.typeofattraction = (obj.typeofattraction).replace("Other, ","")
                    obj.typeofattraction = (obj.typeofattraction).split(", ")
                }else{
                    obj.typeofattraction = (obj.typeofattraction).split(" • ")
                }
            }
            if(obj.attractionreview == "None"){
                obj.attractionreview = "None"
            }else{
                obj.attractionreview = handelAttractionReview(obj.attractionreview)
            }
            return obj
           
        });
        }
        catch{
        console.log("map error");
        //console.log(array);
    }
}

function parseRestaurant(array) {
    console.log("//////////////////////")
    if(array.length == 0){
        return array
    }
    try{
        array.map((obj) => {
            if(obj.images != "None"){
                obj.images = (obj.images).replace(/photo-w/g,"photo-o")
                obj.images = (obj.images).replace(/photo-s/g,"photo-o")
                obj.images = (obj.images).replace(/photo-l/g,"photo-o")
                obj.images = JSON.parse(obj.images.replace(/'/g, `"`))
                if((obj.images).length > 1 ){
                    obj.images = [...new Set(obj.images)];
                }
            }
            if(obj.cuisines != "None"){
                if((obj.cuisines).includes(",")){     
                    obj.cuisines = (obj.cuisines).replace("Other, ","")
                    obj.cuisines = (obj.cuisines).split(", ")
                }else{
                    obj.cuisines = (obj.cuisines).split(" • ")
                }
            }
            if(obj.meals != "None"){
                if((obj.meals).includes(",")){   
                    obj.meals = (obj.meals).replace("Other, ","")  
                    obj.meals = (obj.meals).split(", ")
                }else{
                    obj.meals = (obj.meals).split(" • ")
                }
            }
            if(obj.features != "None"){
                if((obj.features).includes(",")){ 
                    obj.features = (obj.features).replace("Other, ","")      
                    obj.features = (obj.features).split(", ")
                }else{
                    obj.features = (obj.features).split(" • ")
                }
            }
            if(obj.specialdiets != "None"){
                if((obj.specialdiets).includes(",")){ 
                    obj.specialdiets = (obj.specialdiets).replace("Other, ","")      
                    obj.specialdiets = (obj.specialdiets).split(", ")
                }else{
                    obj.specialdiets = (obj.specialdiets).split(" • ")
                }
            }
            if(obj.attractionreview == "None"){
                obj.attractionreview = "None"
            }else{
                obj.attractionreview = handelRestaurantReview(obj.attractionreview)
            }
            return obj
           
        });
        }
        catch{
        console.log("map error");
        //console.log(array);
    }
}

async function attractionData(req,res,next){
    var attractionData = await attraction.returnedValue()
    var attractionPostedData=attractionData.array
    var popular=attractionData.popularAttractions
    parseAttraction(attractionPostedData)
    parseImages(popular)
   // modifyStarnum(hotelPostedData)
    //console.log(hotelPostedData)
    res.json({attractionPostedData,popular})
}

async function restaurantData(req,res,next){
    var restaurantData = await restaurant.returnedValue()
    var restaurantPostedData=restaurantData.restaurantData
    var popular=restaurantData.popularRestaurant
    parseRestaurant(restaurantPostedData)
    parseImages(popular)
    res.json({
        restaurantPostedData,popular})
}
async function allPlaces(req,res,next){
    var allPlaces = await place.getPlacesData()
    parseArray(allPlaces)
    res.json({places:allPlaces})
}






module.exports = { collectData, hotelData, attractionData, allPlaces,restaurantData}