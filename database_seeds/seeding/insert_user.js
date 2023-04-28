const mongoose = require('mongoose');
const User = require('../models/user');
const url = require('../../env_variables/env_vars.json').mongoosePort;

mongoose.connect(url)

var users = [

  

    //Parents
    new User({
        email: "test1@parent.meetup",
        password: "123",
        name: "Parent1",
        gender: "Male",
        phone: "unknown",
       
    }),

    new User({
        email: "test2@parent.meetup",
        password: "123",
        name: "Parent2",
        gender: "Male",
        phone: "unknown",
        
    }),

    //Admins
    new User({
        email: "test1@admin.meetup",
        password: "123",
        name: "Admin1",
        gender: "Male",
        phone: "unknown"
    }),

    new User({
        email: "test2@admin.meetup",
        password: "123",
        name: "admin2",
        gender: "Male",
        phone: "unknown"
    })
];

var counter = 0;
for (var i = 0; i < users.length; i++) {
    users[i].save((err, result) => {
        counter++;
        if (counter === users.length) {
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}