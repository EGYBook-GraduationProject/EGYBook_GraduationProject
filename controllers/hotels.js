const hotelModel = require('../database_seeds/models/hotels');
const {handelHotelReview} = require("./hotelReviews")

var mostPopular = []
var hotelData = {}
var HotelReview = []
var popularHotels=[]
class hotel {
    async getMostPopular() {
        try {
            mostPopular = await hotelModel.aggregate([{ $match: { reviewsnum: { $gt: 500 } } }, {
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
        } catch {
            return 'error ocurred'
        }
        return mostPopular
    }

    async getBody(req,res,next){
        console.log('Got body:', req.body);
        const name  = req.body.name
        const city = req.body.city
        try{
            hotelData = await hotelModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            popularHotels = await hotelModel.aggregate([{ $match: {$and: [ { name: { $ne: name } }, { city: city } ] }}, {
                $group: {
                    _id: '$name',
                    city: { $first: '$city' },
                    name: { $first: '$name' },
                    reviewsnum: { $first: '$reviewsnum' },
                    images: { $first: '$images' },
                    price:{$first: '$price'}
                }
            }, {
                $sort: {
                    reviewsnum: -1
                }
            },{
                $limit: 20
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
                    price:1
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
        const reviewsnum = req.body.reviewsnum
        try{
            console.log(typeof review)
            var reviewHotel= JSON.stringify(review).replace(/"/g, `'`).replace(/,/g,`, `).replace(/:/g,`: `)
            console.log(reviewHotel)
            hotelData = await hotelModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            if(hotelData[0].hotelreviews == "None"){
                var editedReviewText = (hotelData[0].hotelreviews).slice(0, 0)
                var editedReview = editedReviewText + reviewHotel + "]"
            }else{
                var editedReviewText = (hotelData[0].hotelreviews).slice(0, -1)
                var editedReview = editedReviewText + ", " + reviewHotel + "]"
            }
            console.log(editedReview)
            hotelData = await hotelModel.updateOne({ $and: [ { name: name }, { city: city } ]},
                {$set: {"hotelreviews": editedReview,"reviewsnum":reviewsnum}}).lean()
            hotelData = await hotelModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            HotelReview = [...hotelData.map(({ hotelreviews,reviewsnum }) => {
                return { hotelreviews,reviewsnum }
            })];
            var editedreviewsnum = HotelReview[0].reviewsnum
            HotelReview = handelHotelReview(HotelReview[0].hotelreviews)
            res.json({
                review: HotelReview,
                reviewsnum: editedreviewsnum
            });
        }
        catch{
            return 'error ocurred'
        }
    }
    async returnedValue(){
        var array = await hotelData
        return {array,popularHotels}
        
    }
}

module.exports = new hotel


