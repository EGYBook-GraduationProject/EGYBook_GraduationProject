const userModel = require('../database_seeds/models/user');
const Tourist = require('../database_seeds/models/tourist');
const { ObjectId } = require('mongodb');
var temp_plan = []
var user_plan = []

class Plan {
async postPlan(req,res,next){
    try{
        var plan = req.body.plan
        var token = req.body.token
        console.table("*****************")
        console.log(plan)
        //var user = await userModel.find({refresh_token:token})
        var user = await userModel.aggregate([{ $match: { refresh_token: token } }])
        console.log(user)
        if(!user[0].places_plan){
            console.log("plan does not exist")
            plan.id = new ObjectId()
            temp_plan = await userModel.updateOne({ refresh_token: token } , [{$set: {places_plan: [plan]}}]).lean()
            console.log("plan added for first time") 
        }else{
            //console.log(user[0].places_plan[0])
            console.log(plan)
            console.log("plan exist")
            var temp = user[0].places_plan
            var flag = false
            if(plan.id == ""){
              console.log("new plan")
              //plan.id = new ObjectId()
            }else{
              console.log("55555")
              console.log(temp)
              console.log(flag)
              temp.forEach((item)=> {
                if(item.id == plan.id){
                  flag = true
                  item.places_plan = plan.places_plan
                  item.random_plan = plan.random_plan
                  console.log(item)
                }
              });
              console.log(temp)
            }
            console.log(flag)
            if(flag == false){
              console.log("new plan 2")
              plan.id = new ObjectId()
              temp.push(plan)
            }
            temp_plan = await userModel.updateOne({ refresh_token: token } ,  [{$set: {places_plan: temp}}]).lean()
        }
        var temp_user = await userModel.aggregate([{ $match: { refresh_token: token } }])
        user_plan = temp_user[0].places_plan 
    }catch{
        return 'error ocurred'
    }
}


arrayRemove(arr) {
    return arr.filter(function (item) {
      console.table(item)
        //return (item.name != value.name);
    });
}

deletePlan = async(req, res, next)=>{
  try {
    const token = req.body.token;
    const plan = req.body.plan
    var user = await userModel.aggregate([{ $match: { refresh_token: token } }])
    var temp = user[0].places_plan
    console.log(temp)
    temp = temp.filter(item=>{
      return item.id != plan.id
    })
    console.log(temp)
    temp_plan = await userModel.updateOne({ refresh_token: token } ,  [{$set: {places_plan: temp}}]).lean()
    res.json("deleted")
    next()
  } catch {
    next()
    return 'error ocurred'
  }

}


getPlan = async (req, res, next) => {
    try {
      const token = req.body.token;
      var user = await userModel.aggregate([{ $match: { refresh_token: token } }])
      var user_plan = [...user.map(({ places_plan}) => {
        return {places_plan};
      })];
      console.log(user_plan)
      res.json({
        plan: user_plan,
      });
      next()
    } catch {
      next()
      return 'error ocurred'
    }

    return user_plan;

  }

}

module.exports = new Plan