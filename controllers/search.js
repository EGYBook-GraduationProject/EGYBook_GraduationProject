const mongoose = require('mongoose');
const hotelsModel = require("../database_seeds/models/hotels");
const placesModel = require("../database_seeds/models/places");
const restaurantsModel = require("../database_seeds/models/restaurant");
const attractionsModel = require("../database_seeds/models/attraction");
const {parseArray}= require("./parseArray")

const url = require("../env_variables/env_vars.json").mongoosePort;

mongoose.connect(url)


var HotelsArray = []
var attractionsArray = []
var placesArray = []
var restaurantsArray = []
class Search {
  search = async (req, res, next) => {
    try {
      const search_field = req.body.search;

      HotelsArray = await hotelsModel.find({ name: { $regex: search_field, $options: "i" } }, "city name images").limit(3).exec();
      HotelsArray = [...HotelsArray.map(({ name, city, images }) => {
        return { name, city, images };
      })];
      parseArray(HotelsArray)
      console.log(HotelsArray)


      attractionsArray = await attractionsModel.find({ name: { $regex: search_field, $options: "i" } }, "city name images").limit(3).exec();
      attractionsArray = [...attractionsArray.map(({ name, city, images }) => {
        return { name, city, images };
      })];
      parseArray(attractionsArray)
      console.log(attractionsArray)

      placesArray = await placesModel.find({ name: { $regex: search_field, $options: "i" } }, " name type images").limit(3).exec();
      placesArray = [...placesArray.map(({ name, type, images }) => {
        return { name, type, images };
      })];
      parseArray(placesArray)

      restaurantsArray = await restaurantsModel.find({ name: { $regex: search_field, $options: "i" } }, " name city images").limit(3).exec();
      restaurantsArray = [...restaurantsArray.map(({ name, city, images }) => {
        return { name, city, images }
      })];
      parseArray(restaurantsArray)

      res.json({
        attraction: attractionsArray,
        hotels: HotelsArray,
        places: placesArray,
        restaurant: restaurantsArray
      });
      next()
    } catch {
      next()
      return 'error ocurred'
    }

    return placesArray, HotelsArray, attractionsArray, restaurantsArray;

  }
}
module.exports = new Search;
