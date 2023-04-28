var mongoose = require("mongoose");
const User = require('./user'); 

const adminScema = User.discriminator('Admin', new mongoose.Schema({
admin_name: {type: String , required: true},
    
}),
);
    module.exports = mongoose.model('Admin');