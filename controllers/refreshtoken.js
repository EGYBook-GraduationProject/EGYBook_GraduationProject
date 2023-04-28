const mongoose = require('mongoose');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const userModel = require('../database_seeds/models/user');
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort;
const Keyrefresh = require('../env_variables/env_vars.json').Keyrefresh;
const KeyAccess= require('../env_variables/env_vars.json').KeyAccess;
class refreshtoken {
      refreshToken = async(req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log(refreshToken)
            if(!refreshToken) return res.sendStatus(401);
             await userModel.findAll({refresh_token: refreshToken})
            .then((docs) => {
                if (docs.length == 0){
                        res.json("notFound!")
                } else {
                    var user = docs[0];
            jwt.verify(refreshToken, Keyrefresh, (err, decoded) => {
                if(err){
                    return res.sendStatus(403);
                }
                const accessToken = jwt.sign({user}, KeyAccess,{
                    expiresIn: '15s'
                });
                res.json({ accessToken });
                  });}})
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports= new refreshtoken;