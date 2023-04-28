var mongoose = require("mongoose");

    const baseOptions = {
        discriminatorKey: 'userType', // our discriminator key, could be anything
        collection: 'Users', // the name of our collection
      };
      
      // Our Base schema: these properties will be shared with our "real" schemas
       const Base = mongoose.model('User', new mongoose.Schema({
            email: {type: String, required: true, unique: true},
            password: {type: String, required: true},
            username: {type: String, required: true},
            refresh_token: {type : String},
          }, baseOptions,
        ),
      );
  module.exports = mongoose.model('User');