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
    profilePicturePath: {
        type: String
    }
}, {
    timestamps: true
});

User.plugin(passportLocalMongoose);

var Users = mongoose.model('User', User);

module.exports = Users;