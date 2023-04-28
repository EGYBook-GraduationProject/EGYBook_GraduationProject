const placesModel = require('../database_seeds/models/places')
const restaurantsModel = require("../database_seeds/models/restaurant");
const attractionsModel = require("../database_seeds/models/attraction");
const hotelModel = require("../database_seeds/models/hotels");
const {parseArray,modifyStarnum}= require("./parseArray")


var placesArray = []
var gen_nums = []
var randomPlaces = []
var aboutCityArray = []
var hotels = []
var attractions = []
var restaurants = []
var cities = []


class places {
    async getPlacesData() {
        try {
            placesArray = await placesModel.find({}).lean()
            return placesArray
        } catch {
            return 'error ocurred'
        }
    }

    in_array(array, el) {
        for (let i = 0; i < array.length; i++)
            if (array[i] == el) return true
        return false;
    }

    get_rand(array) {
        let rand = Math.floor(Math.random() * (array.length - 0) + 0);
        if (!(this.in_array(gen_nums, rand))) {
            gen_nums.push(rand);
            return rand;
        }
        return this.get_rand(array);
    }

    async homePlaces() {
        try {
            let data = await this.getPlacesData()
            gen_nums = []
            randomPlaces = []
            for (let i = 0; i < 10; i++) {
                this.get_rand(data);
            }
            for (let j = 0; j < gen_nums.length; j++) {
                randomPlaces.push(data[gen_nums[j]])
            }
            randomPlaces = [...randomPlaces.map(({ name, images, type }) => {
                return { name, images, type };
            })];
        } catch {
            return 'error ocurred'
        }
        return randomPlaces
    }

    aboutCity = async (req,res,next)=> {
        try{

            const city_name  = req.body.search
            aboutCityArray = await placesModel.find({name :{$regex: city_name, $options: "i"}} ," name type images about").exec();
            aboutCityArray = [...aboutCityArray.map(({name,type,images,about})=> {
                return {name,type,images,about};
            })];
            parseArray(aboutCityArray)
            // hotels
            hotels = await hotelModel.aggregate([{ $match: { city: { $regex: city_name, $options: "i" } } } , {
                $group: {
                    _id: '$name',
                    city: { $first: '$city' },
                    name: { $first: '$name' },
                    reviewsnum: { $first: '$reviewsnum' },
                    price: { $first: '$price' },
                    images: { $first: '$images' },
                    starnum: { $first: '$starnum'}
                }
            }, {
                $sort: {
                    'reviewsnum': -1
                }
            }, {
                $limit: 10
            }, {
                $project: {
                    _id: 0,
                    name: 1,
                    city: 1,
                    reviewsnum: 1,
                    price: 1,
                    images: 1,
                    starnum: 1
                }
            }])
            parseArray(hotels)
            modifyStarnum(hotels)
            // restaurants
            restaurants = await restaurantsModel.aggregate([ { $match: { city: { $regex: city_name, $options: "i" } } } , {
                $group: {
                    _id: '$name',
                    city: { $first: '$city' },
                    name: { $first: '$name' },
                    reviewsnum: { $first: '$reviewsnum' },
                    images: { $first: '$images' },
                    rate: {  $first: '$rate' },
                    cuisines: { $first: '$cuisines' }

                }
            }, {
                $sort: {
                    'reviewsnum': -1
                }
            }, {
                $limit: 10
            }, {
                $project: {
                    _id: 0,
                    name: 1,
                    city: 1,
                    reviewsnum: 1,
                    images: 1,
                    cuisines: 1,
                    rate: 1
                }
            }])
            parseArray(restaurants)
            //attraction
            attractions = await attractionsModel.aggregate([ { $match: { city: { $regex: city_name, $options: "i" } } } , {
                $group: {
                    _id: '$name',
                    city: { $first: '$city' },
                    name: { $first: '$name' },
                    reviewsnum: { $first: '$reviewsnum' },
                    images: { $first: '$images' },
                    typeofattraction: { $first: '$typeofattraction'},
                    rate: {  $first: '$rate' }
                }
            }, {
                $sort: {
                    'reviewsnum': -1
                }
            }, {
                $limit: 10
            }, {
                $project: {
                    _id: 0,
                    name: 1,
                    city: 1,
                    reviewsnum: 1,
                    images: 1,
                    typeofattraction: 1,
                    rate: 1
                }
            }])
            parseArray(attractions)
            //
            res.json({
                place: aboutCityArray,
                hotels: hotels,
                restaurants: restaurants,
                attractions: attractions
            })
            next()
        }
        catch{
            next()
            return 'error ocurred'
        }
        return aboutCityArray,hotels,restaurants,attractions
    }

    citiesPackages = async (req,res,next)=> {
        try{
            console.log("Enter cities")
            const city_type  = req.body.type
            cities = await placesModel.find({type :{$regex: city_type, $options: "i"}} ," name type images about").exec();
            cities = [...cities.map(({name,type,images,about})=> {
                return {name,type,images,about};
            })];
            parseArray(cities)
            res.json({
                cities: cities,
              });
        }
        catch{
            next()
            return 'error ocurred'
        }
    }

}


module.exports = new places