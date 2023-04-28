const mongoose = require('mongoose');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const userModel = require('../database_seeds/models/user');
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort;
const KEY = require('../env_variables/env_vars.json').KEY;
class getUser{
    getUsers = async(req, res) => {
        try {
            const users = await userModel.find({
                attributes:['id','username','email']
            });
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports=new getUser
