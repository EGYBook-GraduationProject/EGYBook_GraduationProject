const mongoose = require('mongoose');
const crypto = require('crypto')

const url = require('../env_variables/env_vars.json').mongoosePort;
const userModel = require('../database_seeds/models/user')
const Tourguide = require('../database_seeds/models/tour-guide');
const Tourist = require('../database_seeds/models/tourist');
const Admin = require('../database_seeds/models/admin');


mongoose.connect(url)
class Signup{
signup = (req, res) => {
    
    var email =req.body.email;
    var pass_shasum = crypto.createHash('sha1').update(req.body.password).digest('hex');
    var username = req.body.username;
    var type = req.body.type;
    var location = req.body.location;
    var nationality = req.body.nationality;
    var phone =req.body.phone; 
    var admin_name =req.body.admin_name; 
    userModel.find({"email":email})
    .then((docs) => {
        if (docs.length > 0){
            res.json({status:"error",error:"Email already exists"})   
    }
    else{
    if(type == "Tourguide"){
    Tourguide.create({
        "email":email,
        "password": pass_shasum,
        "username": username,
        "location":location,
        "phone":phone ,
    })
    res.json("done Tourguide")}
    else if (type=="Tourist"){
        Tourist.create({
            "email":email,
            "password": pass_shasum,
            "username": username,
            "nationality":nationality,
            "phone":phone ,
        })
        res.json("done Tourist")
    }
    else {
        Admin.create({
            "email":email,
            "password": pass_shasum,
            "username": username,
            "admin_name":admin_name ,
        })
        res.json("done Admin")
    }
}
})}
}
module.exports= new Signup;