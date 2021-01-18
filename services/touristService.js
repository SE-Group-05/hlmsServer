const Tourists = require('../models/users');

const addTourist = async (tourist, password) => {
    console.log("registering");
    Tourists.register(new Tourists(tourist),
        password, (err, tourist) => {
            if (err) {
                console.log("Error while registering new user");
                return true;
            }
            else {
                tourist.save((err, tourist) => {
                    if (err) {
                        console.log("Error while saving new user");
                        return true;
                    }
                    return false;
                });
            }
        });
}


exports.addTourist = addTourist;
