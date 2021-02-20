const Tourists = require('../models/users');

const addTourist = async (tourist, password) => {
    Tourists.register(new Tourists(tourist),
        password, (err, tourist) => {
            if (err) {
                return true;
            }
            else {
                tourist.save((err, tourist) => {
                    if (err) {
                        return true;
                    }
                    return false;
                });
            }
        });
}


exports.addTourist = addTourist;
