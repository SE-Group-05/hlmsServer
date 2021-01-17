var mongoose = require('mongoose');
const Joi = require('joi');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:
    {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
    profilePicturePath: {
        type: String
    }
}, {
    timestamps: true
});



User.plugin(passportLocalMongoose);

var Users = mongoose.model('User', User);

const validateUser = (user) =>{
    const schema = Joi.object({
        'firstname' : Joi.string().pattern(new RegExp('^[a-z]+(?: [a-z]+)+$')).min(3).required(),
        'lastname' : Joi.string().pattern(new RegExp('^[a-z]+(?: [a-z]+)+$')).required(),
        'email' : Joi.string().email().required(),
        'role' : Joi.string().default('User'),
        'password' : Joi.string().min(5).max(1024).required(),
        'profilePicturePath' : Joi.string()
    });

    return schema.validate(user);
}

module.exports = {Users,validateUser};