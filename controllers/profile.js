const userModel = require('../database_seeds/models/user');
const Tourist = require('../database_seeds/models/tourist');
const { ObjectId } = require('mongodb');
var temp_plan = []
var user_plan = []

class profile {
getInfo = async (req, res, next) => {
    console.log("Profile")
    try {
      const token = req.body.token;
      console.log(token)
      var user = await userModel.aggregate([{ $match: { refresh_token: token } }])
      /*var user_plan = [...user.map(({ places_plan}) => {
        return {places_plan};
      })];*/
      console.log(user)
      res.json({
        user: user,
      });
      next()
    } catch {
      next()
      return 'error ocurred'
    }

    return user;

  }

}

module.exports = new profile