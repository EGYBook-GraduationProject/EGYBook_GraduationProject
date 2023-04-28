const attractionModel = require('../database_seeds/models/attraction');
const {handelAttractionReview} = require("./attractionReviews")
var mostPopular = []
var attractionData = {}
var attractionReview = []
var popularAttractions=[]

class attraction {
    async getMostPopular() {
        try {
            mostPopular = await attractionModel.aggregate([{ $match: { reviewsnum: { $gt: 500 } } }, {
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
            attractionData = await attractionModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            popularAttractions = await attractionModel.aggregate([{ $match: {$and: [ { name: { $ne: name } }, { city: city } ] }}, {
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
                $limit:20
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
        const reviewsnum = req.body.reviewsnum
        try{
            //console.log(typeof review)
            var reviewAttraction= JSON.stringify(review).replace(/"/g, `'`).replace(/,/g,`, `).replace(/:/g,`: `)
            .replace(/time_typeoftrip/g,"time-typeoftrip")
            attractionData = await attractionModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            if(attractionData[0].attractionreview == "None"){
                var editedReviewText = (attractionData[0].attractionreview).slice(0, 0)
                var editedReview = editedReviewText + reviewAttraction + "]"
            }else{
                var editedReviewText = (attractionData[0].attractionreview).slice(0, -1)
                var editedReview = editedReviewText + ", " + reviewAttraction + "]"
            }
            attractionData = await attractionModel.updateOne({ $and: [ { name: name }, { city: city } ]},
                {$set: {"attractionreview": editedReview,"reviewsnum":reviewsnum}}).lean()
            attractionData = await attractionModel.find({ $and: [ { name: name }, { city: city } ]}).lean()
            attractionReview = [...attractionData.map(({ attractionreview,reviewsnum }) => {
                return { attractionreview,reviewsnum }
            })];
            var editedreviewsnum = attractionReview[0].reviewsnum
            attractionReview = handelAttractionReview(attractionReview[0].attractionreview)
            res.json({
                review: attractionReview,
                reviewsnum: editedreviewsnum
            });
        }
        catch{
            return 'error ocurred'
        }
        return attractionReview
    }

    async returnedValue(){
        var array = await attractionData
        return {array,popularAttractions}
    }
}


module.exports = new attraction