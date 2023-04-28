const restaurantModel = require('../database_seeds/models/restaurant');
const {handelRestaurantReview} = require("./restaurantReviews")

var mostPopular = []
var different = []
var restaurantData=[]
var restaurantReview = []
var popularRestaurant=[]
class restaurant {
    async getMostPopular() {
        try {
            mostPopular = await restaurantModel.aggregate([{ $match: { reviewsnum: { $gt: 500 } } }, {
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
        } catch {
            return 'error ocurred'
        }

        return mostPopular

    }
    async getBody(req,res,next){
        try{
            console.log('Got body:', req.body);
            const name  = req.body.name
            const city = req.body.city
            restaurantData = await restaurantModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            popularRestaurant = await restaurantModel.aggregate([{ $match: {$and: [ { name: { $ne: name } }, { city: city } ] }}, {
                $group: {
                    _id: '$name',
                    city: { $first: '$city' },
                    name: { $first: '$name' },
                    reviewsnum: { $first: '$reviewsnum' },
                    images: { $first: '$images' },
                }
            }, {
                $sort: {
                    reviewsnum: -1
                }
            },{
                $limit: 25
            },
            {
                $sample: {
                    size:5
                }
            } 
            ,{
                $project: {
                    _id: 0,
                    name: 1,
                    city: 1,
                    reviewsnum: 1,
                    images: 1,
                }
            }])

         
        }
        catch{
            return 'error ocurred'
        }
    }
    async getReview(req,res,next){
        console.log('Got body:', req.body);
        const name  = req.body.name
        const city = req.body.city
        const review = req.body.review
        console.log("+++++++++++++++")
        console.log(review)
        const reviewsnum = req.body.reviewsnum
        try{
            //console.log(typeof review)
            var reviewRestaurant=JSON.stringify(review).replace(/"/g, `'`).replace(/,/g,`, `).replace(/:/g,`: `)
            restaurantData = await restaurantModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            if(restaurantData[0].attractionreview == "None"){
                var editedReviewText = (restaurantData[0].attractionreview).slice(0, 0)
                console.log("HH")
                console.log(review)
                var editedReview = editedReviewText + reviewRestaurant + "]"
            }else{
                var editedReviewText = (restaurantData[0].attractionreview).slice(0, -1)
                console.log(editedReviewText)
                console.log("HH")
                console.log(review)
                var editedReview = editedReviewText + ", " + reviewRestaurant + "]"
                console.log(review)
            }
            console.log(editedReview)
            restaurantData = await restaurantModel.updateOne({ $and: [ { name: name }, { city: city } ]},
                {$set: {"attractionreview": editedReview,"reviewsnum":reviewsnum}}).lean()

            restaurantData = await restaurantModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            restaurantData = [...restaurantData.map(({ attractionreview,reviewsnum }) => {
                return { attractionreview,reviewsnum }
            })];
            var editedreviewsnum = restaurantData[0].reviewsnum
            restaurantReview = handelRestaurantReview(restaurantData[0].attractionreview)
            res.json({
                review: restaurantReview,
                reviewsnum: editedreviewsnum
            });
        }
        catch{
            return 'error ocurred'
        }
        return restaurantReview
    }
    async returnedValue(){
        
        return await {restaurantData,popularRestaurant}
    }
}

module.exports = new restaurant