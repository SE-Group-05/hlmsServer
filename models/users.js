var mongoose = require('mongoose');
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
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String
    },
    role:
    {
        type: String,
        default: "user",
        enum:['user','moderater','admin']
    },
    image: {
        type: String
    },
    suite:{
        type: String,
        enum:['gold','luxury','platinum']
    },
    rommnumber:{
        type: String
    },
    userstate:{
        type: String,
        default: "in",
        enum:['in','out']
    }
}, {
    timestamps: true
});

User.plugin(passportLocalMongoose);
User.index({'$**':'text'});
var Users = mongoose.model('User', User);

module.exports = Users;