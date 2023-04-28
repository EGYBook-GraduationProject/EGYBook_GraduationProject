const mongoose = require('mongoose');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const userModel = require('../database_seeds/models/user');
const { refreshToken } = require('./refreshtoken');
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort;
const KeyAccess= require('../env_variables/env_vars.json').KeyAccess;
const Keyrefresh= require('../env_variables/env_vars.json').Keyrefresh;
var accessToken;

mongoose.connect(mongoosePort)

class Signin{
signin = (req, res) => {
    var enteredData = req.body;
    var pass_shasum = crypto.createHash('sha1').update(req.body.password).digest('hex');
    userModel.find({email: enteredData.email, password: pass_shasum})
    .then((docs) => {
        if (docs.length == 0){
                res.json("notFound!")
        } else {
            var user = docs[0];
             accessToken=jwt.sign({ id: user.id }, KeyAccess, {expiresIn: 86400})
            //const refreshToken= jwt.sign({user}, Keyrefresh, {expiresIn: '1d' })
             userModel.findOneAndUpdate({email:enteredData.email},{refresh_token:accessToken}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs : ");
                    
                }});
            //  res.cookie('refreshToken',refreshToken,{
            //      httpOnly:true,
            //      maxAge: 24 * 60 * 60 * 1000
            //  });
             res.json(accessToken)
             console.log(accessToken)
        }
    })
    return accessToken;
}

}
module.exports= new Signin;