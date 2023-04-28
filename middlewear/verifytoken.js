const jwt = require('jsonwebtoken');
const KeyAccess = require('../env_variables/env_vars.json').KeyAccess;

class verifytoken{
    verifyToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log("token is : "+token)
        if (token != null) {
            try {
                jwt.verify(token, KeyAccess)
             return res.json("signedIn");
            } catch (err) {
             return res.json("Forbidden");
            }
           }
        else(token == null)
           return res.json("please sign in first");
        // return res.json("you are signed")
    }
}
module.exports = new verifytoken;
