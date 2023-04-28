const express = require('express');//call the express library
const app = express();//make instance from express
const bodyParser = require('body-parser');
const cors = require('cors')
const signup = require('./controllers/signup');//import signup
const signin = require('./controllers/signin'); 
const search = require('./controllers/search'); 
const place = require("./controllers/places")
const allSearchResult = require('./controllers/allSearchRes'); 
const getUser = require('./controllers/getUser'); 
const refreshtoken = require('./controllers/refreshtoken'); 
const verifytoken = require('./middlewear/verifytoken');
const { collectData, hotelData, attractionData,allPlaces,restaurantData } = require('./controllers/collectData')
const hotel = require("./controllers/hotels");
const plan = require("./controllers/plan");
const attraction = require("./controllers/attractions");
const hotelReservation = require('./controllers/hotelReservation');
const hotelReservationDetails = require('./controllers/hotelReservationDetails');
const restaurant = require("./controllers/restaurants");
const profile=require("./controllers/profile")
var cookieParser = require('cookie-parser');
// const path  = require("path")

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static('./frontend/build'))

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
// app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./frontend/build','index.html'))
// })
//Registeration Part
app.get('/users',verifytoken.verifyToken,getUser.getUsers)//get all users

app.post('/signup', signup.signup)

app.post('/signin', signin.signin)

// profile Data
app.post('/backend/profile',profile.getInfo)

//Home Page Data
app.get('/backend', collectData)

//Search Data
app.post('/search',search.search)
app.post('/search/all-result',allSearchResult.getData)

//get info of a place 
//Hotel
app.post('/backend/hotels', hotel.getBody)
app.get('/backend/hotels', hotelData)

//Attraction
app.post('/backend/attractions', attraction.getBody)
app.get('/backend/attractions', attractionData)

//Restaurant 
app.post('/backend/restaurants', restaurant.getBody)
app.get('/backend/restaurants', restaurantData)

// add new review 
app.post('/backend/hotels/add-reviews',hotel.getReview)
app.post('/backend/attractions/add-reviews',attraction.getReview)
app.post('/backend/restaurants/add-reviews',restaurant.getReview)

//get info about a city
app.post('/backend/aboutCity',place.aboutCity)

//Hotel Reservation
app.post('/hotelReservation',hotelReservation.hotelReservations)
app.post('/hotelReservationDetails',hotelReservationDetails.hotelReservations)
app.get('/hotelReservationDetails',hotelReservationDetails.getObj)

// plan 
app.post('/backend/plan',plan.postPlan)
app.get('/backend/plan',verifytoken.verifyToken)
app.post('/backend/getPlan',plan.getPlan)// get plan
app.post('/backend/deletePlan',plan.deletePlan)// delete plan

//get all places 
app.get('/backend/all-places', allPlaces)

//cities recommandation 
app.post('/backend/packages',place.citiesPackages)


app.listen(8000, ()=>{
    console.log('Server running on port 8000')
})

